document.addEventListener("DOMContentLoaded", () => {
  // ✅ Add Project button click redirect
  const addBtn = document.getElementById("addNewProjectBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      window.location.href = "add_project.html";
    });
  }

  // ✅ If on Add Project page, handle form submit
  const form = document.getElementById("projectForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      const tech = document.getElementById("tech").value.trim();
      const link = document.getElementById("link").value.trim();

      if (!title || !description) {
        alert("Please fill title and description!");
        return;
      }

      const project = {
        id: Date.now(),
        title,
        description,
        tech,
        link,
      };

      const projects = JSON.parse(localStorage.getItem("projects") || "[]");
      projects.push(project);
      localStorage.setItem("projects", JSON.stringify(projects));

      window.location.href = "index.html";
    });
  }

  // ✅ Load projects on index page
  const projectList = document.getElementById("projectList");
  if (projectList) {
    renderProjects();
  }

  function renderProjects() {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projectList.innerHTML = "";

    if (projects.length === 0) {
      projectList.innerHTML = `<p style="color:gray;">No projects yet. Click 'Add New Project'.</p>`;
      return;
    }

    projects.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="project-info">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          ${p.tech ? `<small>Tech: ${p.tech}</small><br>` : ""}
          ${p.link ? `<a href="${p.link}" target="_blank">Open Link</a>` : ""}
        </div>
        <button class="delete-btn">Delete</button>
      `;
      li.querySelector(".delete-btn").addEventListener("click", () => {
        deleteProject(p.id);
      });
      projectList.appendChild(li);
    });
  }

  function deleteProject(id) {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem("projects", JSON.stringify(updated));
    renderProjects();
  }
});
