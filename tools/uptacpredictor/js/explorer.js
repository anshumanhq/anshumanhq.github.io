let allData = [];
let filteredData = [];
let currentPage = 1;
const PAGE_SIZE = 50;

function populateDropdowns() {
  populateSelect(document.getElementById("filterCategory"), CATEGORIES, true, "All Categories");
  populateSelect(document.getElementById("filterInstituteType"), INSTITUTE_TYPES, true, "All Types");
}

async function loadAllData() {
  const years = ["2023", "2024", "2025"];
  const combined = [];
  for (const year of years) {
    try {
      const res = await fetch(`data/cutoff_${year}.json`);
      if (res.ok) combined.push(...(await res.json()));
    } catch (e) {
      console.warn(`Missing data for ${year}`);
    }
  }
  allData = combined;
  filteredData = allData;
  currentPage = 1;
  renderTable();
}

function applyFilters() {
  const institute = document.getElementById("searchInstitute").value.trim().toLowerCase();
  const year = document.getElementById("filterYear").value;
  const category = document.getElementById("filterCategory").value;
  const instituteType = document.getElementById("filterInstituteType").value;
  const branch = document.getElementById("filterBranch").value.trim().toLowerCase();

  filteredData = allData.filter(row => {
    return (institute === "" || row.institute.toLowerCase().includes(institute)) &&
           (year === "" || String(row.year) === year) &&
           (category === "" || row.category === category) &&
           (instituteType === "" || row.type === instituteType) &&
           (branch === "" || row.program.toLowerCase().includes(branch));
  });

  currentPage = 1;
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  const countEl = document.getElementById("resultCount");
  tbody.innerHTML = "";

  countEl.textContent = `${filteredData.length} results found`;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filteredData.slice(start, start + PAGE_SIZE);

  if (pageRows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="no-results">No matching records.</td></tr>`;
  } else {
    pageRows.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.year}</td>
        <td>${row.round || "-"}</td>
        <td>${row.institute}</td>
        <td>${row.type || "-"}</td>
        <td>${row.program}</td>
        <td>${row.category}</td>
        <td>${row.quota}</td>
        <td>${row.openingRank ?? "-"}</td>
        <td>${row.closingRank}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => { currentPage--; renderTable(); };
  container.appendChild(prevBtn);

  const pageLabel = document.createElement("span");
  pageLabel.textContent = ` Page ${currentPage} of ${totalPages} `;
  container.appendChild(pageLabel);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => { currentPage++; renderTable(); };
  container.appendChild(nextBtn);
}

document.getElementById("applyFilters").addEventListener("click", applyFilters);
document.getElementById("searchInstitute").addEventListener("keyup", e => {
  if (e.key === "Enter") applyFilters();
});

populateDropdowns();
loadAllData();