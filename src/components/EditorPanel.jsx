import React, { useState } from 'react';
import { CheckCircle, Download, Loader2, X, FileText } from 'lucide-react';

const EditorPanel = ({ resumeData, setResumeData, handleDownload, isDownloading, selectedTemplate, setSelectedTemplate }) => {
  const [showFinishModal, setShowFinishModal] = useState(false);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleTextChange = (e, field) => {
    setResumeData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFinishDownload = async () => {
    await handleDownload();
    setShowFinishModal(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 h-full">

      {/* ── Finish Modal ── */}
      {showFinishModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 flex flex-col items-center">
          <div className="w-full max-w-2xl pt-16 pb-12">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
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
                  <p className="text-indigo-100 text-sm mt-0.5">Choose your template &amp; download</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="max-h-[50vh] overflow-y-auto">
              {/* Template Selection */}
              <div className="p-6 flex flex-col gap-4">
                <p className="text-slate-600 text-sm font-medium">Select template format:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {/* ... templates ... */}
                  {/* (Keep all card buttons here) */}
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
            <div className="p-6 border-t border-slate-100 bg-white rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFinishModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinishDownload}
                  disabled={isDownloading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors text-sm shadow-md shadow-indigo-200"
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

      {/* ── Section 1: Personal Details ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: 'Full Name',     name: 'name',     type: 'text'  },
            { label: 'Job Title',     name: 'title',    type: 'text'  },
            { label: 'Email Address', name: 'email',    type: 'email' },
            { label: 'Phone Number',  name: 'phone',    type: 'text'  },
            { label: 'GitHub Link',   name: 'github',   type: 'text'  },
            { label: 'LinkedIn Link', name: 'linkedin', type: 'text'  },
            { label: 'Portfolio Link', name: 'portfolio', type: 'text'  },
            { label: 'LeetCode Link', name: 'leetcode', type: 'text'  },
            { label: 'YouTube Link', name: 'youtube', type: 'text'  },
            { label: 'Figma Link',   name: 'figma',   type: 'text'  },
          ].map(({ label, name, type }) => (
            <div key={name} className={`flex flex-col gap-1.5 transition-all duration-300 ${
              (
                (name === 'portfolio' && selectedTemplate === 'classic') ||
                ((name === 'leetcode' || name === 'youtube' || name === 'figma' || name === 'languages') && (selectedTemplate !== 'creative' && selectedTemplate !== 'timeline' && selectedTemplate !== 'elegant'))
              ) ? 'opacity-40 grayscale pointer-events-none' : ''
            }`}>
              <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                {label}
                {name === 'portfolio' && selectedTemplate === 'classic' && (
                  <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-0.5 rounded">Not in Classic</span>
                )}
                {(name === 'leetcode' || name === 'youtube' || name === 'figma' || name === 'languages') && (selectedTemplate !== 'creative' && selectedTemplate !== 'timeline' && selectedTemplate !== 'elegant') && (
                  <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-0.5 rounded">Premium Only</span>
                )}
              </label>
              <input
                type={type}
                name={name}
                disabled={
                  (name === 'portfolio' && selectedTemplate === 'classic') ||
                  ((name === 'leetcode' || name === 'youtube' || name === 'figma' || name === 'languages') && (selectedTemplate !== 'creative' && selectedTemplate !== 'timeline' && selectedTemplate !== 'elegant'))
                }
                value={resumeData.personalInfo[name] || ''}
                onChange={handlePersonalInfoChange}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 disabled:bg-slate-50 disabled:border-slate-200"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 2: About Me ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
          About Me
        </h2>
        <textarea
          value={resumeData.aboutMe}
          onChange={(e) => handleTextChange(e, 'aboutMe')}
          rows={5}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y"
          placeholder="Professional summary..."
        />
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 3: Skills ── */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
            Skills
          </h2>
          <button
            onClick={() => {
              setResumeData(prev => ({
                ...prev,
                skills: [...(prev.skills || []), 'New Category: Skill 1, Skill 2']
              }));
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline decoration-indigo-200 underline-offset-4"
          >
            + Add Category
          </button>
        </div>
        
        <div className="flex flex-col gap-5">
          {(resumeData.skills || []).map((skillGroup, index) => {
             const parts = skillGroup.includes(':') ? skillGroup.split(':') : ['Skills', skillGroup];
             const category = parts[0].trim();
             const list = parts.slice(1).join(':').trim();

             return (
               <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50/30 flex flex-col gap-4 relative group">
                  <button
                    onClick={() => {
                      const newSkills = resumeData.skills.filter((_, i) => i !== index);
                      setResumeData({ ...resumeData, skills: newSkills });
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                  >
                    ×
                  </button>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Category Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Languages & Frameworks"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-700"
                        value={category}
                        onChange={(e) => {
                          const newSkills = [...resumeData.skills];
                          newSkills[index] = `${e.target.value}: ${list}`;
                          setResumeData({ ...resumeData, skills: newSkills });
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Skills (comma separated)</label>
                      <textarea
                        placeholder="React, Node.js, etc."
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-h-[80px]"
                        value={list}
                        onChange={(e) => {
                          const newSkills = [...resumeData.skills];
                          newSkills[index] = `${category}: ${e.target.value}`;
                          setResumeData({ ...resumeData, skills: newSkills });
                        }}
                      />
                    </div>
                  </div>
               </div>
             );
          })}
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 4: Hackathons & Awards ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
          Hackathons & Awards
          {selectedTemplate === 'classic' && (
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-1 rounded-full ml-2">Not in Classic</span>
          )}
        </h2>
        <div className={`flex flex-col gap-4 transition-all duration-300 ${selectedTemplate === 'classic' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          {(resumeData.hackathons || []).map((hack, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50/30 flex flex-col gap-4 relative group">
              <button
                onClick={() => {
                  const newHack = resumeData.hackathons.filter((_, i) => i !== index);
                  setResumeData({ ...resumeData, hackathons: newHack });
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Competition/Project Title"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={hack.title || ''}
                  onChange={(e) => {
                    const newHack = [...resumeData.hackathons];
                    newHack[index].title = e.target.value;
                    setResumeData({ ...resumeData, hackathons: newHack });
                  }}
                />
                <input
                  type="text"
                  placeholder="Subtitle (e.g. Jan 2026)"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={hack.subtitle || ''}
                  onChange={(e) => {
                    const newHack = [...resumeData.hackathons];
                    newHack[index].subtitle = e.target.value;
                    setResumeData({ ...resumeData, hackathons: newHack });
                  }}
                />
                <input
                  type="text"
                  placeholder="GitHub Link"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={hack.github || ''}
                  onChange={(e) => {
                    const newHack = [...resumeData.hackathons];
                    newHack[index].github = e.target.value;
                    setResumeData({ ...resumeData, hackathons: newHack });
                  }}
                />
                <input
                  type="text"
                  placeholder="Demo Link"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={hack.deploy || ''}
                  onChange={(e) => {
                    const newHack = [...resumeData.hackathons];
                    newHack[index].deploy = e.target.value;
                    setResumeData({ ...resumeData, hackathons: newHack });
                  }}
                />
                <input
                  type="text"
                  placeholder="Certificate Link"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={hack.certificate || ''}
                  onChange={(e) => {
                    const newHack = [...resumeData.hackathons];
                    newHack[index].certificate = e.target.value;
                    setResumeData({ ...resumeData, hackathons: newHack });
                  }}
                />
                <input
                  type="text"
                  placeholder="Video Link"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={hack.video || ''}
                  onChange={(e) => {
                    const newHack = [...resumeData.hackathons];
                    newHack[index].video = e.target.value;
                    setResumeData({ ...resumeData, hackathons: newHack });
                  }}
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                value={hack.description || ''}
                onChange={(e) => {
                  const newHack = [...resumeData.hackathons];
                  newHack[index].description = e.target.value;
                  setResumeData({ ...resumeData, hackathons: newHack });
                }}
              />
            </div>
          ))}
          <button
            onClick={() => setResumeData({ ...resumeData, hackathons: [...(resumeData.hackathons || []), { title: '', github: '', deploy: '', video: '', description: '' }] })}
            className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            + Add Hackathon/Team Project
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 5: Projects ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
          Individual Projects
        </h2>
        <div className="flex flex-col gap-6">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col gap-3 sm:gap-4 relative">
              <button
                onClick={() => {
                  const newProjects = [...resumeData.projects];
                  newProjects.splice(index, 1);
                  setResumeData(prev => ({ ...prev, projects: newProjects }));
                }}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-md text-xs font-medium"
              >
                Remove
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Project Title', key: 'title'  },
                  { label: 'GitHub Link',   key: 'github' },
                  { label: 'Live Link',     key: 'deploy' },
                  { label: 'Role',          key: 'role'   },
                  { label: 'Tech Stack',    key: 'techStack' },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <input
                      type="text"
                      value={project[key] || ''}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index] = { ...newProjects[index], [key]: e.target.value };
                        setResumeData(prev => ({ ...prev, projects: newProjects }));
                      }}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={project.description || ''}
                  onChange={(e) => {
                    const newProjects = [...resumeData.projects];
                    newProjects[index] = { ...newProjects[index], description: e.target.value };
                    setResumeData(prev => ({ ...prev, projects: newProjects }));
                  }}
                  rows={3}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setResumeData(prev => ({
              ...prev,
              projects: [...prev.projects, { title: 'New Project', description: '' }]
            }))}
            className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
          >
            + Add Project
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />
 
      {/* ── Section 6: Experience ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
          Work Experience
        </h2>
        <div className="flex flex-col gap-6">
          {(resumeData.experience || []).map((exp, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col gap-4 relative">
              <button
                onClick={() => {
                  const newExp = [...resumeData.experience];
                  newExp.splice(index, 1);
                  setResumeData(prev => ({ ...prev, experience: newExp }));
                }}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-md text-xs font-medium"
              >
                Remove
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Job Title / Company', key: 'title'  },
                  { label: 'Duration (e.g. 2024-Present)', key: 'duration' },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <input
                      type="text"
                      value={exp[key] || ''}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience];
                        newExp[index] = { ...newExp[index], [key]: e.target.value };
                        setResumeData(prev => ({ ...prev, experience: newExp }));
                      }}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => {
                    const newExp = [...resumeData.experience];
                    newExp[index] = { ...newExp[index], description: e.target.value };
                    setResumeData(prev => ({ ...prev, experience: newExp }));
                  }}
                  rows={3}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setResumeData(prev => ({
              ...prev,
              experience: [...(prev.experience || []), { title: 'New Role', description: '', duration: '2024-Present' }]
            }))}
            className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
          >
            + Add Experience
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />
 
      {/* ── Section 7: Education ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span>
          Education
        </h2>
        <div className="flex flex-col gap-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col gap-4 relative">
              <button
                onClick={() => {
                  const newEdu = [...resumeData.education];
                  newEdu.splice(index, 1);
                  setResumeData(prev => ({ ...prev, education: newEdu }));
                }}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-md text-xs font-medium"
              >
                Remove
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Degree/Program', key: 'degree'      },
                  { label: 'Institution',    key: 'institution' },
                  { label: 'Duration',       key: 'duration'    },
                  { label: 'Score/GPA',      key: 'score'       },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <input
                      type="text"
                      value={edu[key] || ''}
                      onChange={(e) => {
                        const newEdu = [...resumeData.education];
                        newEdu[index] = { ...newEdu[index], [key]: e.target.value };
                        setResumeData(prev => ({ ...prev, education: newEdu }));
                      }}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => setResumeData(prev => ({
              ...prev,
              education: [...prev.education, { degree: 'New Degree', institution: '', duration: '' }]
            }))}
            className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
          >
            + Add Education
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 8: Certificates ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">8</span>
          Certificates
          {selectedTemplate === 'classic' && (
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-1 rounded-full ml-2">Not in Classic</span>
          )}
        </h2>
        <div className={`flex flex-col gap-1.5 transition-all duration-300 ${selectedTemplate === 'classic' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          <label className="text-sm font-medium text-slate-700">Comma-separated certificates</label>
          <input
            type="text"
            disabled={selectedTemplate === 'classic'}
            value={(resumeData.certificates || []).join(', ')}
            onChange={(e) => {
              const certsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
              setResumeData(prev => ({ ...prev, certificates: certsArray }));
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="C++, Azure Fundamentals..."
          />
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 9: Achievements ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">9</span>
          Achievements
          {selectedTemplate === 'classic' && (
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-1 rounded-full ml-2">Not in Classic</span>
          )}
        </h2>
        <div className={`flex flex-col gap-4 transition-all duration-300 ${selectedTemplate === 'classic' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          {(resumeData.achievements || []).map((ach, index) => (
            <div key={index} className="flex gap-2 group relative">
              <input
                type="text"
                placeholder="Ex: First prize in Hackathon..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={ach}
                onChange={(e) => {
                  const newAch = [...resumeData.achievements];
                  newAch[index] = e.target.value;
                  setResumeData({ ...resumeData, achievements: newAch });
                }}
              />
              <button
                onClick={() => {
                  const newAch = resumeData.achievements.filter((_, i) => i !== index);
                  setResumeData({ ...resumeData, achievements: newAch });
                }}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Remove achievement"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setResumeData({ ...resumeData, achievements: [...(resumeData.achievements || []), ''] })}
            className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all"
          >
            + Add Achievement
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 10: Expertise & Summary ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">10</span>
          Expertise & Summary
        </h2>
        <div className="flex flex-col gap-4">
          {(resumeData.expertise || []).map((exp, index) => (
            <div key={index} className="flex gap-2 group relative">
              <input
                type="text"
                placeholder="Ex: Full-stack web development with React & Node.js..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={exp}
                onChange={(e) => {
                  const newExp = [...resumeData.expertise];
                  newExp[index] = e.target.value;
                  setResumeData({ ...resumeData, expertise: newExp });
                }}
              />
              <button
                onClick={() => {
                  const newExp = resumeData.expertise.filter((_, i) => i !== index);
                  setResumeData({ ...resumeData, expertise: newExp });
                }}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Remove bullet"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setResumeData({ ...resumeData, expertise: [...(resumeData.expertise || []), ''] })}
            className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium"
          >
            + Add Summary Bullet
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 11: Languages ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">11</span>
          Languages
          {selectedTemplate === 'classic' && (
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-1 rounded-full ml-2">Not in Classic</span>
          )}
        </h2>
        <div className={`flex flex-col gap-1.5 transition-all duration-300 ${selectedTemplate === 'classic' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          <label className="text-sm font-medium text-slate-700">Comma-separated languages</label>
          <input
            type="text"
            disabled={selectedTemplate === 'classic'}
            value={(resumeData.languages || []).join(', ')}
            onChange={(e) => {
              const langsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
              setResumeData(prev => ({ ...prev, languages: langsArray }));
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="English, Hindi, Gujarati..."
          />
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* ── Section 12: UI/UX Design ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">12</span>
          UI/UX Design
          {selectedTemplate === 'classic' && (
            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight bg-indigo-50 px-2 py-1 rounded-full ml-2">Not in Classic</span>
          )}
        </h2>
        <div className={`flex flex-col gap-4 transition-all duration-300 ${selectedTemplate === 'classic' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          {(resumeData.uiux || []).map((item, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50/30 flex flex-col gap-4 relative group">
              <button
                onClick={() => {
                  const newUiux = resumeData.uiux.filter((_, i) => i !== index);
                  setResumeData({ ...resumeData, uiux: newUiux });
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Design Project Title"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newUiux = [...resumeData.uiux];
                    newUiux[index].title = e.target.value;
                    setResumeData({ ...resumeData, uiux: newUiux });
                  }}
                />
                <input
                  type="text"
                  placeholder="Figma / Design Link"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={item.link || ''}
                  onChange={(e) => {
                    const newUiux = [...resumeData.uiux];
                    newUiux[index].link = e.target.value;
                    setResumeData({ ...resumeData, uiux: newUiux });
                  }}
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-20"
                value={item.description || ''}
                onChange={(e) => {
                  const newUiux = [...resumeData.uiux];
                  newUiux[index].description = e.target.value;
                  setResumeData({ ...resumeData, uiux: newUiux });
                }}
              />
            </div>
          ))}
          <button
            onClick={() => setResumeData({ ...resumeData, uiux: [...(resumeData.uiux || []), { title: '', description: '', link: '' }] })}
            className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
          >
            + Add UI/UX Design Project
          </button>
        </div>
      </div>

      {/* ── FINISH BUTTON ── */}
      <div className="pt-4 pb-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40 pointer-events-none" />
          <button
            onClick={() => setShowFinishModal(true)}
            className="relative w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-lg font-bold rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            <CheckCircle className="w-6 h-6" />
            Finish &amp; Download Resume
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3">
          Review your template choice and download as PDF
        </p>
      </div>

    </div>
  );
};

export default EditorPanel;
