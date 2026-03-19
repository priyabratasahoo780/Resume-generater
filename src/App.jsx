import React, { useState, useRef, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import PasswordProtection from './components/PasswordProtection';
import TemplateSelector from './components/TemplateSelector';
import { CheckCircle, Download, Loader2, X, FileText } from 'lucide-react';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isEditorHidden, setIsEditorHidden] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('is_auth') === 'true';
  });
  const [showDevToolsWarning, setShowDevToolsWarning] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
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
        // Layer 1: Debugger Speed Trap removed for production
        // debugger; 
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
  }, [isAuthenticated, showDevToolsWarning]);

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
        body { margin: 0; padding: 8mm 2mm; width: 21cm; font-size: 11px; line-height: 1.2; }
        .print-container { width: 100% !important; height: auto !important; }
        /* Dynamic scale will be applied via JS in iframe.onload */
        body > div { transform-origin: top center; overflow: visible !important; height: auto !important; }
      </style>
    `);
    iframeDoc.write('</head><body>');
    iframeDoc.write(clone.outerHTML);
    iframeDoc.write('</body></html>');
    iframeDoc.close();

    // Wait for styles to load then calculate scale and print
    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const rootDiv = iframeDoc.body.querySelector('div');
        
        if (rootDiv) {
          // Reset any previous transforms for measurement
          rootDiv.style.transform = 'none';
          rootDiv.style.width = '21cm';
          
          // A4 height is approx 1122px at 96dpi. 
          // We target ~1110px to allow for printer margins.
          const targetHeight = 1110; 
          const currentHeight = rootDiv.scrollHeight;
          
          if (currentHeight > targetHeight) {
            // SCALE DOWN: If content is too long
            const scaleFactor = (targetHeight / currentHeight).toFixed(3);
            rootDiv.style.transform = `scale(${scaleFactor})`;
            rootDiv.style.transformOrigin = 'top center';
          } else if (currentHeight < targetHeight * 0.85) {
            // SCALE UP: If content is too short, increase slightly to fill page (max 1.08x)
            const scaleFactor = Math.min(1.08, (targetHeight / currentHeight) * 0.95).toFixed(3);
            rootDiv.style.transform = `scale(${scaleFactor})`;
            rootDiv.style.transformOrigin = 'top center';
          } else {
            // OPTIONAL: Standard slight shrink if it's "just about right"
            rootDiv.style.transform = 'scale(0.98)';
            rootDiv.style.transformOrigin = 'top center';
          }
        }

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.error('Print error:', err);
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
        try { iframe.contentWindow.print(); } catch { /* ignore */ }
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
      portfolio: 'https://priyabratasahoo.com',
      leetcode: 'https://leetcode.com/u/xyz',
      youtube: 'https://youtube.com/@xyz'
    },
    aboutMe: 'Full-stack MERN developer with a passion for building dynamic, scalable, and user-friendly web applications. Proficient in React, Node.js, Express.js, and MongoDB, with a strong foundation in both front-end and back-end development. Skilled in optimizing workflows and integrating modern technologies, including AI-powered tools, to enhance development efficiency. Constantly exploring new advancements to write clean, maintainable code. Eager to contribute my skills to innovative projects and grow as a developer.',
    skills: [
      'Languages & Frameworks: JavaScript (ES6+), C++, React.js, Tailwind CSS, HTML5, CSS3',
      'Databases & Backend: MongoDB, Mongoose, REST APIs, Cloudinary, Node.js, Express.js',
      'Tools & Platforms: Git, GitHub, Postman, npm, Vercel, Netlify, Render',
      'UI/UX Design: Figma, Wireframing, Prototyping'
    ],
    projects: [
      {
        title: 'React API Project (React + 4 APIs)',
        github: 'https://github.com/Kalpan2007/React-Api-Project',
        deploy: 'https://react-api-project-1lql.vercel.app',
        description: 'The React API Project is a web application that integrates four distinct APIs—Cocktails API, Meals API, Bank API, and Harry Potter API—to create a dynamic user experience. The project allows users to explore and interact with each API to view cocktail recipes, meal suggestions, bank details, and information about Harry Potter characters. Built with React.js, this project demonstrates real-time data integration and API consumption to provide a seamless user experience.'
      }
    ],
    hackathons: [
      {
        title: 'Corporate Expense Manager',
        subtitle: 'International Grand Challenge | Jan 2026',
        github: 'https://github.com/',
        deploy: 'https://github.com/',
        certificate: 'https://github.com/',
        video: 'https://youtube.com/',
        description: 'Developed a secure expense platform with OCR receipt scanning and automated approval workflows using Node.js & MongoDB.'
      }
    ],
    experience: [
      {
        title: 'JobFusion – Job Portal & Resume Builder (CURRENTLY WORKING)',
        description: 'Developed a comprehensive job filtering and search system with role-based access control.\n- Integrated a dynamic resume builder with real-time preview and multi-template support.\n- Reduced backend latency by 30% through optimized MongoDB queries.'
      }
    ],
    uiux: [
      {
        title: 'Photography Portfolio',
        description: 'Created a visually rich, grid-based layout for showcasing high-resolution image galleries.',
        link: 'https://figma.com/'
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
      'Enthusiastic problem solver with competitive programming experience on LeetCode'
    ],
    expertise: [
      'Full-stack web development with React & Node.js',
      'MongoDB database management',
      'Authentication & security (JWT, & role-based access)',
      'RESTful API development',
      'UI/UX design with Figma'
    ],
    languages: ['English', 'Gujarati - Native', 'Hindi']
  });

  const [activeTab, setActiveTab] = useState('edit');

  const handleAuth = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('is_auth', 'true');
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuth} />;
  }

  if (!showEditor) {
    return (
      <TemplateSelector 
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onConfirm={() => setShowEditor(true)}
      />
    );
  }

  if (showDevToolsWarning) {
    return (
      <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#0a0a0a] p-6">
        <div className="min-h-full flex items-center justify-center py-10">
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
        isEditorHidden={isEditorHidden}
        setIsEditorHidden={setIsEditorHidden}
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

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden mx-auto w-full h-full relative">
        {/* Left Panel: Editor */}
        <div className={`w-full lg:w-[40%] lg:border-r border-slate-200 bg-white overflow-y-auto z-10 shadow-sm relative h-full flex-shrink-0 lg:flex-shrink ${activeTab === 'edit' ? 'block' : (isEditorHidden ? 'hidden' : 'hidden lg:block')}`}>
          <EditorPanel 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            handleDownload={handleDownload}
            isDownloading={isDownloading}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            setShowFinishModal={setShowFinishModal}
          />
        </div>

        {/* Right Panel: Preview */}
        <div className={`w-full ${isEditorHidden ? 'lg:w-full' : 'lg:w-[60%]'} bg-slate-100 overflow-y-auto p-4 sm:p-6 md:p-8 justify-center items-start h-full flex-shrink-0 lg:flex-shrink ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <PreviewPanel resumeData={resumeData} selectedTemplate={selectedTemplate} ref={printRef} isFullWidth={isEditorHidden} />
        </div>
      </main>

      {/* ── Finish Modal ── */}
      {showFinishModal && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/50 backdrop-blur-sm p-0 xs:p-4 flex flex-col items-center">
          <div className="w-full max-w-2xl pt-24 sm:pt-32 pb-12 px-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 sm:p-6 text-white relative">
                <button
                  onClick={() => setShowFinishModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Resume Ready!</h2>
                    <p className="text-indigo-100 text-sm mt-0.5">Choose your template & download</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="max-h-[60vh] sm:max-h-[50vh] overflow-y-auto">
                {/* Template Selection */}
                <div className="p-6 flex flex-col gap-4">
                  <p className="text-slate-600 text-sm font-medium">Select template format:</p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                    {/* Classic Card */}
                    <button
                      onClick={() => setSelectedTemplate('classic')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'classic'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'classic' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 bg-white border border-slate-300 rounded shadow-sm flex flex-col gap-1 p-1.5 overflow-hidden">
                        <div className="w-full h-2 bg-slate-800 rounded-sm" />
                        <div className="w-3/4 h-1 bg-slate-400 rounded-sm" />
                        <div className="mt-1 w-full h-px bg-slate-300" />
                        <div className="w-full h-1 bg-slate-200 rounded-sm mt-0.5" />
                        <div className="w-5/6 h-1 bg-slate-200 rounded-sm" />
                        <div className="w-4/6 h-1 bg-slate-200 rounded-sm" />
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'classic' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Classic
                      </span>
                    </button>

                    {/* Modern Card */}
                    <button
                      onClick={() => setSelectedTemplate('modern')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'modern'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'modern' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 rounded shadow-sm flex overflow-hidden border border-slate-300">
                        <div className="w-2/5 bg-indigo-800 flex flex-col gap-1 p-1">
                          <div className="w-full h-1.5 bg-white/80 rounded-sm" />
                          <div className="w-3/4 h-1 bg-indigo-400 rounded-sm" />
                        </div>
                        <div className="w-3/5 bg-white flex flex-col gap-1 p-1">
                          <div className="w-full h-1 bg-slate-200 rounded-sm" />
                          <div className="w-5/6 h-1 bg-slate-200 rounded-sm" />
                          <div className="w-4/6 h-1 bg-slate-200 rounded-sm" />
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'modern' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Modern
                      </span>
                    </button>

                    {/* Professional Card */}
                    <button
                      onClick={() => setSelectedTemplate('professional')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'professional'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'professional' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 rounded shadow-sm flex flex-col overflow-hidden border border-slate-300">
                        <div className="w-full h-4 bg-slate-900 flex flex-col gap-0.5 p-1">
                          <div className="w-2/3 h-1 bg-white/60 rounded-sm" />
                        </div>
                        <div className="flex-1 bg-white flex flex-col gap-1 p-1">
                          <div className="w-full h-0.5 bg-indigo-100 rounded-sm" />
                          <div className="w-full h-1 bg-slate-100 rounded-sm" />
                          <div className="w-full h-1 bg-slate-100 rounded-sm" />
                          <div className="w-1/2 h-1 bg-slate-100 rounded-sm" />
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'professional' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Professional
                      </span>
                    </button>

                    {/* Creative Card */}
                    <button
                      onClick={() => setSelectedTemplate('creative')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'creative'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'creative' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 rounded shadow-sm flex overflow-hidden border border-slate-300 bg-white">
                        <div className="w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col gap-1 p-1">
                          <div className="w-full h-2 bg-slate-200 rounded-full" />
                          <div className="w-full h-1 bg-slate-100 rounded-sm" />
                          <div className="w-full h-1 bg-slate-100 rounded-sm" />
                        </div>
                        <div className="w-2/3 flex flex-col gap-1 p-1">
                          <div className="w-3/4 h-1.5 bg-slate-800 rounded-sm" />
                          <div className="w-full h-1 bg-slate-200 rounded-sm mt-1" />
                          <div className="w-full h-1 bg-slate-200 rounded-sm" />
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'creative' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Creative
                      </span>
                    </button>

                    {/* Timeline Card */}
                    <button
                      onClick={() => setSelectedTemplate('timeline')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'timeline'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'timeline' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 rounded shadow-sm flex overflow-hidden border border-slate-300 bg-white">
                        <div className="w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col items-center gap-1 p-1">
                          <div className="w-full h-1 bg-slate-200 rounded-sm" />
                           <div className="w-full h-1 bg-slate-200 rounded-sm" />
                           <div className="w-full h-1 bg-slate-200 rounded-sm" />
                        </div>
                        <div className="w-2/3 flex flex-col gap-1 p-1 items-start">
                          <div className="w-full h-1.5 bg-slate-800 rounded-sm" />
                          <div className="w-1 h-full bg-slate-200 ml-1 rounded-full relative">
                             <div className="absolute top-2 -left-0.5 w-2 h-2 bg-indigo-400 rounded-full" />
                             <div className="absolute top-6 -left-0.5 w-2 h-2 bg-indigo-400 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'timeline' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Timeline
                      </span>
                    </button>

                    {/* Elegant Card */}
                    <button
                      onClick={() => setSelectedTemplate('elegant')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'elegant'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'elegant' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 rounded shadow-sm flex flex-col gap-1 p-1.5 overflow-hidden border border-slate-300 bg-white">
                        <div className="w-full h-2 bg-slate-900 rounded-sm" />
                        <div className="w-full h-px bg-[#2D4A22] mt-0.5" />
                        <div className="flex gap-1 mt-1">
                           <div className="w-1/2 flex flex-col gap-1">
                              <div className="w-full h-1 bg-slate-200 rounded-full" />
                           </div>
                           <div className="w-1/2 h-4 border-l-2 border-[#2D4A22] bg-slate-50 rounded-sm" />
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'elegant' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Elegant
                      </span>
                    </button>

                    {/* Professional Serif Card */}
                    <button
                      onClick={() => setSelectedTemplate('professional-serif')}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === 'professional-serif'
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {selectedTemplate === 'professional-serif' && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      )}
                      <div className="w-12 h-16 rounded shadow-sm flex flex-col gap-1 p-1.5 overflow-hidden border border-slate-400 bg-white font-serif">
                        <div className="w-full h-1.5 bg-slate-800 rounded-sm" />
                        <div className="w-full h-px bg-slate-200" />
                        <div className="flex gap-1 items-center justify-center">
                           <div className="w-2 h-0.5 bg-slate-400" />
                           <div className="w-2 h-0.5 bg-slate-400" />
                           <div className="w-2 h-0.5 bg-slate-400" />
                        </div>
                        <div className="flex gap-1.5 flex-1">
                           <div className="w-2/5 flex flex-col gap-1">
                              <div className="w-full h-0.5 bg-slate-300" />
                              <div className="w-3/4 h-0.5 bg-slate-200" />
                           </div>
                           <div className="w-px h-full bg-slate-200" />
                           <div className="flex-1 flex flex-col gap-1">
                              <div className="w-full h-0.5 bg-slate-300" />
                              <div className="w-5/6 h-0.5 bg-slate-200" />
                           </div>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold ${selectedTemplate === 'professional-serif' ? 'text-indigo-700' : 'text-slate-600'}`}>
                        Pro Serif
                      </span>
                    </button>
                  </div>

                  {/* Info box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Saved as <strong>ProResume.pdf</strong> (A4, high quality) using the{' '}
                      <span className="text-indigo-600 font-semibold capitalize">{selectedTemplate}</span> template.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sticky Action Buttons */}
              <div className="p-4 sm:p-6 border-t border-slate-100 bg-white rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowFinishModal(false)}
                    className="w-full sm:flex-1 py-3 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await handleDownload();
                      setShowFinishModal(false);
                    }}
                    disabled={isDownloading}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors text-sm shadow-md shadow-indigo-200"
                  >
                    {isDownloading ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Generating...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Download className="w-4 h-4" /> Download PDF</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
