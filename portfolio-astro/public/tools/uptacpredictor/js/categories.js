const CATEGORIES = [
  "OPEN", "OPEN(GIRL)", "OPEN(AF)", "OPEN(TF)", "OPEN(FF)", "OPEN(PH)",
  "EWS(OPEN)", "EWS(GL)", "EWS(AF)", "EWS(FF)", "EWS(PH)",
  "BC", "BC(Girl)", "BC(AF)", "BC(PH)", "BC(FF)",
  "SC", "SC(Girl)", "SC(AF)", "SC(PH)", "SC(FF)",
  "ST", "ST(Girl)", "ST(AF)"
];

const INSTITUTE_TYPES = ["government", "private"];

function populateSelect(selectEl, values, includeAllOption = false, allLabel = "All") {
  if (includeAllOption) {
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = allLabel;
    selectEl.appendChild(allOpt);
  }
  values.forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    selectEl.appendChild(opt);
  });
}