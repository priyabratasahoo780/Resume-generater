import React from 'react';
import { Github, Linkedin, Youtube, Globe, Mail, Phone, MapPin, ExternalLink, Trophy, Zap, BookOpen } from 'lucide-react';

const ElegantTemplate = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, achievements, hackathons, uiux, aboutMe, certificates, languages } = data;

  return (
    <div className="w-full min-h-full bg-white text-[#333] font-serif flex flex-col gap-0 shadow-inner overflow-hidden leading-tight">
      {/* ── Header ── */}
      <header className="px-10 pt-8 pb-3 flex flex-col items-start gap-4">
        <div className="flex flex-col gap-0.5 w-full">
          <h1 className="text-[42px] font-bold text-[#1a1a1a] leading-none tracking-tight font-serif">
            {personalInfo?.name || 'RIDHAM PATEL'}
          </h1>
          <p className="text-[14px] font-sans font-black text-[#2D4A22] tracking-[0.2em] mt-2 uppercase">
            {personalInfo?.title || 'FULL STACK DEVELOPER'}
          </p>
        </div>

        {/* Contact Info Row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-sans font-medium text-slate-500 border-b border-slate-200 pb-4 w-full -mt-2">
           {personalInfo?.email && (
             <div className="flex items-center gap-1.5">
               <Mail className="w-3.5 h-3.5 text-slate-400" />
               <span className="text-slate-600">{personalInfo.email}</span>
             </div>
           )}
           {personalInfo?.phone && (
             <div className="flex items-center gap-1.5">
               <Phone className="w-3.5 h-3.5 text-slate-400" />
               <span className="text-slate-600">{personalInfo.phone}</span>
             </div>
           )}
           {personalInfo?.location && (
             <div className="flex items-center gap-1.5">
               <MapPin className="w-3.5 h-3.5 text-slate-400" />
               <span className="text-slate-600">{personalInfo.location}</span>
             </div>
           )}
           <div className="flex items-center gap-2 ml-auto">
             <Globe className="w-3.5 h-3.5 text-slate-400" />
             <div className="flex gap-2 text-slate-600 underline decoration-slate-300 underline-offset-4 decoration-1 font-bold">
               <a href={personalInfo?.linkedin}>LinkedIn</a>
               <span className="text-slate-300 no-underline font-normal">|</span>
               <a href={personalInfo?.github}>Github</a>
               <span className="text-slate-300 no-underline font-normal">|</span>
               <a href={personalInfo?.youtube}>Youtube</a>
               <span className="text-slate-300 no-underline font-normal">|</span>
               <a href={personalInfo?.portfolio}>Portfolio</a>
               <span className="text-slate-300 no-underline font-normal">|</span>
               <a href={personalInfo?.leetcode}>LeetCode</a>
             </div>
           </div>
        </div>
      </header>

      <div className="flex px-10 py-2 gap-8">
        {/* ── Left Column ── */}
        <aside className="w-[42%] flex flex-col gap-6">
          
          {/* Skills Section */}
          <section className="flex flex-col gap-4 mt-2">
            <h2 className="text-[20px] font-bold text-[#1a1a1a] border-b-[3px] border-[#2D4A22] pb-1 uppercase tracking-tight w-full">
              Skills
            </h2>
            <div className="flex flex-col gap-5">
              {skills?.map((skillGroup, idx) => {
                const parts = skillGroup.includes(':') 
                  ? skillGroup.split(':') 
                  : ['Skills', skillGroup];
                const category = parts[0].trim();
                const skillList = parts.slice(1).join(':').trim();
                
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <h3 className="text-[17px] font-sans font-bold text-[#2D4A22]">
                      {category}
                    </h3>
                    <p className="text-[14px] font-sans text-slate-700 leading-relaxed font-medium">
                      {skillList}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Hackathons & Awards (Left) */}
          {(hackathons && hackathons.length > 0) && (
            <section className="flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
                Hackathons & Awards
              </h2>
              <div className="flex flex-col gap-5">
                {hackathons.slice(0, 3).map((hack, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#487D39] font-bold text-[14px] mt-0.5">{idx + 1}.</span>
                      <div className="flex flex-col gap-0.5">
                         <h4 className="text-[15px] font-bold text-[#1a1a1a] leading-tight font-serif">{hack.title}</h4>
                         <p className="text-[11px] font-sans text-slate-500 font-medium italic">{hack.subtitle || 'International Grand Challenge | Jan 2026'}</p>
                      </div>
                    </div>
                    <p className="text-[12px] font-sans text-slate-600 leading-snug font-medium ml-4">
                      {hack.description}
                    </p>
                    <div className="flex gap-3 ml-4 text-[10px] font-sans font-bold text-slate-500 underline decoration-slate-200 underline-offset-4 decoration-1">
                      <a href="#">Certificate</a>
                      <span className="text-slate-300 no-underline font-normal">|</span>
                      <a href={hack.github}>Github</a>
                      <span className="text-slate-300 no-underline font-normal">|</span>
                      <a href={hack.deploy}>Result</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications (2 Columns) */}
          <section className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {achievements?.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-[11px] font-sans font-medium text-slate-400 w-4">{idx + 1}.</span>
                  <span className="text-[11px] font-sans text-slate-700 font-medium underline decoration-slate-200 underline-offset-[3px]">
                    {ach}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Languages
            </h2>
            <p className="text-[12px] font-sans text-slate-700 font-medium">
              {languages?.join(' | ') || 'English | Gujrati (Native:) | Hindi'}
            </p>
          </section>
        </aside>

        {/* ── Right Column ── */}
        <main className="flex-1 flex flex-col gap-6 mt-2">
          
          {/* Expertise & Summary Box */}
          <section className="bg-[#f9fafb] border-l-[4px] border-[#2D4A22] border-t-[3px] border-t-slate-800 p-5 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-3">
              Expertise & Summary
            </h2>
            <div className="h-[1px] bg-slate-200 w-full mb-4" />
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-2.5 text-[12.5px] font-sans text-slate-700 font-medium leading-normal">
                <span className="text-[#487D39] text-sm leading-none mt-1">•</span>
                <span>Full-stack web development with React & Node.js</span>
              </li>
              <li className="flex items-start gap-2.5 text-[12.5px] font-sans text-slate-700 font-medium leading-normal">
                <span className="text-[#487D39] text-sm leading-none mt-1">•</span>
                <span>MongoDB database management</span>
              </li>
              <li className="flex items-start gap-2.5 text-[12.5px] font-sans text-slate-700 font-medium leading-normal">
                <span className="text-[#487D39] text-sm leading-none mt-1">•</span>
                <span>Authentication & security (JWT, & role-based access)</span>
              </li>
              <li className="flex items-start gap-2.5 text-[12.5px] font-sans text-slate-700 font-medium leading-normal">
                <span className="text-[#487D39] text-sm leading-none mt-1">•</span>
                <span>RESTful API development</span>
              </li>
              <li className="flex items-start gap-2.5 text-[12.5px] font-sans text-slate-700 font-medium leading-normal">
                <span className="text-[#487D39] text-sm leading-none mt-1">•</span>
                <span>UI/UX design with Figma</span>
              </li>
            </ul>
          </section>

          {/* Education & Award */}
          <section className="flex flex-col gap-4">
             <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Education & Award
            </h2>
            <div className="flex flex-col gap-4">
              {education?.map((edu, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-[15px] font-bold text-[#1a1a1a] font-serif">{edu.school || edu.institution}</h4>
                    <span className="text-[13px] font-sans font-black text-[#487D39]">{edu.duration}</span>
                  </div>
                  <p className="text-[12px] font-sans text-slate-500 italic font-medium">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hackathons & Awards (Right/Projects) */}
          <section className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Hackathons & Awards
            </h2>
            <div className="flex flex-col gap-5">
              {hackathons?.slice(3, 5).map((proj, idx) => (
                <div key={idx} className="flex flex-col gap-1 group">
                  <h4 className="text-[15px] font-bold text-[#1a1a1a] font-serif leading-tight">
                    {proj.title}
                  </h4>
                  <p className="text-[12px] font-sans text-slate-500 leading-snug font-medium italic">
                    Toul-Repeatable table layouts with the Tab-1/7. Cool design page...
                  </p>
                  <div className="flex gap-3 text-[10px] font-sans font-bold text-slate-500 underline decoration-slate-200 underline-offset-4 decoration-1">
                    <a href={proj.github}>Github</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.github}>FMT</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.deploy}>Website</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Open Source */}
          <section className="flex flex-col gap-4">
             <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Open Source
            </h2>
            <div className="flex flex-col gap-4">
              {projects?.filter(p => !p.category || p.category === 'Open Source').slice(0, 2).map((proj, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <h4 className="text-[15px] font-bold text-[#1a1a1a] font-serif leading-tight">
                    {proj.title}
                  </h4>
                  <p className="text-[12px] font-sans text-slate-600 leading-snug font-medium">
                    {proj.description || 'Top metalged tool using React and Fabric.js state management.'}
                  </p>
                  <div className="flex gap-3 text-[10px] font-sans font-bold text-slate-500 underline decoration-slate-200 underline-offset-4 decoration-1 mt-1">
                    <a href={proj.github}>Github</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.deploy}>FMT</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.deploy}>Freeing</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Projects */}
          <section className="flex flex-col gap-4">
             <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Professional Projects
            </h2>
            <div className="flex flex-col gap-4">
              {projects?.slice(0, 2).map((proj, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <h4 className="text-[15px] font-bold text-[#1a1a1a] font-serif leading-tight">
                    {proj.title}
                  </h4>
                  <p className="text-[12px] font-sans text-slate-600 leading-snug font-medium">
                    {proj.description || 'Full stack web application built with React, Node.js, Express.js and MongoDB.'}
                  </p>
                  <div className="flex gap-3 text-[10px] font-sans font-bold text-slate-500 underline decoration-slate-200 underline-offset-4 decoration-1 mt-1">
                    <a href={proj.github}>Github</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.deploy}>Demo</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.github}>PRs</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

           {/* Frontend & UI/UX Projects */}
           <section className="flex flex-col gap-4">
             <h2 className="text-[18px] font-bold text-[#1a1a1a] border-b border-black pb-1 uppercase tracking-tight w-full">
              Frontend & UI/UX Projects
            </h2>
            <div className="flex flex-col gap-4">
              {uiux?.slice(0, 2).map((proj, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <h4 className="text-[15px] font-bold text-[#1a1a1a] font-serif leading-tight">
                    {proj.title}
                  </h4>
                  <p className="text-[12px] font-sans text-slate-600 leading-snug font-medium">
                    {proj.description}
                  </p>
                  <div className="flex gap-3 text-[10px] font-sans font-bold text-slate-500 underline decoration-slate-200 underline-offset-4 decoration-1 mt-1">
                    <a href={proj.figma}>Figma</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.link}>Demo</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.github}>Github</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.link}>Postman</a>
                    <span className="text-slate-300 no-underline font-normal">|</span>
                    <a href={proj.link}>Checklist</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer Badges */}
      <footer className="px-10 py-4 mt-auto mb-4 flex flex-col gap-2">
         <div className="h-[2px] bg-black w-full" />
         <div className="flex justify-between items-center bg-white">
            <h3 className="text-[15px] font-bold uppercase tracking-tight whitespace-nowrap">Frontend & UI/UX Projects</h3>
            <div className="flex flex-wrap gap-1 justify-end ml-4">
               {['Qualmai: React', 'Nextjs Chat', 'Task Bridge', 'Military Thesis', 'AI Notice', 'Phonogram: React Platform', 'Bestjie: Abig CRM', 'Figma', 'Shadow', 'Native CSS', 'Design', 'Elastic Search', 'Timeline', 'Cooling CSS'].map((tag, i) => (
                 <span key={i} className="px-2 py-0.5 bg-slate-100 text-[8.5px] font-sans font-bold text-slate-600 rounded-sm border border-slate-200 whitespace-nowrap">
                   {tag}
                 </span>
               ))}
            </div>
         </div>
         <div className="flex gap-4 text-[9px] font-sans font-bold text-[#2D4A22] underline decoration-slate-200 underline-offset-[2px]">
            <a href="#">Github</a>
            <span className="text-slate-300 no-underline font-normal">|</span>
            <a href="#">FESTr</a>
            <span className="text-slate-300 no-underline font-normal">|</span>
            <a href="#">Website</a>
         </div>
      </footer>
    </div>
  );
};

export default ElegantTemplate;
