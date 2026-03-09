import React from 'react';
import { Phone, Mail, Github, Linkedin, MonitorSmartphone } from 'lucide-react';

const ClassicTemplate = ({ data }) => {
  const { personalInfo, aboutMe, skills, projects, education } = data;

  return (
    <div className="w-full min-h-full bg-white p-12 text-slate-800 font-sans flex flex-col gap-6">
      
      {/* Header section */}
      <div className="flex flex-col gap-2 border-b-2 border-slate-800 pb-4">
        <h1 className="text-5xl font-extrabold uppercase tracking-tight text-black">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <h2 className="text-2xl font-normal text-slate-700">
          {personalInfo?.title || 'Your Job Title'}
        </h2>
        
        <div className="flex flex-wrap gap-4 text-sm mt-3 pt-3 border-t border-slate-300">
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
        
        <div className="flex flex-wrap gap-4 text-sm mt-1">
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
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1">
            About Me
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 text-justify">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1">
            Skills
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1">
            Projects
          </h3>
          <div className="flex flex-col gap-5">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <h4 className="font-bold text-black text-base">{project.title}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
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
                <p className="text-sm leading-relaxed text-slate-700 mt-1 text-justify">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1">
            Education
          </h3>
          <div className="flex flex-col gap-3">
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium text-slate-800 text-base">
                    {edu.degree} — {edu.institution}
                  </h4>
                  <span className="text-sm font-medium text-slate-600">[{edu.duration}]</span>
                </div>
                {edu.score && (
                  <p className="text-sm text-slate-600 mt-0.5">{edu.score}</p>
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
