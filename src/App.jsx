import React, { useState, useRef, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import PasswordProtection from './components/PasswordProtection';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('is_auth') === 'true';
  });
  const [showDevToolsWarning, setShowDevToolsWarning] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    // Disable Right-Click
    const handleContextMenu = (e) => e.preventDefault();
    
    // Disable Inspect Shortcuts
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
        setShowDevToolsWarning(true);
      }
    };

    // Detect DevTools via Window Resize
    const handleResize = () => {
      // High threshold to avoid false positives from scrollbars or browser UI
      const threshold = 250; 
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      
      // Only trigger if we're authenticated, to avoid locking the login screen itself
      if ((widthDiff || heightDiff) && isAuthenticated) {
        setShowDevToolsWarning(true);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    // 🔒 Advanced Multi-Layer Detection
    const interval = setInterval(function SECURITY_CHECK_BY_PRIYABRATA_SAHOO() {
      /*
        ********************************************************************************
        *                                                                              *
        *   🔒  SECURITY ALERT: ACCESS RESTRICTED                                      *
        *                                                                              *
        *   TO INSPECT OR MODIFY THIS CODEBASE, PLEASE CONTACT:                       *
        *   ----------------------------------------------------                       *
        *   Priyabrata Sahoo                                                           *
        *                                                                              *
        ********************************************************************************
      */
      
      // Layer 1: Debugger Speed Trap 
      // We only run this if NOT already showing the warning to prevent loops
      if (!showDevToolsWarning) {
        const start = Date.now();
        debugger;
        const end = Date.now();
        
        // Increase time to 200ms to allow for some system stutter
        if (end - start > 200) {
          setShowDevToolsWarning(true);
        }
      }

      // Layer 2: Console Styling Trigger (Safe to keep, but only logs if warning is active)
      if (showDevToolsWarning) {
        console.clear();
        console.log(
          "%cBUILT BY PRIYABRATA SAHOO",
          "color: #ff4d4d; font-size: 50px; font-weight: bold; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-shadow: 3px 3px 0px rgba(0,0,0,0.2);"
        );
        console.log(
          "%cStealing code is not cool baby! If you wanna learn, ask me from the contact page 😉",
          "color: #ffffff; font-size: 18px; font-family: 'Segoe UI', sans-serif; margin-top: 10px;"
        );
        console.log(
          "%c→ https://github.com/Kalpan2007/jobfusion",
          "color: #6366f1; font-size: 16px; text-decoration: underline; margin-top: 5px;"
        );
      }
    }, 1000);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

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
      name: 'Priyabrata Sahoo',
      title: 'Full Stack Developer',
      phone: '+91 6352169258',
      email: 'xyz123@gmail.com',
      github: 'https://github.com/xyz2007',
      linkedin: 'https://www.linkedin.com/in/xyz',
      portfolio: 'https://priyabratasahoo.com'
    },
    aboutMe: 'Full-stack MERN developer with a passion for building dynamic, scalable, and user-friendly web applications. Proficient in React, Node.js, Express.js, and MongoDB, with a strong foundation in both front-end and back-end development. Skilled in optimizing workflows and integrating modern technologies, including AI-powered tools, to enhance development efficiency. Constantly exploring new advancements to write clean, maintainable code. Eager to contribute my skills to innovative projects and grow as a developer.',
    skills: ['HTML5', 'CSS3', 'JAVASCRIPT', 'Version Control- Git , GitHub', 'TAILWIND CSS', 'NODE', 'REACT', 'EXPRESS', 'MongoDB', 'MUI', 'RESTful APIs', 'JWT', 'FIGMA', 'C++'],
    projects: [
      {
        title: 'React API Project (React + 4 APIs)',
        github: 'https://github.com/Kalpan2007/React-Api-Project',
        deploy: 'https://react-api-project-1lql.vercel.app',
        description: 'The React API Project is a web application that integrates four distinct APIs—Cocktails API, Meals API, Bank API, and Harry Potter API—to create a dynamic user experience. The project allows users to explore and interact with each API to view cocktail recipes, meal suggestions, bank details, and information about Harry Potter characters. Built with React.js, this project demonstrates real-time data integration and API consumption to provide a seamless user experience.'
      }
    ],
    experience: [
      {
        title: 'JobFusion – Job Portal & Resume Builder (CURRENTLY WORKING)',
        github: 'https://github.com/Kalpan2007/jobfusion',
        figma: 'Link',
        deploy: 'Link to Live Site',
        pullRequests: 'Link',
        description: 'JobFusion is a comprehensive job portal and resume builder designed to help users search and apply for live job listings through the Adzuna API, featuring advanced search filters by category, location, and salary. The platform ensures secure user authentication with JWT-based authentication and offers a modern, responsive UI built with Tailwind CSS & Material UI. A resume builder tool is in progress, designed to help users create ATS-friendly resumes. My role includes designing and developing both frontend (React.js) and backend (Node.js, Express.js), integrating the Adzuna API for real-time job postings, and building the AI-powered resume builder to optimize job applications.'
      }
    ],
    education: [
      {
        degree: 'B.Tech in Computer Science and Engineering',
        institution: 'Rai University',
        duration: '2024-2028',
        score: 'First Semester CGPA : 9.95'
      }
    ],
    certificates: [
      'C++ Certificate by Great Learning',
      'Microsoft Certified: Azure Fundamentals',
      'Azure Fundamentals – 2-Day Hands-on Training (Collage workshop)'
    ],
    achievements: [
      'Ranked in the top 14% in JEE Mains 2024',
      'Active contributor to open-source projects on GitHub',
      'Enthusiastic problem solver with competitive programming experience on LeetCode'
    ]
  });

  const [activeTab, setActiveTab] = useState('edit');

  const handleAuth = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('is_auth', 'true');
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuth} />;
  }

  if (showDevToolsWarning) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] p-6 text-center">
        <div className="max-w-md w-full space-y-8 relative z-10 bg-[#121212] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Lock className="w-8 h-8 text-white/60" />
            </div>
            
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Access Restricted</span>
            <h2 className="text-4xl font-black text-white tracking-tight flex flex-col gap-2">
              <span>DEV TOOLS</span>
              <span className="text-white/40 italic font-medium text-3xl">detected</span>
            </h2>
            
            <p className="text-white/40 text-sm mt-6 max-w-[200px] leading-relaxed">
              Curious about how this was built? Let's connect and chat about it.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={() => {
                setShowDevToolsWarning(false);
                window.location.reload();
              }}
              className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4">
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Privacy</span>
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Terms</span>
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">About</span>
          </div>
          
          <div className="text-[10px] text-white/10 font-medium">© 2025 Priyabrata Sahoo</div>
        </div>
      </div>
    );
  }

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
