<div align="center">

# 📄 ProResume – AI-Ready Resume Builder

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Lucide_React-latest-FF69B4?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

<br/>

> **Build, preview, and download stunning professional resumes in minutes — powered by 6 premium templates and categorical editing.**

<br/>

![ProResume Demo](https://raw.githubusercontent.com/priyabratasahoo780/Resume-generater/main/public/vite.svg)

</div>

---

## ✨ Premium Features

| Feature                       | Description                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| 🖊️ **Live Editor**            | Categorical input for skills, projects, and hackathons with real-time updates            |
| 👁️ **Instant Preview**        | Side-by-side A4 preview with high-fidelity template rendering                            |
| 🎨 **6 Premium Templates**    | **Classic**, **Modern**, **Professional**, **Creative**, **Timeline**, and **Elegant**   |
| 🏗️ **Categorical Skills**    | Group your expertise (e.g., Languages, Tools, Backend) for better scannability           |
| 🏆 **Hackathon & Awards**    | Dedicated section with support for subtitles, certificates, and repo links               |
| 📥 **Pro PDF Export**         | High-resolution PDF generation via native browser print engine                           |
| 🔒 **Security Shield**        | Built-in protection against code inspection and developer tools to safeguard the builder |
| 📱 **Responsive UI**          | Seamless editing experience across desktop and larger tablets                            |

---

## 🖼️ Professional Templates

<table>
  <tr>
    <th align="center">Elegant</th>
    <th align="center">Timeline</th>
    <th align="center">Professional</th>
  </tr>
  <tr>
    <td align="center">Sophisticated serif design with green accents and grouped skills.</td>
    <td align="center">Modern 2-column layout with a vertical project & experience timeline.</td>
    <td align="center">Standard corporate layout with dynamic QR code for digital portfolios.</td>
  </tr>
  <tr>
    <th align="center">Creative</th>
    <th align="center">Modern</th>
    <th align="center">Classic</th>
  </tr>
  <tr>
    <td align="center">Two-column layout with social profile links and bold headers.</td>
    <td align="center">Indigo sidebar focus with skill density badges and sleek typography.</td>
    <td align="center">Traditional, clean black-and-white layout for traditional industries.</td>
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

Open [http://localhost:5173](http://localhost:5173). 🎉

---

## 🛠️ Tech Stack

| Technology                                      | Role                                                        |
| ----------------------------------------------- | ----------------------------------------------------------- |
| [React 19](https://react.dev/)                  | UI library with modern Concurrent Mode and Hooks            |
| [Vite 7](https://vitejs.dev/)                   | Ultra-fast build tool & dev server                          |
| [Tailwind CSS v4](https://tailwindcss.com/)     | Next-gen utility-first styling with native CSS variables    |
| [Lucide React](https://lucide.dev/)             | Pixel-perfect professional icon set                         |
| [QRCode.react](https://zpao.github.io/qrcode.react/) | Dynamic QR code generation for digital resumes         |
| Native Browser Print API                        | High-fidelity A4 PDF generation with full CSS support       |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Premium Navbar with Template Switcher
│   ├── EditorPanel.jsx      # Categorical Input Forms (Sections 1-7)
│   ├── PreviewPanel.jsx     # Template Orchestrator & A4 Controller
│   ├── templates/           # 6 Distinct React Template Components
│   └── PasswordProtection.jsx # Security & Access Layer
├── App.jsx                  # Global State, Security Logic & Master Layout
└── main.jsx                 # Application Entry
```

---

## 📥 PDF Download Guide

1. Customize your details in the **Editor Panel**.
2. Select your preferred template from the **Template Navbar**.
3. Click **"Download PDF"** in the top-right corner.
4. **Print Dialog Settings**:
   - Set **Destination** to "Save as PDF".
   - Set **Margins** to "None" for edge-to-edge template accuracy.
   - Enable **"Background graphics"** for full colors.

---

## 🤝 Contributing

We welcome contributions to add new templates or features!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📃 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by [Priyabrata Sahoo](https://github.com/priyabratasahoo780)

⭐ **Star this repo** if you find it useful!

</div>
