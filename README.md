<div align="center">

# 📄 ProResume – AI-Ready Resume Builder

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

<br/>

> **Build, preview, and download a stunning professional resume in minutes — no account required.**

<br/>

![ProResume Demo](https://raw.githubusercontent.com/priyabratasahoo780/Resume-generater/main/public/vite.svg)

</div>

---

## ✨ Features

| Feature                   | Description                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| 🖊️ **Live Editor**        | Fill in your details and watch the resume update in real-time                            |
| 👁️ **Instant Preview**    | Side-by-side A4 preview as you type                                                      |
| 🎨 **3 Templates**        | Choose between **Classic**, **Modern**, and the new **Professional** template            |
| 📥 **One-Click Download** | Export your resume as a perfect A4 PDF via the browser's native print engine             |
| 🔳 **Dynamic QR Code**    | The Professional template includes a dynamic QR code for your portfolio link             |
| ✅ **Finish Flow**        | "Finish & Download Resume" button at the end of the editor with template selection modal |
| 📱 **Responsive UI**      | Works on desktop and tablets                                                             |

---

## 🖼️ Templates

<table>
  <tr>
    <th align="center">Classic</th>
    <th align="center">Modern</th>
    <th align="center">Professional</th>
  </tr>
  <tr>
    <td>Clean black-and-white layout, full-width sections, traditional typographic hierarchy</td>
    <td>Two-column layout with deep indigo sidebar, skill badges, and timeline-style sections</td>
    <td>Premium layout with dynamic QR code, scannable portfolio link, and sleek uppercase headers</td>
  </tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/priyabratasahoo780/Resume-generater.git
cd Resume-generater

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
Resume-generater/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top nav with template switcher & download button
│   │   ├── EditorPanel.jsx  # Left panel – all form sections + Finish button
│   │   ├── PreviewPanel.jsx # Right panel – live A4 resume preview
│   │   └── templates/
│   │       ├── ClassicTemplate.jsx   # Minimal black & white template
│   │       └── ModernTemplate.jsx    # Two-column indigo sidebar template
│   ├── App.jsx              # Root component, state, PDF download logic
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles (Tailwind v4)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Technology                                      | Role                                                    |
| ----------------------------------------------- | ------------------------------------------------------- |
| [React 19](https://react.dev/)                  | UI framework                                            |
| [Vite 7](https://vitejs.dev/)                   | Lightning-fast build tool & dev server                  |
| [Tailwind CSS v4](https://tailwindcss.com/)     | Utility-first styling                                   |
| [Lucide React](https://lucide.dev/)             | Icon library                                            |
| [Framer Motion](https://www.framer.com/motion/) | Animation utilities                                     |
| Native Browser Print API                        | PDF generation (no canvas processing, full CSS support) |

---

## 📥 How to Download Your Resume as PDF

1. Fill in all sections in the **left editor panel**
2. Scroll to the bottom and click **"Finish & Download Resume"**
3. Choose your preferred template (**Classic** or **Modern**) in the modal
4. Click **"Download PDF"**
5. In the browser print dialog → set **Destination** to **"Save as PDF"**
6. Enable **"Background graphics"** for full colors → click **Save**

> ✅ Uses the browser's native print engine — supports all modern CSS including OKLCH colors from Tailwind v4.

---

## ✏️ Customization

All resume sections are editable from the left panel:

- **Personal Details** — Name, title, email, phone, GitHub, LinkedIn
- **About Me** — Professional summary paragraph
- **Skills** — Comma-separated skill tags
- **Projects** — Title, GitHub link, live link, description (unlimited)
- **Education** — Degree, institution, duration, score/GPA

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request 🚀
```

Please follow **conventional commits**: `feat:`, `fix:`, `chore:`, `docs:`, `style:`

---

## 📃 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Priyabrata Sahoo](https://github.com/priyabratasahoo780)

⭐ **Star this repo** if you found it helpful!

</div>
