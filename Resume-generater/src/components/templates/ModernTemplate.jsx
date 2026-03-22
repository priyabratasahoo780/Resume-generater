import React from 'react';
import { Phone, Mail, Github, Linkedin, MapPin, MonitorSmartphone } from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, aboutMe, skills, projects, education } = data;

  return (
    <div className="w-full h-full bg-white text-slate-800 font-sans flex drop-shadow-sm">
      
      {/* Left Sidebar */}
      <div className="w-[35%] bg-indigo-900 text-indigo-50 p-8 flex flex-col gap-8 h-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white mb-1">
            {personalInfo?.name || 'Your Name'}
          </h1>
          <h2 className="text-lg font-medium text-indigo-300 tracking-wide uppercase">
            {personalInfo?.title || 'Your Job Title'}
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-sm mt-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 border-b border-indigo-700 pb-2">Contact</h3>
          {personalInfo?.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-indigo-300" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-300" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center gap-3">
              <Github className="w-4 h-4 text-indigo-300" />
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {personalInfo.github.replace('https://', '')}
              </a>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center gap-3">
              <Linkedin className="w-4 h-4 text-indigo-300" />
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {personalInfo.linkedin.replace('https://www.', '')}
              </a>
            </div>
          )}
        </div>

        {skills && skills.length > 0 && (
          <div className="flex flex-col gap-3 mt-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 border-b border-indigo-700 pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-indigo-800/50 text-indigo-100 rounded text-xs font-medium border border-indigo-700/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-10 flex flex-col gap-8 h-full bg-white">
        
        {/* About Me */}
        {aboutMe && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
              <span className="w-8 h-px bg-indigo-900 inline-block"></span> Profile
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 text-justify">
              {aboutMe}
            </p>
          </div>
        )}

        {/* Projects Partition */}
        {projects && projects.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
              <span className="w-8 h-px bg-indigo-900 inline-block"></span> Projects
            </h3>
            <div className="flex flex-col gap-5">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col gap-1.5 relative pl-4 border-l-2 border-indigo-100 pb-2">
                  <div className="absolute w-2.5 h-2.5 bg-indigo-500 rounded-full -left-[6px] top-1.5 ring-4 ring-white"></div>
                  <h4 className="font-bold text-slate-900 text-md">{project.title}</h4>
                  <div className="flex flex-wrap gap-3 text-[11px] text-indigo-600 font-medium my-0.5">
                    {project.github && (
                      <a href={project.github} className="hover:underline flex items-center gap-1"><Github className="w-3 h-3"/> GitHub</a>
                    )}
                    {project.deploy && (
                      <a href={project.deploy} className="hover:underline flex items-center gap-1"><MonitorSmartphone className="w-3 h-3"/> Live Site</a>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 mt-1 text-justify">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
              <span className="w-8 h-px bg-indigo-900 inline-block"></span> Education
            </h3>
            <div className="flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-1 relative pl-4 border-l-2 border-indigo-100">
                  <div className="absolute w-2.5 h-2.5 bg-indigo-500 rounded-full -left-[6px] top-1.5 ring-4 ring-white"></div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-slate-900 text-base">{edu.degree}</h4>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{edu.duration}</span>
                  </div>
                  <div className="text-sm font-medium text-slate-700">{edu.institution}</div>
                  {edu.score && (
                    <p className="text-xs text-slate-500 mt-0.5">{edu.score}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ModernTemplate;
