let cutoffData = [];

function populateDropdowns() {
  populateSelect(document.getElementById("category"), CATEGORIES);
  populateSelect(document.getElementById("instituteType"), INSTITUTE_TYPES, true, "All Types");
}

async function loadData() {
  const years = [2023, 2024, 2025];
  const allData = [];
  for (const year of years) {
    try {
      const res = await fetch(`data/cutoff_${year}.json`);
      if (res.ok) allData.push(...(await res.json()));
    } catch (err) {
      console.warn(`No data for ${year}`);
    }
  }
  cutoffData = allData;
}

function roundNumber(roundStr) {
  const match = /\d+/.exec(roundStr || "");
  return match ? parseInt(match[0], 10) : 999;
}

function getChance(userRank, closingRank) {
  if (userRank <= closingRank * 0.85) return { label: "High Chance", class: "chance-high", rank: 1 };
  if (userRank <= closingRank * 1.05) return { label: "Medium Chance", class: "chance-medium", rank: 2 };
  if (userRank <= closingRank * 1.3) return { label: "Low Chance", class: "chance-low", rank: 3 };
  return null;
}

function predict(formData) {
  const userRank = parseInt(formData.rank, 10);
  const { category, seatGender, quota, instituteType, branch } = formData;
  const branchFilter = branch.trim().toLowerCase();

  // Filter with exact category (since dropdown has full values)
  const filtered = cutoffData.filter(row =>
    row.category === category &&
    row.seatGender === seatGender &&
    row.quota === quota &&
    (instituteType === "" || row.type === instituteType) &&
    (branchFilter === "" || row.program.toLowerCase().includes(branchFilter))
  );

  const instituteMap = {};

  filtered.forEach(row => {
    if (!instituteMap[row.institute]) {
      instituteMap[row.institute] = { institute: row.institute, type: row.type, branches: {} };
    }
    const inst = instituteMap[row.institute];

    if (!inst.branches[row.program]) {
      inst.branches[row.program] = { program: row.program, rounds: {} };
    }
    const branchObj = inst.branches[row.program];

    if (!branchObj.rounds[row.round]) {
      branchObj.rounds[row.round] = {};
    }
    branchObj.rounds[row.round][row.year] = {
      openingRank: row.openingRank,
      closingRank: row.closingRank
    };
  });

  const institutes = [];

  for (const instKey in instituteMap) {
    const inst = instituteMap[instKey];
    const branchList = [];

    for (const branchKey in inst.branches) {
      const branchObj = inst.branches[branchKey];
      const roundList = [];

      for (const roundKey in branchObj.rounds) {
        const yearData = branchObj.rounds[roundKey];
        const years = Object.keys(yearData).map(Number).sort((a, b) => a - b);
        const latestYear = years[years.length - 1];
        const latestClosing = yearData[latestYear].closingRank;

        const chance = getChance(userRank, latestClosing);
        if (!chance) continue; // skip rounds with no realistic chance

        roundList.push({
          round: roundKey,
          roundNum: roundNumber(roundKey),
          chance,
          trend: years.map(y => ({ year: y, closing: yearData[y].closingRank })),
          latestClosing,
          latestOpening: yearData[latestYear].openingRank
        });
      }

      if (roundList.length === 0) continue;

      roundList.sort((a, b) => a.roundNum - b.roundNum);
      const bestChance = roundList.reduce((best, r) =>
        r.chance.rank < best.chance.rank ? r : best, roundList[0]);

      branchList.push({
        program: branchKey,
        rounds: roundList,
        bestChance,
        recommendedRound: roundList.find(r => r.chance.rank <= 2) || roundList[0]
      });
    }

    if (branchList.length === 0) continue;

    branchList.sort((a, b) => a.bestChance.chance.rank - b.bestChance.chance.rank);

    const summary = { high: 0, medium: 0, low: 0 };
    branchList.forEach(b => {
      if (b.bestChance.chance.class === "chance-high") summary.high++;
      else if (b.bestChance.chance.class === "chance-medium") summary.medium++;
      else summary.low++;
    });

    institutes.push({
      institute: inst.institute,
      type: inst.type,
      branches: branchList,
      summary,
      sortScore: summary.high * 100 + summary.medium * 10 + summary.low
    });
  }

  institutes.sort((a, b) => b.sortScore - a.sortScore);
  return institutes;
}

function renderResults(institutes) {
  const container = document.getElementById("resultsList");
  const section = document.getElementById("resultsSection");
  const countEl = document.getElementById("resultCount");
  container.innerHTML = "";

  countEl.textContent = `${institutes.length} colleges matched`;

  if (institutes.length === 0) {
    container.innerHTML = `<p class="no-results">No matching colleges found. Try adjusting filters.</p>`;
    section.hidden = false;
    return;
  }

  institutes.forEach(inst => {
    const card = document.createElement("details");
    card.className = "institute-card";
    card.open = true;

    const branchesHtml = inst.branches.map(b => `
      <div class="branch-card ${b.bestChance.chance.class}-border">
        <div class="branch-header">
          <h4>${b.program}</h4>
          <span class="badge ${b.bestChance.chance.class}">${b.bestChance.chance.label}</span>
        </div>
        <div class="round-chips">
          ${b.rounds.map(r => `
            <div class="round-chip ${r.chance.class}">
              <span class="round-label">${r.round}</span>
              <span class="round-rank">Closing: ${r.latestClosing}</span>
            </div>
          `).join("")}
        </div>
        <p class="recommend-line">📍 Likely seat in <strong>${b.recommendedRound.round}</strong></p>
      </div>
    `).join("");

    card.innerHTML = `
      <summary class="institute-header">
        <div class="institute-title">
          <h3>${inst.institute}</h3>
          <span class="type-tag">${inst.type}</span>
        </div>
        <div class="summary-chips">
          ${inst.summary.high ? `<span class="chip chance-high">${inst.summary.high} High</span>` : ""}
          ${inst.summary.medium ? `<span class="chip chance-medium">${inst.summary.medium} Medium</span>` : ""}
          ${inst.summary.low ? `<span class="chip chance-low">${inst.summary.low} Low</span>` : ""}
        </div>
      </summary>
      <div class="branch-grid">${branchesHtml}</div>
    `;

    container.appendChild(card);
  });

  section.hidden = false;
  section.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("predictorForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {
    rank: document.getElementById("rank").value,
    category: document.getElementById("category").value,
    seatGender: document.getElementById("seatGender").value,
    quota: document.getElementById("quota").value,
    instituteType: document.getElementById("instituteType").value,
    branch: document.getElementById("branch").value
  };
  renderResults(predict(formData));
});

populateDropdowns();
loadData();