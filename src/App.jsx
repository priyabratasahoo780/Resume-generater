import React, { useState, useRef } from 'react';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef();

  const handleDownload = () => {
    const element = printRef.current;
    if (!element) return;
    setIsDownloading(true);

    // Clone the element and strip the fixed A4 height & overflow clipping
    // so that content that overflows one page is not cut off in the PDF
    const clone = element.cloneNode(true);
    clone.style.cssText =
      'width:21cm; height:auto !important; min-height:0 !important; ' +
      'overflow:visible !important; transform:none !important; ' +
      'box-shadow:none; border-radius:0;';

    const iframe = document.createElement('iframe');
    iframe.style.cssText =
      'position:fixed;top:-9999px;left:-9999px;width:21cm;height:100%;border:none;';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>ProResume</title>');

    // Copy all stylesheets and style tags
    Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).forEach(node => {
      iframeDoc.write(node.outerHTML);
    });

    iframeDoc.write(`
      <style>
        @page { size: A4; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body { margin: 0; padding: 0; width: 21cm; }
        /* Remove any overflow clipping that may remain on child elements */
        body > div { overflow: visible !important; height: auto !important; }
      </style>
    `);
    iframeDoc.write('</head><body>');
    iframeDoc.write(clone.outerHTML);
    iframeDoc.write('</body></html>');
    iframeDoc.close();

    // Wait for styles to load then print
    iframe.onload = () => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
          setIsDownloading(false);
        }, 1000);
      }
    };

    // Fallback in case onload doesn't fire
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        try { iframe.contentWindow.print(); } catch (_) {}
        setTimeout(() => {
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
          setIsDownloading(false);
        }, 1000);
      }
    }, 2000);
  };
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'Kalpan Kaneriya',
      title: 'Full Stack Developer',
      phone: '+91 6352169258',
      email: 'kalpankaneriya@gmail.com',
      github: 'https://github.com/Kalpan2007',
      linkedin: 'https://www.linkedin.com/in/3kz'
    },
    aboutMe: 'Full-stack MERN developer with a passion for building dynamic, scalable, and user-friendly web applications. Proficient in React, Node.js, Express.js, and MongoDB, with a strong foundation in both front-end and back-end development. Skilled in optimizing workflows and integrating modern technologies, including AI-powered tools, to enhance development efficiency. Constantly exploring new advancements to write clean, maintainable code. Eager to contribute my skills to innovative projects and grow as a developer.',
    skills: ['HTML5', 'CSS3', 'JAVASCRIPT', 'Version Control- Git , GitHub', 'TAILWIND CSS', 'NODE', 'REACT', 'EXPRESS', 'MongoDB', 'MUI', 'RESTful APIs', 'JWT', 'FIGMA', 'C++'],
    projects: [
      {
        title: 'JobFusion – Job Portal & Resume Builder (CURRENTLY WORKING)',
        github: 'https://github.com/Kalpan2007/jobfusion',
        figma: 'Link',
        deploy: 'Link to Live Site',
        pullRequests: 'Link',
        description: 'JobFusion is a comprehensive job portal and resume builder designed to help users search and apply for live job listings through the Adzuna API, featuring advanced search filters by category, location, and salary. The platform ensures secure user authentication with JWT-based authentication and offers a modern, responsive UI built with Tailwind CSS & Material UI. A resume builder tool is in progress, designed to help users create ATS-friendly resumes. My role includes designing and developing both frontend (React.js) and backend (Node.js, Express.js), integrating the Adzuna API for real-time job postings, and building the AI-powered resume builder to optimize job applications.'
      },
      {
        title: 'React API Project (React + 4 APIs)',
        github: 'https://github.com/Kalpan2007/React-Api-Project',
        deploy: 'https://react-api-project-1lql.vercel.app',
        description: 'The React API Project is a web application that integrates four distinct APIs—Cocktails API, Meals API, Bank API, and Harry Potter API—to create a dynamic user experience. The project allows users to explore and interact with each API to view cocktail recipes, meal suggestions, bank details, and information about Harry Potter characters. Built with React.js, this project demonstrates real-time data integration and API consumption to provide a seamless user experience.'
      }
    ],
    education: [
      {
        degree: 'B.Tech in Computer Science and Engineering',
        institution: 'Rai University',
        duration: '2024-2028',
        score: 'First Semester CGPA : 9.95'
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('edit');

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <Header 
        handlePrint={handleDownload}
        isDownloading={isDownloading}
        selectedTemplate={selectedTemplate} 
        setSelectedTemplate={setSelectedTemplate} 
      />
      
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white shrink-0 z-20">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'edit' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Edit Resume
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Live Preview
        </button>
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1600px] mx-auto w-full h-full relative">
        {/* Left Panel: Editor */}
        <div className={`w-full lg:w-1/2 lg:border-r border-slate-200 bg-white overflow-y-auto z-10 shadow-sm relative h-full flex-shrink-0 lg:flex-shrink ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
          <EditorPanel 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            handleDownload={handleDownload}
            isDownloading={isDownloading}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>

        {/* Right Panel: Preview */}
        <div className={`w-full lg:w-1/2 bg-slate-100 overflow-y-auto p-4 sm:p-6 md:p-8 justify-center items-start h-full flex-shrink-0 lg:flex-shrink ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <PreviewPanel resumeData={resumeData} selectedTemplate={selectedTemplate} ref={printRef} />
        </div>
      </main>
    </div>
  );
}

export default App;
