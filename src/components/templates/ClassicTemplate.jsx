import React from 'react';
import { Phone, Mail, Github, Linkedin, MonitorSmartphone } from 'lucide-react';

const ClassicTemplate = ({ data }) => {
  const { personalInfo, aboutMe, skills, projects, experience, education } = data;

  return (
    <div className="w-full min-h-full bg-white p-8 text-slate-800 font-sans flex flex-col gap-4">
      
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b-2 border-slate-800 pb-1.5">
        <h1 className="text-[24px] font-extrabold uppercase tracking-tight text-black">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <h2 className="text-[14px] font-normal text-slate-700">
          {personalInfo?.title || 'Your Job Title'}
        </h2>
        
        <div className="flex flex-wrap gap-4 text-[12px] mt-1.5 pt-1.5 border-t border-slate-300">
          {personalInfo?.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-slate-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 text-[12px] mt-1">
          {personalInfo?.github && (
            <div className="flex items-center gap-1.5">
              <Github className="w-4 h-4 text-slate-600" />
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {personalInfo.github}
              </a>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {personalInfo.linkedin}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* About Me Section */}
      {aboutMe && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5">
            About Me
          </h3>
          <p className="text-[12px] leading-relaxed text-slate-700 text-justify">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5">
            Skills
          </h3>
          <div className="flex flex-col gap-1.5">
            {skills.map((skillGroup, index) => {
              const parts = skillGroup.includes(':') ? skillGroup.split(':') : [null, skillGroup];
              const category = parts[0];
              const skillList = parts.slice(1).join(':').trim();
              
              return (
                <div key={index} className="flex flex-col gap-0.5">
                  {category && (
                    <h4 className="text-[12px] font-bold text-black uppercase tracking-tight">{category}</h4>
                  )}
                  <p className="text-[12px] text-slate-700 leading-relaxed">
                    {skillList}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5">
            Work Experience
          </h3>
          <div className="flex flex-col gap-3">
            {experience.map((exp, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-black text-[14px]">{exp.title}</h4>
                  <span className="text-[11px] font-bold text-slate-500">{exp.duration || '2024-Present'}</span>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700 text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5">
            Projects
          </h3>
          <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col gap-1">
                <h4 className="font-bold text-black text-[14px]">{project.title}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-slate-600">
                  {project.github && (
                    <span><strong>GitHub:</strong> <a href={project.github} className="text-blue-600 underline">{project.github}</a></span>
                  )}
                  {project.figma && (
                    <span><strong>Figma Link:</strong> <a href="#" className="text-blue-600 underline">{project.figma}</a></span>
                  )}
                  {project.deploy && (
                    <span><strong>Deploy Link:</strong> <a href={project.deploy} className="text-blue-600 underline">{project.deploy}</a></span>
                  )}
                </div>
                <p className="text-[12px] leading-relaxed text-slate-700 mt-0.5 text-justify">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-0.5">
            Education
          </h3>
          <div className="flex flex-col gap-1.5">
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium text-slate-800 text-[14px]">
                    {edu.degree} — {edu.institution}
                  </h4>
                  <span className="text-[12px] font-medium text-slate-600">[{edu.duration}]</span>
                </div>
                {edu.score && (
                  <p className="text-[12px] text-slate-600">{edu.score}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ClassicTemplate;
