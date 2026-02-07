import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const templatePath = path.join(root, "templates", "ats.html");
const cssPath = path.join(root, "templates", "style.css");
const dataPath = path.join(root, "data", "resume.example.json");
const distDir = path.join(root, "dist");

fs.mkdirSync(distDir, { recursive: true });

const tpl = fs.readFileSync(templatePath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function skillsHtml(skills = []) {
  return skills
    .map(
      (g) => `
<div class="item">
  <div class="item-title">${escapeHtml(g.group)}:</div>
  ${g.items.map(escapeHtml).join(", ")}
</div>`
    )
    .join("\n");
}

function bulletsHtml(bullets = []) {
  if (!bullets.length) return "";
  return `
<ul class="bullets">
  ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
</ul>`;
}

function projectsHtml(projects = []) {
  return projects
    .map((p) => {
      const links = (p.links ?? [])
        .map(
          (l) => `
<li>
  ${escapeHtml(l.label)}:
  <a href="${escapeAttr(l.url)}" target="_blank" rel="noopener noreferrer">
    ${escapeHtml(l.url)}
  </a>
</li>`
        )
        .join("");

      return `
<div class="item">
  <div class="item-title">${escapeHtml(p.title)}</div>
  <div class="tech-line">Stack: ${escapeHtml(p.stack)}</div>
  ${bulletsHtml(p.bullets)}
  ${links ? `<ul class="bullets">${links}</ul>` : ""}
</div>`;
    })
    .join("\n");
}

function experienceHtml(exps = []) {
  return exps
    .map(
      (e) => `
<div class="item">
  <div class="item-header">
    <div>
      <div class="item-title">${escapeHtml(e.role)}</div>
      <div class="item-subtitle">${escapeHtml(e.company)}</div>
    </div>
    <div class="item-date">${escapeHtml(e.date)}</div>
  </div>
  ${bulletsHtml(e.bullets)}
</div>`
    )
    .join("\n");
}

function educationHtml(eds = []) {
  return eds
    .map(
      (e) => `
<div class="item">
  <div class="item-header">
    <div>
      <div class="item-title">${escapeHtml(e.title)}</div>
      <div class="item-subtitle">${escapeHtml(e.subtitle)}</div>
    </div>
    <div class="item-date">${escapeHtml(e.date)}</div>
  </div>
</div>`
    )
    .join("\n");
}

function languagesHtml(langs = []) {
  return langs
    .map(
      (l) => `
<div class="item">
  <div class="item-header">
    <div class="item-title">
      ${escapeHtml(l.name)} — ${escapeHtml(l.level)}
    </div>
    <div class="item-date">${escapeHtml(l.note ?? "")}</div>
  </div>
</div>`
    )
    .join("\n");
}

const html = tpl
  .replace(
    `<link rel="stylesheet" href="./style.css" />`,
    `<style>${css}</style>`
  )
  .replaceAll("{{NAME}}", escapeHtml(data.name))
  .replaceAll("{{TITLE}}", escapeHtml(data.title))
  .replaceAll("{{EMAIL}}", escapeHtml(data.email))
  .replaceAll("{{PHONE_E164}}", escapeHtml(data.phone_e164))
  .replaceAll("{{PHONE_DISPLAY}}", escapeHtml(data.phone_display))
  .replaceAll("{{LOCATION}}", escapeHtml(data.location))
  .replaceAll("{{LINKEDIN_URL}}", escapeAttr(data.linkedin_url))
  .replaceAll("{{GITHUB_URL}}", escapeAttr(data.github_url))
  .replaceAll("{{WEBSITE_URL}}", escapeAttr(data.website_url ?? ""))
  .replaceAll("{{LINKEDIN_TEXT}}", escapeHtml(data.linkedin_text ?? "LinkedIn"))
  .replaceAll("{{GITHUB_TEXT}}", escapeHtml(data.github_text ?? "GitHub"))
  .replaceAll("{{WEBSITE_TEXT}}", escapeHtml(data.website_text ?? "Website"))
  .replaceAll("{{SUMMARY}}", escapeHtml(data.summary))
  .replaceAll("{{SKILLS_HTML}}", skillsHtml(data.skills))
  .replaceAll("{{PROJECTS_HTML}}", projectsHtml(data.projects))
  .replaceAll("{{EXPERIENCE_HTML}}", experienceHtml(data.experience))
  .replaceAll("{{EDUCATION_HTML}}", educationHtml(data.education))
  .replaceAll("{{LANGUAGES_HTML}}", languagesHtml(data.languages));

fs.writeFileSync(path.join(distDir, "cv.html"), html, "utf8");
console.log("✔ Currículo gerado em: dist/cv.html");
