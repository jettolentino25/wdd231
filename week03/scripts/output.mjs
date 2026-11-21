export function setTitle(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections) {
  const tableBody = document.querySelector("#sections");
  tableBody.replaceChildren();

  sections.forEach((section) => {
    const row = tableBody.insertRow();

    row.insertCell().textContent = section.sectionNum;
    row.insertCell().textContent = section.enrolled;
    row.insertCell().textContent = section.instructor;
  });
}