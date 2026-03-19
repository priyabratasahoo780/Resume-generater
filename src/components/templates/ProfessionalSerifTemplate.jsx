import React from 'react';
import { Github, Linkedin, ExternalLink, Globe, Mail, Phone } from 'lucide-react';

const ProfessionalSerifTemplate = ({ data }) => {
  const { 
    personalInfo, 
    education, 
    skills, 
    projects, 
    achievements, 
    experience, 
    certificates, 
    aboutMe,
    expertise 
  } = data;

  return (
    <div className="w-full min-h-full bg-white text-slate-900 font-serif p-8 flex flex-col gap-6 shadow-inner print:p-0">
      
      {/* ── Header ── */}
      <header className="flex justify-between items-start border-b border-slate-300 pb-4">
        <div>
          <h1 className="text-[44px] font-medium leading-none tracking-tight uppercase">
            {personalInfo.name || 'Your Name'}
          </h1>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-sm">
            <span>{personalInfo.phone}</span>
            <Phone className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>{personalInfo.email}</span>
            <Mail className="w-3.5 h-3.5 text-slate-400" />
          </div>
          {personalInfo.portfolio && (
            <div className="flex items-center gap-2 text-sm">
              <span className="underline decoration-slate-300 underline-offset-4 font-bold">My Portfolio</span>
              <Globe className="w-3.5 h-3.5 text-slate-400" />
            </div>
          )}
        </div>
      </header>

      {/* ── Social Bar ── */}
      <div className="flex justify-center items-center gap-8 py-2 border-b border-slate-300 text-sm font-bold">
        {personalInfo.github && (
          <div className="flex items-center gap-2">
            <span className="underline decoration-slate-300 underline-offset-4">GitHub Profile</span>
          </div>
        )}
        <div className="w-px h-6 bg-slate-300" />
        {personalInfo.linkedin && (
          <div className="flex items-center gap-2">
            <span className="underline decoration-slate-300 underline-offset-4">Linkedin Profile</span>
          </div>
        )}
        <div className="w-px h-6 bg-slate-300" />
        {personalInfo.leetcode && (
          <div className="flex items-center gap-2">
            <span className="underline decoration-slate-300 underline-offset-4">Leetcode Profile</span>
          </div>
        )}
      </div>

      {/* ── About Me ── */}
      <section className="flex flex-col items-center gap-3">
        <h2 className="text-[20px] font-bold uppercase tracking-widest text-slate-600 relative inline-block">
          About Me
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-[1.5px] bg-slate-400" />
        </h2>
        <p className="text-[13px] text-center leading-relaxed max-w-3xl text-slate-700 mt-2 font-sans font-medium">
          {aboutMe || 'Professional summary...'}
        </p>
        
        {/* Expertise Bullets */}
        {(expertise && expertise.length > 0) && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 max-w-4xl">
            {expertise.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[12px] text-slate-600 font-bold font-sans">
                <span className="text-indigo-400 text-lg leading-none">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Two Column Layout ── */}
      <div className="flex gap-8 flex-1">
        
        {/* Left Column */}
        <div className="w-[38%] flex flex-col gap-6">
          
          {/* Education */}
          {(education && education.length > 0) && (
            <section className="flex flex-col gap-3">
              <h3 className="text-[18px] font-bold uppercase tracking-wider text-slate-600 border-b-2 border-slate-200 pb-1">
                Education
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <h4 className="text-[14px] font-bold text-slate-800">{edu.institution}</h4>
                    <p className="text-[13px] text-slate-600 italic font-medium">{edu.degree}</p>
                    <p className="text-[12px] text-slate-500">{edu.duration}</p>
                    {edu.score && <p className="text-[12px] text-slate-700 font-bold">CGPA : {edu.score}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(skills && skills.length > 0) && (
            <section className="flex flex-col gap-3">
              <h3 className="text-[18px] font-bold uppercase tracking-wider text-slate-600 border-b-2 border-slate-200 pb-1">
                Skills
              </h3>
              <div className="flex flex-col gap-2.5">
                {skills.map((skillGroup, idx) => {
                  const [category, ...rest] = skillGroup.split(':');
                  const list = rest.join(':').trim();
                  return (
                    <div key={idx} className="text-[13px] leading-snug">
                      <span className="font-bold text-slate-800">{category}:</span> 
                      <span className="text-slate-600 font-medium font-sans ml-1 text-[12px]">{list}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Certificates */}
          {(certificates && certificates.length > 0) && (
            <section className="flex flex-col gap-3">
              <h3 className="text-[18px] font-bold uppercase tracking-wider text-slate-600 border-b-2 border-slate-200 pb-1">
                Certificates
              </h3>
              <ul className="flex flex-col gap-1.5 list-disc pl-4">
                {certificates.map((cert, idx) => (
                  <li key={idx} className="text-[13px] text-slate-700 font-medium underline decoration-slate-300 font-sans leading-tight">
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Vertical Line */}
        <div className="w-px bg-slate-300" />

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Work Experience */}
          {(experience && experience.length > 0) && (
            <section className="flex flex-col gap-3">
              <h3 className="text-[18px] font-bold uppercase tracking-wider text-slate-600 border-b-2 border-slate-200 pb-1">
                Work Experience
              </h3>
              <div className="flex flex-col gap-5">
                {experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-[14px] font-bold text-slate-800">{exp.title}</h4>
                      <span className="text-[11px] text-slate-500 font-sans font-bold">{exp.duration}</span>
                    </div>
                    <p className="text-[12px] text-slate-600 font-sans leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {(projects && projects.length > 0) && (
            <section className="flex flex-col gap-3">
              <h3 className="text-[18px] font-bold uppercase tracking-wider text-slate-600 border-b-2 border-slate-200 pb-1">
                Projects
              </h3>
              <div className="flex flex-col gap-5">
                {projects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-slate-800">{proj.title}</h4>
                        {proj.github && (
                          <span className="text-[12px] text-slate-500 underline decoration-slate-300 italic">Github</span>
                        )}
                        {proj.deploy && (
                          <span className="text-[12px] text-slate-500 underline decoration-slate-300 italic">Deployed</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-sans font-bold">{proj.duration}</span>
                    </div>
                    <p className="text-[12px] text-slate-600 font-sans leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer Branding - Optional or subtle */}
      <footer className="mt-auto pt-4 flex justify-end">
        <div className="text-[11px] text-slate-400 font-sans italic">
          More Projects - <span className="underline decoration-slate-200">Projects</span>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalSerifTemplate;
