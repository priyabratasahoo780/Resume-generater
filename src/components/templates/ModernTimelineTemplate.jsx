import React, { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, Code, Globe, Trophy, Briefcase, GraduationCap, Languages, Link as LinkIcon } from 'lucide-react';

const ModernTimelineTemplate = ({ data }) => {
  const { personalInfo, aboutMe, skills, projects, hackathons, uiux, experience, education, certificates, achievements, languages } = data;
  const [sidebarWidth, setSidebarWidth] = useState(30);
  const isDragging = useRef(false);

  const startResizing = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
  };

  const stopResizing = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const container = document.getElementById('resume-container');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    if (newWidth > 20 && newWidth < 45) {
      setSidebarWidth(newWidth);
    }
  };

  return (
    <div id="resume-container" className="w-full min-h-full bg-white text-[#333] font-sans flex flex-col shadow-inner border border-slate-200 relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── Header ── */}
      <header className="px-14 py-3 border-b-[3px] border-[#3d4a5e] mx-14 mt-2 flex flex-col gap-0.5 overflow-hidden">
        <h1 className="text-[36px] font-[900] text-[#3d4a5e] leading-none tracking-tight whitespace-nowrap">
          {personalInfo?.name?.toUpperCase() || 'ARJUN DIVRANIYA'}
        </h1>
        <p className="text-[16px] text-[#4a5568] font-bold tracking-wide mt-0.5 whitespace-nowrap">
          {personalInfo?.title || 'Aspiring Full Stack Developer'}
        </p>
      </header>

      <div className="flex px-14 py-3 gap-0 flex-1 relative">
        
        {/* ── Left Sidebar ── */}
        <aside style={{ width: `${sidebarWidth}%` }} className="flex flex-col gap-6 pr-8 transition-[width] duration-75">
          
          {/* Contact */}
          <section className="flex flex-col gap-3">
            <h3 className="text-[16px] font-extrabold uppercase text-[#2d3748] tracking-[0.2em] border-b-[2px] border-slate-200 pb-1 w-full">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-[#4a5568] font-bold">
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#1a202c] shrink-0 fill-current" />
                <span className="text-[12px] font-bold text-[#4a5568] truncate">{personalInfo?.email || 'arjundivraniya8@gmail.com'}</span>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-3 gap-x-2.5">
                {[
                  { icon: Globe, label: 'Portfolio', link: personalInfo?.portfolio },
                  { icon: Github, label: 'GitHub', link: personalInfo?.github },
                  { icon: Linkedin, label: 'LinkedIn', link: personalInfo?.linkedin },
                  { icon: Code, label: 'LeetCode', link: personalInfo?.leetcode }
                ].filter(i => i.link).map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 group">
                    <item.icon className="w-3.5 h-3.5 text-[#1a202c] shrink-0" />
                    <span className="text-[11.5px] font-bold text-[#4a5568] border-b border-slate-200 leading-tight whitespace-nowrap">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="flex flex-col gap-5">
            <h3 className="text-[16px] font-extrabold uppercase text-[#2d3748] tracking-[0.2em] border-b-[2px] border-slate-200 pb-1 w-full">
              Skills
            </h3>
            <ul className="flex flex-col gap-2 pl-1">
              {(skills || []).map((skill, idx) => (
                <li key={idx} className="text-[12px] text-[#4a5568] font-bold flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-1.5" />
                  <span className="leading-tight">{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Certificate */}
          <section className="flex flex-col gap-5">
            <div className="flex justify-between items-baseline border-b-[2px] border-slate-200 pb-1">
              <h3 className="text-[16px] font-extrabold uppercase text-[#2d3748] tracking-[0.2em]">Certificates</h3>
              <span className="text-[10px] font-bold text-[#666] border-b border-slate-200 leading-none">Links</span>
            </div>
            <ul className="flex flex-col gap-2.5 pl-2">
              {(certificates || []).map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[12px] font-bold text-[#4a5568] leading-snug">
                  <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-1.5" />
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="flex flex-col gap-5">
            <h3 className="text-[16px] font-extrabold uppercase text-[#2d3748] tracking-[0.2em] border-b-[2px] border-slate-200 pb-1 w-full">
              Education
            </h3>
            <div className="flex flex-col gap-5 pl-1">
              {(education || []).map((edu, idx) => (
                <div key={idx} className="flex flex-col gap-1 text-[#4a5568]">
                  <h4 className="text-[13px] font-bold text-[#2d3748]">{edu.degree}</h4>
                  <p className="text-[12px] font-bold opacity-80">{edu.institution}</p>
                  <p className="text-[11px] font-bold mt-0.5 opacity-60">{edu.score || edu.duration}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="flex flex-col gap-5">
              <h3 className="text-[16px] font-extrabold uppercase text-[#2d3748] tracking-[0.2em] border-b-[2px] border-slate-200 pb-1 w-full">
                Languages
              </h3>
              <ul className="flex flex-col gap-2.5 pl-1">
                {languages.map((lang, idx) => (
                  <li key={idx} className="text-[12px] text-[#4a5568] font-bold flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0" />
                    {lang}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* ── Resize Handle ── */}
        <div 
          onMouseDown={startResizing}
          className="w-8 -mx-4 relative z-[100] cursor-col-resize group flex items-center justify-center print:hidden"
        >
          <div className="w-[1px] h-full bg-slate-100 group-hover:bg-indigo-300 transition-colors" />
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-8 bg-white border border-slate-200 rounded-md flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
             <div className="w-px h-3 bg-slate-400" />
             <div className="w-px h-3 bg-slate-400" />
          </div>
        </div>

        {/* ── Right Content (Timeline) ── */}
        <main className="flex-1 flex flex-col gap-6 relative pt-1 pl-8">
          
          {/* Timeline Line */}
          <div className="absolute left-[54px] top-4 bottom-4 w-[1.5px] bg-[#cbd5e0]" />

          <div className="flex flex-col gap-6 relative">
            
            {/* Hackathon & Team Projects */}
            <section className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-9 h-9 rounded-lg bg-white border-2 border-[#1a202c] flex items-center justify-center shrink-0 shadow-sm relative z-20">
                   <div className="absolute -left-1 -top-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5 ring-2 ring-white">
                      <Code className="w-full h-full text-[#1a202c]" />
                   </div>
                   <Trophy className="w-5 h-5 text-[#1a202c]" />
                </div>
                <h3 className="text-[20px] font-black uppercase text-[#1a202c] tracking-tighter leading-none flex-1 border-b-[3px] border-slate-200 pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  Hackathon & Team Projects
                </h3>
              </div>

              <div className="flex flex-col gap-4 pl-[72px]">
                {(hackathons || []).map((hack, idx) => (
                  <div key={idx} className="relative flex flex-col gap-2">
                    <div className="absolute -left-[56px] top-[8px] w-3 h-3 rounded-full bg-white border-2 border-[#cbd5e0] z-20" />
                    <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
                      <h4 className="text-[14.5px] font-bold text-[#2d3748] leading-tight whitespace-nowrap shrink-0 overflow-hidden text-ellipsis">
                        {hack.title}:
                      </h4>
                      <div className="flex gap-3 text-[12.5px] font-bold text-[#4a5568] whitespace-nowrap shrink-0">
                        {['Demo', 'Video', 'GitHub'].map(label => {
                          const key = label === 'Demo' ? 'deploy' : label.toLowerCase();
                          return hack[key] && (
                            <a key={label} href={hack[key]} target="_blank" rel="noreferrer" className="underline underline-offset-[3px] decoration-[#cbd5e0] hover:text-[#1a202c] transition-colors">{label}</a>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-[12.5px] font-medium text-[#4a5568] leading-relaxed text-left">
                      {hack.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-9 h-9 rounded-full bg-[#1a202c] flex items-center justify-center shrink-0 shadow-sm overflow-hidden z-20 transition-transform hover:scale-105">
                   <Briefcase className="w-4.5 h-4.5 text-white" />
                </div>
                <h3 className="text-[20px] font-black uppercase text-[#1a202c] tracking-tighter leading-none flex-1 border-b-[3px] border-slate-200 pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  Projects
                </h3>
              </div>

              <div className="flex flex-col gap-4 pl-[72px]">
                {(projects || []).map((proj, idx) => (
                  <div key={idx} className="relative flex flex-col gap-3.5">
                    <div className="absolute -left-[56px] top-[8px] w-3 h-3 rounded-full bg-white border-2 border-[#cbd5e0] z-20" />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3.5 flex-nowrap overflow-hidden">
                        <h4 className="text-[16px] font-extrabold text-[#2d3748] tracking-tight leading-tight whitespace-nowrap underline underline-offset-[5px] decoration-slate-300 shrink-0 overflow-hidden text-ellipsis">
                          {proj.title}
                        </h4>
                        <div className="flex gap-3 text-[12.5px] font-bold text-[#4a5568] whitespace-nowrap shrink-0">
                          {['Demo', 'GitHub', 'Docs'].map(label => {
                            const key = label === 'Docs' ? 'docs' : label.toLowerCase();
                            return proj[key] && (
                              <a key={label} href={proj[key]} target="_blank" rel="noreferrer" className="underline underline-offset-[3px] decoration-[#cbd5e0] hover:text-[#1a202c] transition-colors">{label}</a>
                            );
                          })}
                        </div>
                      </div>
                      
                      {proj.description && (
                        <div className="flex flex-col gap-3 mt-0.5">
                          {proj.description.toLowerCase().includes('role :') && (
                            <div className="text-[13px] flex items-center gap-1.5 mb-0.5">
                               <strong className="text-[#2d3748] font-bold">Role :</strong>
                               <span className="text-[#4a5568] font-bold">{proj.description.split(/role\s*:/i)[1]?.split('\n')[0]?.trim()}</span>
                            </div>
                          )}
                          <ul className="flex flex-col gap-2.5 pr-2">
                            {proj.description.split('\n').filter(l => {
                              const trimmed = l.trim();
                              return trimmed.startsWith('-') || trimmed.startsWith('•') || (trimmed.length > 20 && !trimmed.toLowerCase().includes('role :'));
                            }).map((line, lidx) => (
                              <li key={lidx} className="text-[12.5px] font-medium text-[#4a5568] leading-relaxed text-justify flex gap-3.5 pr-4">
                                <span className="w-[5px] h-[5px] bg-[#1a202c] rounded-full shrink-0 mt-[7.5px]" />
                                <span>{line.replace(/^[-•]\s*/, '')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* UI/UX Design Section */}
            {uiux && uiux.length > 0 && (
              <section className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-9 h-9 rounded-full bg-[#1a202c] flex items-center justify-center shrink-0 shadow-sm overflow-hidden z-20">
                     <GraduationCap className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-[20px] font-black uppercase text-[#1a202c] tracking-tighter leading-none flex-1 border-b-[3px] border-slate-200 pb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    UI/UX Design
                  </h3>
                </div>

                <div className="flex flex-col gap-7 pl-[72px]">
                  {uiux.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col gap-2">
                      <div className="absolute -left-[56px] top-[8px] w-3 h-3 rounded-full bg-white border-2 border-[#cbd5e0] z-20" />
                      <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
                        <h4 className="text-[14.5px] font-bold text-[#2d3748] leading-tight whitespace-nowrap shrink-0 overflow-hidden text-ellipsis">
                          {item.title}:
                        </h4>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noreferrer" className="text-[12.5px] font-bold text-[#4a5568] underline underline-offset-[3px] decoration-[#cbd5e0] hover:text-[#1a202c] transition-colors leading-tight whitespace-nowrap shrink-0">Figma</a>
                        )}
                      </div>
                      <p className="text-[12.5px] font-medium text-[#4a5568] leading-relaxed text-justify mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernTimelineTemplate;
