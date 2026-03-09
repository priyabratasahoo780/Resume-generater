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
    <div className="p-6 md:p-8 flex flex-col gap-8 h-full">

      {/* ── Finish Modal ── */}
      {showFinishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white relative">
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

            {/* Template Selection */}
            <div className="p-6 flex flex-col gap-4">
              <p className="text-slate-600 text-sm font-medium">Select template format:</p>
              <div className="grid grid-cols-2 gap-3">

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
              </div>

              {/* Info box */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Saved as <strong>ProResume.pdf</strong> (A4, high quality) using the{' '}
                  <span className="text-indigo-600 font-semibold capitalize">{selectedTemplate}</span> template.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-1">
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
      )}

      {/* ── Section 1: Personal Details ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name',     name: 'name',     type: 'text'  },
            { label: 'Job Title',     name: 'title',    type: 'text'  },
            { label: 'Email Address', name: 'email',    type: 'email' },
            { label: 'Phone Number',  name: 'phone',    type: 'text'  },
            { label: 'GitHub Link',   name: 'github',   type: 'text'  },
            { label: 'LinkedIn Link', name: 'linkedin', type: 'text'  },
            { label: 'Portfolio Link', name: 'portfolio', type: 'text'  },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">{label}</label>
              <input
                type={type}
                name={name}
                value={resumeData.personalInfo[name] || ''}
                onChange={handlePersonalInfoChange}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
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
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
          Skills
        </h2>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Comma-separated skills (e.g. React, Node.js, HTML5)</label>
          <input
            type="text"
            value={resumeData.skills.join(', ')}
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
              setResumeData(prev => ({ ...prev, skills: skillsArray }));
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="React, CSS3, JavaScript..."
          />
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />
 
      {/* ── Section 4: Experience ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
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
 
      {/* ── Section 5: Projects ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
          Projects
        </h2>
        <div className="flex flex-col gap-6">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col gap-4 relative">
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

      {/* ── Section 6: Education ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
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

      {/* ── Section 7: Certificates ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span>
          Certificates
        </h2>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Comma-separated certificates</label>
          <input
            type="text"
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

      {/* ── Section 8: Achievements ── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">8</span>
          Achievements
        </h2>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Comma-separated achievements</label>
          <textarea
            value={(resumeData.achievements || []).join(', ')}
            onChange={(e) => {
              const achsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
              setResumeData(prev => ({ ...prev, achievements: achsArray }));
            }}
            rows={3}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Ranked in top 1%, Open source contributor..."
          />
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
