/* =========================================================
   PORTIFY V8
========================================================= */

const STORAGE_KEY = "portifyData";


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {
  name: "",
  role: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  photo: "",

  skills: [],
  projects: [],
  certificates: [],
  achievements: [],

  degree: "",
  college: "",
  year: "",

  template: "classic"
};


let data = loadData();


/* =========================================================
   ELEMENTS
========================================================= */

const el = id => document.getElementById(id);

const nameInput = el("nameInput");
const roleInput = el("roleInput");
const aboutInput = el("aboutInput");

const emailInput = el("emailInput");
const phoneInput = el("phoneInput");
const locationInput = el("locationInput");

const githubInput = el("githubInput");
const linkedinInput = el("linkedinInput");

const photoInput = el("photoInput");
const removePhotoBtn = el("removePhotoBtn");

const skillInput = el("skillInput");
const addSkillBtn = el("addSkillBtn");
const skillsList = el("skillsList");

const projectTitleInput = el("projectTitleInput");
const projectDescInput = el("projectDescInput");
const addProjectBtn = el("addProjectBtn");
const projectsList = el("projectsList");

const certificateInput = el("certificateInput");
const certificateOrgInput = el("certificateOrgInput");
const addCertificateBtn = el("addCertificateBtn");
const certificatesList = el("certificatesList");

const degreeInput = el("degreeInput");
const collegeInput = el("collegeInput");
const yearInput = el("yearInput");

const achievementInput = el("achievementInput");
const addAchievementBtn = el("addAchievementBtn");
const achievementsList = el("achievementsList");

const templateSelect = el("templateSelect");

const portfolio = el("portfolio");

const previewName = el("previewName");
const previewRole = el("previewRole");
const previewAbout = el("previewAbout");

const previewEmail = el("previewEmail");
const previewPhone = el("previewPhone");
const previewLocation = el("previewLocation");

const previewGithub = el("previewGithub");
const previewLinkedin = el("previewLinkedin");

const previewPhoto = el("previewPhoto");
const photoPlaceholder = el("photoPlaceholder");

const aboutContent = el("aboutContent");

const previewSkills = el("previewSkills");
const previewProjects = el("previewProjects");
const previewCertificates = el("previewCertificates");
const previewAchievements = el("previewAchievements");

const previewDegree = el("previewDegree");
const previewCollege = el("previewCollege");
const previewYear = el("previewYear");

const qualityScore = el("qualityScore");
const qualityProgress = el("qualityProgress");
const qualityMessage = el("qualityMessage");

const printBtn = el("printBtn");
const themeBtn = el("themeBtn");
const resetBtn = el("resetBtn");


/* =========================================================
   STORAGE
========================================================= */

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaultData };
    }

    return {
      ...defaultData,
      ...JSON.parse(saved)
    };

  } catch (error) {
    return { ...defaultData };
  }
}


function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}


/* =========================================================
   URL
========================================================= */

function normalizeUrl(value) {

  let url = String(value || "").trim();

  if (!url) {
    return "";
  }

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  return url;
}


/* =========================================================
   BASIC INPUTS
========================================================= */

function connectInput(input, key) {

  if (!input) return;

  input.value = data[key] || "";

  input.addEventListener("input", () => {

    data[key] = input.value;

    saveData();
    render();

  });
}


connectInput(nameInput, "name");
connectInput(roleInput, "role");
connectInput(aboutInput, "about");

connectInput(emailInput, "email");
connectInput(phoneInput, "phone");
connectInput(locationInput, "location");

connectInput(githubInput, "github");
connectInput(linkedinInput, "linkedin");

connectInput(degreeInput, "degree");
connectInput(collegeInput, "college");
connectInput(yearInput, "year");


/* =========================================================
   PHOTO
========================================================= */

photoInput.addEventListener("change", event => {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    data.photo = reader.result;

    saveData();
    render();

  };

  reader.readAsDataURL(file);

});


removePhotoBtn.addEventListener("click", () => {

  data.photo = "";

  photoInput.value = "";

  saveData();
  render();

});


/* =========================================================
   SKILLS
========================================================= */

addSkillBtn.addEventListener("click", addSkill);

skillInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    event.preventDefault();
    addSkill();
  }

});


function addSkill() {

  const value = skillInput.value.trim();

  if (!value) return;

  data.skills.push(value);

  skillInput.value = "";

  saveData();
  render();

}


/* =========================================================
   PROJECTS
========================================================= */

addProjectBtn.addEventListener("click", addProject);


function addProject() {

  const title = projectTitleInput.value.trim();
  const description = projectDescInput.value.trim();

  if (!title) return;

  data.projects.push({
    title,
    description
  });

  projectTitleInput.value = "";
  projectDescInput.value = "";

  saveData();
  render();

}


/* =========================================================
   CERTIFICATES
========================================================= */

addCertificateBtn.addEventListener("click", addCertificate);


function addCertificate() {

  const name = certificateInput.value.trim();
  const organisation = certificateOrgInput.value.trim();

  if (!name) return;

  data.certificates.push({
    name,
    organisation
  });

  certificateInput.value = "";
  certificateOrgInput.value = "";

  saveData();
  render();

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

addAchievementBtn.addEventListener("click", addAchievement);

achievementInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    event.preventDefault();
    addAchievement();
  }

});


function addAchievement() {

  const value = achievementInput.value.trim();

  if (!value) return;

  data.achievements.push(value);

  achievementInput.value = "";

  saveData();
  render();

}


/* =========================================================
   DELETE ITEM
========================================================= */

function deleteItem(type, index) {

  if (!Array.isArray(data[type])) return;

  data[type].splice(index, 1);

  saveData();
  render();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   EDITOR LISTS
========================================================= */

function renderSkillsEditor() {

  skillsList.innerHTML = data.skills.map((skill, index) => {

    return `
      <div class="editor-item">

        <div class="editor-item-content">
          <strong>${escapeHTML(skill)}</strong>
        </div>

        <button
          class="delete-item"
          onclick="deleteItem('skills', ${index})"
          type="button">
          ×
        </button>

      </div>
    `;

  }).join("");

}


function renderProjectsEditor() {

  projectsList.innerHTML = data.projects.map((project, index) => {

    return `
      <div class="editor-item">

        <div class="editor-item-content">

          <strong>
            ${escapeHTML(project.title)}
          </strong>

          <small>
            ${escapeHTML(project.description || "No description")}
          </small>

        </div>

        <button
          class="delete-item"
          onclick="deleteItem('projects', ${index})"
          type="button">
          ×
        </button>

      </div>
    `;

  }).join("");

}


function renderCertificatesEditor() {

  certificatesList.innerHTML =
    data.certificates.map((certificate, index) => {

      return `
        <div class="editor-item">

          <div class="editor-item-content">

            <strong>
              ${escapeHTML(certificate.name)}
            </strong>

            <small>
              ${escapeHTML(certificate.organisation || "")}
            </small>

          </div>

          <button
            class="delete-item"
            onclick="deleteItem('certificates', ${index})"
            type="button">
            ×
          </button>

        </div>
      `;

    }).join("");

}


function renderAchievementsEditor() {

  achievementsList.innerHTML =
    data.achievements.map((achievement, index) => {

      return `
        <div class="editor-item">

          <div class="editor-item-content">
            <strong>
              ${escapeHTML(achievement)}
            </strong>
          </div>

          <button
            class="delete-item"
            onclick="deleteItem('achievements', ${index})"
            type="button">
            ×
          </button>

        </div>
      `;

    }).join("");

}


/* =========================================================
   PREVIEW
========================================================= */

function renderBasicPreview() {

  previewName.textContent =
    data.name || "Your Name";

  previewRole.textContent =
    data.role || "Computer Science Student";

  previewAbout.textContent =
    data.about ||
    "Your professional introduction will appear here.";

  aboutContent.textContent =
    data.about || "";

  previewEmail.textContent =
    data.email || "email@example.com";

  previewPhone.textContent =
    data.phone || "+91 XXXXX XXXXX";

  previewLocation.textContent =
    data.location || "Chennai, India";

  previewDegree.textContent =
    data.degree || "B.Sc. Computer Science";

  previewCollege.textContent =
    data.college || "College Name";

  previewYear.textContent =
    data.year || "2028";

}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function renderSocialLinks() {

  const github = normalizeUrl(data.github);
  const linkedin = normalizeUrl(data.linkedin);


  if (github) {

    previewGithub.href = github;
    previewGithub.style.display = "inline-block";

  } else {

    previewGithub.removeAttribute("href");
    previewGithub.style.display = "none";

  }


  if (linkedin) {

    previewLinkedin.href = linkedin;
    previewLinkedin.style.display = "inline-block";

  } else {

    previewLinkedin.removeAttribute("href");
    previewLinkedin.style.display = "none";

  }

}


/* =========================================================
   PHOTO PREVIEW
========================================================= */

function renderPhoto() {

  if (data.photo) {

    previewPhoto.src = data.photo;

    previewPhoto.style.display = "block";

    photoPlaceholder.style.display = "none";

  } else {

    previewPhoto.src = "";

    previewPhoto.style.display = "none";

    photoPlaceholder.style.display = "grid";

    const initials = getInitials(data.name);

    photoPlaceholder.textContent =
      initials || "PN";

  }

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase();

}


/* =========================================================
   SKILLS PREVIEW
========================================================= */

function renderSkillsPreview() {

  previewSkills.innerHTML =
    data.skills.map(skill => {

      return `
        <span class="skill-pill">
          ${escapeHTML(skill)}
        </span>
      `;

    }).join("");

}


/* =========================================================
   PROJECTS PREVIEW
========================================================= */

function renderProjectsPreview() {

  previewProjects.innerHTML =
    data.projects.map(project => {

      return `
        <article class="project-card">

          <h3>
            ${escapeHTML(project.title)}
          </h3>

          <p>
            ${escapeHTML(project.description || "")}
          </p>

        </article>
      `;

    }).join("");

}


/* =========================================================
   CERTIFICATES PREVIEW
========================================================= */

function renderCertificatesPreview() {

  previewCertificates.innerHTML =
    data.certificates.map(certificate => {

      return `
        <article class="certificate-card">

          <h3>
            ${escapeHTML(certificate.name)}
          </h3>

          <p>
            ${escapeHTML(certificate.organisation || "")}
          </p>

        </article>
      `;

    }).join("");

}


/* =========================================================
   ACHIEVEMENTS PREVIEW
========================================================= */

function renderAchievementsPreview() {

  previewAchievements.innerHTML =
    data.achievements.map(achievement => {

      return `
        <div class="achievement-card">
          <span>
            ${escapeHTML(achievement)}
          </span>
        </div>
      `;

    }).join("");

}


/* =========================================================
   EMPTY SECTION HANDLING
========================================================= */

function toggleSection(sectionId, shouldShow) {

  const section = el(sectionId);

  if (!section) return;

  section.classList.toggle(
    "hidden",
    !shouldShow
  );

}


function handleEmptySections() {

  toggleSection(
    "aboutSection",
    Boolean(data.about.trim())
  );

  toggleSection(
    "skillsSection",
    data.skills.length > 0
  );

  toggleSection(
    "projectsSection",
    data.projects.length > 0
  );

  toggleSection(
    "educationSection",
    Boolean(
      data.degree.trim() ||
      data.college.trim() ||
      data.year.trim()
    )
  );

  toggleSection(
    "certificatesSection",
    data.certificates.length > 0
  );

  toggleSection(
    "achievementsSection",
    data.achievements.length > 0
  );

}


/* =========================================================
   TEMPLATE
========================================================= */

templateSelect.value = data.template || "classic";

templateSelect.addEventListener("change", () => {

  data.template = templateSelect.value;

  saveData();
  render();

});


function renderTemplate() {

  portfolio.classList.remove(
    "classic",
    "modern",
    "minimal"
  );

  portfolio.classList.add(
    data.template || "classic"
  );

}


/* =========================================================
   QUALITY SCORE
========================================================= */

function updateQuality() {

  let score = 0;

  const checks = [

    Boolean(data.name.trim()),
    Boolean(data.role.trim()),
    Boolean(data.about.trim()),

    Boolean(data.email.trim()),
    Boolean(data.location.trim()),

    data.skills.length > 0,
    data.projects.length > 0,

    Boolean(data.degree.trim()),
    Boolean(data.college.trim()),

    data.certificates.length > 0 ||
    data.achievements.length > 0

  ];


  checks.forEach(check => {

    if (check) {
      score += 10;
    }

  });


  qualityScore.textContent =
    `${score}%`;

  qualityProgress.style.width =
    `${score}%`;


  if (score === 100) {

    qualityMessage.textContent =
      "Excellent. Your portfolio is complete.";

  } else if (score >= 70) {

    qualityMessage.textContent =
      "Looking strong. Add a few more details.";

  } else if (score >= 40) {

    qualityMessage.textContent =
      "Good start. Keep building your profile.";

  } else {

    qualityMessage.textContent =
      "Start adding your details.";

  }

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function render() {

  renderBasicPreview();

  renderSocialLinks();

  renderPhoto();

  renderSkillsEditor();
  renderProjectsEditor();
  renderCertificatesEditor();
  renderAchievementsEditor();

  renderSkillsPreview();
  renderProjectsPreview();
  renderCertificatesPreview();
  renderAchievementsPreview();

  handleEmptySections();

  renderTemplate();

  updateQuality();

}


/* =========================================================
   THEME
========================================================= */

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle(
    "dark-editor"
  );

  const isDark =
    document.body.classList.contains("dark-editor");

  localStorage.setItem(
    "portifyTheme",
    isDark ? "dark" : "light"
  );

});


function loadTheme() {

  const theme =
    localStorage.getItem("portifyTheme");

  if (theme === "dark") {
    document.body.classList.add("dark-editor");
  }

}


/* =========================================================
   PRINT / PDF
========================================================= */

printBtn.addEventListener("click", () => {

  window.print();

});


/* =========================================================
   RESET
========================================================= */

resetBtn.addEventListener("click", () => {

  const confirmed =
    confirm(
      "Reset your entire portfolio?"
    );

  if (!confirmed) return;

  data = {
    ...defaultData,
    skills: [],
    projects: [],
    certificates: [],
    achievements: []
  };

  saveData();

  loadInputsFromData();

  render();

});


/* =========================================================
   LOAD INPUT VALUES
========================================================= */

function loadInputsFromData() {

  nameInput.value = data.name || "";
  roleInput.value = data.role || "";
  aboutInput.value = data.about || "";

  emailInput.value = data.email || "";
  phoneInput.value = data.phone || "";
  locationInput.value = data.location || "";

  githubInput.value = data.github || "";
  linkedinInput.value = data.linkedin || "";

  degreeInput.value = data.degree || "";
  collegeInput.value = data.college || "";
  yearInput.value = data.year || "";

  templateSelect.value =
    data.template || "classic";

}


/* =========================================================
   START
========================================================= */

loadTheme();
loadInputsFromData();
render();


/* =========================================================
   GLOBAL DELETE ACCESS
========================================================= */

window.deleteItem = deleteItem;