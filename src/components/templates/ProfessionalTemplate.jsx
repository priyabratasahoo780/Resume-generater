import React from "react";
import { Phone, Mail, Github, Linkedin } from "lucide-react";
import { QRCodeCanvas } from 'qrcode.react';

const ProfessionalTemplate = ({ data }) => {
  const {
    personalInfo,
    aboutMe,
    skills,
    projects,
    experience,
    education,
    certificates,
    achievements,
  } = data;

  return (
    <div className="w-full min-h-full bg-white text-slate-800 font-sans p-8 flex flex-col gap-4 overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b-2 border-slate-100 pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            {personalInfo?.name || "Your Name"}
          </h1>
          <p className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">
            {personalInfo?.title || "Professional Title"}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-[11px] text-slate-500 font-medium italic">
            {personalInfo?.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {personalInfo.email}
              </span>
            )}
            {personalInfo?.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {personalInfo.phone}
              </span>
            )}
            {personalInfo?.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />{" "}
                {personalInfo.linkedin.replace("https://www.", "")}
              </span>
            )}
            {personalInfo?.github && (
              <span className="flex items-center gap-1">
                <Github className="w-3 h-3" />{" "}
                {personalInfo.github.replace("https://", "")}
              </span>
            )}
          </div>
        </div>
        <div className="p-2 border border-slate-200 rounded-lg">
          <QRCodeCanvas 
            value={personalInfo?.portfolio || personalInfo?.linkedin || 'https://github.com'} 
            size={64}
            level={"H"}
            includeMargin={false}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-4">
        {/* About Me */}
        {aboutMe && (
          <section>
            <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-2 inline-block rounded">
              About Me
            </h2>
            <p className="text-[12px] leading-relaxed text-slate-600 text-justify border-l-2 border-indigo-100 pl-4 ml-1">
              {aboutMe}
            </p>
          </section>
        )}

        {/* Projects Section - RENDERED FIRST */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-3 inline-block rounded">
              Key Projects
            </h2>
            <div className="flex flex-col gap-4 ml-1">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border-l-2 border-slate-100 pl-4 pb-1"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-sm uppercase">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[12px] leading-snug text-slate-500 text-justify">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience Section - RENDERED SECOND */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-3 inline-block rounded">
              Work Experience
            </h2>
            <div className="flex flex-col gap-4 ml-1">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-2 border-slate-100 pl-4 pb-1"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-sm uppercase">
                      {exp.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400">
                      {exp.duration || '2024-Present'}
                    </span>
                  </div>
                  <p className="text-[12px] leading-snug text-slate-500 text-justify">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Grid */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-3 inline-block rounded">
              Skills
            </h2>
            <div className="flex flex-col gap-4 border-l-2 border-indigo-100 pl-4 ml-1">
              {skills.slice(0, 10).map((skillGroup, index) => {
                const parts = skillGroup.includes(':') ? skillGroup.split(':') : [null, skillGroup];
                const category = parts[0];
                const skillList = parts.slice(1).join(':').trim();

                return (
                  <div key={index} className="flex flex-col gap-1">
                    {category && (
                      <h4 className="text-[11px] font-black uppercase text-indigo-900">{category}</h4>
                    )}
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed font-sans">
                      {skillList}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-3 inline-block rounded">
                Education
              </h2>
              <div className="flex flex-col gap-3 border-l-2 border-indigo-100 pl-4 ml-1">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-900 text-xs uppercase">
                      {edu.institution}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                      {edu.degree}
                    </p>
                    {edu.score && (
                      <p className="text-[10px] text-slate-400 mt-0.5 italic">
                        {edu.score}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates (Optional) */}
          <section>
            <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-3 inline-block rounded">
              Certificates
            </h2>
            <ul className="flex flex-col gap-1.5 border-l-2 border-indigo-100 pl-4 ml-1">
              {(
                certificates || [
                  "C++ Certificate by Great Learning",
                  "Microsoft Certified: Azure Fundamentals",
                ]
              ).map((cert, i) => (
                <li
                  key={i}
                  className="text-[11px] text-slate-700 flex items-start gap-2"
                >
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Achievements */}
        <section>
          <h2 className="bg-indigo-50 text-indigo-900 px-3 py-1 font-bold uppercase text-xs tracking-widest mb-3 inline-block rounded">
            Achievements
          </h2>
          <ul className="flex flex-col gap-1.5 border-l-2 border-indigo-100 pl-4 ml-1">
            {(
              achievements || [
                "Ranked in the top 14% in JEE Mains 2024",
                "Active contributor to open-source projects on GitHub",
                "Enthusiastic problem solver with competitive programming experience",
              ]
            ).map((ach, i) => (
              <li
                key={i}
                className="text-[11px] text-slate-700 flex items-start gap-2"
              >
                <span className="text-indigo-400 font-bold">•</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
