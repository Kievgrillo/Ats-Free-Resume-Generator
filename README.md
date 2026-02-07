# 📄 ATS-First Resume Generator (HTML + PDF)

This project is a **lightweight, ATS-first resume generator** built for developers and technical professionals who want **full control** over their resume — without relying on paid resume builders, visual editors, or third-party platforms.

You edit **a single structured JSON file**, and the system generates:

- ✅ A clean, **ATS-friendly HTML resume**
- ✅ A **printable PDF** with clickable links

No subscriptions.  
No watermarks.  
No hidden limitations.

---

## 🚀 Why This Project Exists

Most resume builders today:

- Charge to unlock basic features  
- Restrict formatting unless you pay  
- Store your data on third-party platforms  
- Generate PDFs that **break ATS parsing**

This project takes a different approach.

### Core Principles

- **Content-first**: your resume lives in a JSON file  
- **ATS-first**: single column, clean text, no icons or tables  
- **Reproducible**: same input always generates the same output  
- **Offline & open-source**: no account, no tracking, no lock-in  

If you can edit a JSON file, you can generate a professional, ATS-compatible resume.

---

## ⚙️ How It Works

1. You edit `data/resume.example.json`
2. The project renders it into a clean HTML resume
3. The HTML is exported to PDF using a headless browser (Playwright)

### The final PDF preserves:

- Layout consistency  
- Clean text structure for ATS  
- Clickable links (`<a href="">`)

---

## 📁 Project Structure

```text
📦 cv-ats-html
├─ 📁 templates
│  ├─ 📄 ats.html          # ATS-first HTML template (single column)
│  └─ 📄 style.css         # Print-safe, ATS-safe styles
│
├─ 📁 data
│  └─ 📄 resume.example.json # Structured resume data (edit this file)
│
├─ 📁 scripts
│  ├─ 📄 render.mjs        # Renders JSON → HTML
│  └─ 📄 export-pdf.mjs    # Exports HTML → PDF (Playwright)
│
├─ 📁 dist                 # Generated output (gitignored)
│  ├─ 📄 cv.html
│  └─ 📄 cv.pdf
│
├─ 📄 package.json         # Project scripts and dependencies
├─ 📄 package-lock.json    # Dependency lockfile
├─ 📄 .gitignore           # Ignores node_modules, dist, PDFs
└─ 📄 README.md            # Documentation and usage guide

---

## Installation

Requirements:

- Node.js **18+**
- npm

Clone the repository and install dependencies:

```bash
npm install
```

Install Playwright browsers (required for PDF export):

```bash
npx playwright install
```

---

## Usage

1. Edit your resume data

Open and edit:
data/resume.example.json
This is the only file you need to change.

2. Generate HTML resume

```bash
npm run build
```

Output:

`dist/cv.html`

3. Generate PDF resume

```
npm run pdf
```

Output:
`dist/cv.pdf`

## The PDF:

✔️ A4-ready
✔️ Keeps links clickable
✔️ Preserves clean text structure for ATS
✔️ Safe for automated resume parsers
✔️ Suitable for direct job applications
