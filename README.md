This project is a lightweight, ATS-first resume generator built for developers and technical professionals who want full control over their resume without relying on paid resume builders or restrictive visual editors.

You edit a single structured JSON file, and the system generates:

a clean, ATS-friendly HTML resume
a printable PDF with clickable links
No subscriptions. No watermarks. No hidden limitations.

Why this project exists
Many resume builders:

charge to unlock basic features
limit formatting unless you pay
store your data on third-party platforms
generate PDFs that break ATS parsing
This project takes a different approach:

Content-first: your resume lives in a JSON file
ATS-first: single column, clean text, no icons or tables
Reproducible: same input always generates the same output
Offline & open-source: no account, no tracking, no lock-in
If you can edit a JSON file, you can generate a professional ATS-compatible resume.

How it works
You edit data/resume.example.json
The project renders it into a clean HTML resume
The HTML is exported to PDF using a headless browser
The final PDF preserves:
layout consistency
text structure for ATS
clickable links (<a href>)
Project Structure
📦 cv-ats-html
├─ 📁 templates
│ ├─ 📄 ats.html # ATS-first HTML template (single column)
│ └─ 📄 style.css # Print-safe, ATS-safe styles
│
├─ 📁 data
│ └─ 📄 resume.example.json # Structured resume data (edit this file)
│
├─ 📁 scripts
│ ├─ 📄 render.mjs # Renders JSON → HTML
│ └─ 📄 export-pdf.mjs # Exports HTML → PDF (Playwright)
│
├─ 📁 dist # Generated output (gitignored)
│ ├─ 📄 cv.html
│ └─ 📄 cv.pdf
│
├─ 📄 package.json # Project scripts and dependencies
├─ 📄 package-lock.json # Dependency lockfile
├─ 📄 .gitignore # Ignores node_modules, dist, PDFs
└─ 📄 README.md # Documentation and usage guide

Installation
Requirements:

Node.js 18+
npm
Clone the repository and install dependencies:

npm install
Install Playwright browsers (required for PDF export):

npx playwright install
Usage
Edit your resume data
Open and edit: data/resume.example.json This is the only file you need to change.

Generate HTML resume
npm run build
Output:

dist/cv.html

Generate PDF resume
npm run pdf
Output: dist/cv.pdf

The PDF:
is A4-ready
keeps links clickable
is safe for ATS parsing
is suitable for direct job applications
