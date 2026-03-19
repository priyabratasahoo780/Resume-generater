import { Phone, Mail, Globe, Github, Linkedin, Youtube, Award, GraduationCap, Briefcase, Code, User, ExternalLink, Figma } from 'lucide-react';

const CreativeTemplate = ({ data }) => {
  const { personalInfo, skills, projects, hackathons, uiux, education, certificates, achievements } = data;

  // Simple categorizer if format is "Category: Skill1, Skill2"
  const getCategorizedItems = (items) => {
    const categorized = {};
    let currentCategory = 'Other';

    (items || []).forEach(item => {
      if (item.includes(':')) {
        const [category, itemText] = item.split(':').map(s => s.trim());
        if (!categorized[category]) categorized[category] = [];
        categorized[category].push(itemText);
        currentCategory = category;
      } else {
        if (!categorized[currentCategory]) categorized[currentCategory] = [];
        categorized[currentCategory].push(item);
      }
    });
    return categorized;
  };

  const categorizedSkills = getCategorizedItems(skills);
  const categorizedCerts = getCategorizedItems(certificates);

  return (
    <div className="w-full min-h-full bg-white text-[#444] font-serif flex flex-col gap-0 shadow-inner border border-slate-200">
      
      {/* ── Header ── */}
      <header className="bg-slate-50 px-14 pt-4 pb-3 flex justify-between items-center border-b border-white">
        <div className="flex flex-col gap-1">
          <h1 className="text-[42px] font-medium text-[#444] tracking-tight border-b-2 border-[#444] pb-1.5 px-1 leading-none whitespace-nowrap overflow-hidden text-ellipsis">
            {personalInfo?.name?.toUpperCase() || 'VASARA SUJAL'}
          </h1>
        </div>

        <div className="flex flex-col items-end gap-3 text-right">
          <div className="flex items-center gap-3 text-[#555] font-sans text-sm font-medium">
             <span className="tracking-wide">{personalInfo?.phone || '+91 6354937917'}</span>
             <div className="w-9 h-9 rounded-full bg-[#555] flex items-center justify-center shadow-sm">
                <Phone className="w-4 h-4 text-white" />
             </div>
          </div>
          <div className="flex items-center gap-3 text-[#555] font-sans text-sm font-medium">
             <span className="tracking-wide underline underline-offset-4 decoration-[#ccc]">{personalInfo?.email || 'vasarasujal.cg@gmail.com'}</span>
             <div className="w-9 h-9 rounded-full bg-[#555] flex items-center justify-center shadow-sm">
                <Mail className="w-4 h-4 text-white" />
             </div>
          </div>
          <div className="flex items-center gap-3 text-[#555] font-sans text-sm font-medium">
             <span className="tracking-wide underline underline-offset-4 decoration-[#ccc]">{personalInfo?.portfolio?.replace(/^https?:\/\//, '') || 'sujalvasara.me'}</span>
             <div className="w-9 h-9 rounded-full bg-[#555] flex items-center justify-center shadow-sm">
                <Globe className="w-4 h-4 text-white" />
             </div>
          </div>
        </div>
      </header>

      {/* ── Social Profile Links Bar ── */}
      <div className="grid grid-cols-4 divide-x divide-[#ddd] bg-white py-2.5 border-y border-[#ddd] px-8">
        {[
          { icon: Github, label: 'GitHub Profile', link: personalInfo?.github },
          { icon: Linkedin, label: 'Linkedin Profile', link: personalInfo?.linkedin },
          { icon: Code, label: 'Leetcode Profile', link: personalInfo?.leetcode },
          { icon: Youtube, label: 'YouTube Profile', link: personalInfo?.youtube }
        ].map((item, idx) => (
          <div key={idx} className="flex justify-center items-center">
            <a href={item.link} target="_blank" rel="noreferrer" className="text-sm font-sans font-bold text-[#666] hover:text-[#333] transition-colors underline underline-offset-8 decoration-[#bbb]">
              {item.label}
            </a>
          </div>
        ))}
      </div>

      <div className="flex px-14 py-3 gap-8">
        {/* ── Left Column ── */}
        <aside className="w-[30%] flex flex-col gap-5 shrink-0">
          
          {/* Skills */}
          <section className="flex flex-col gap-6">
            <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b border-[#ccc] pb-0.5 w-full italic">
              Skills
            </h3>
            <div className="flex flex-col gap-6">
              {Object.entries(categorizedSkills).map(([category, items], i) => (
                <div key={i} className="flex flex-col gap-2.5">
                  <h4 className="font-sans font-bold text-[#444] text-[16px] leading-tight">{category} :</h4>
                  <ul className="flex flex-col gap-2.5 pl-4">
                    {items.map((skill, j) => (
                      <li key={j} className="text-[14px] font-sans text-[#555] flex items-start gap-4 leading-snug">
                        <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-[7px]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="flex flex-col gap-6">
            <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b border-[#bbb] pb-0.5 w-full italic">
              Education
            </h3>
            <div className="flex flex-col gap-8">
              {education?.map((edu, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h4 className="font-sans font-bold text-[#444] text-[18px] leading-tight">{edu.institution}</h4>
                  <ul className="flex flex-col gap-2 pl-4">
                    <li className="text-[14px] font-sans text-[#555] flex items-start gap-4 leading-snug">
                       <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-2" />
                       <div className="flex flex-col">
                          <span>{edu.degree}</span>
                          <span className="text-[#888]">{edu.duration}</span>
                       </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="flex flex-col gap-6">
            <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b border-[#bbb] pb-0.5 w-full italic">
              Certifications
            </h3>
            <div className="flex flex-col gap-8">
              {Object.entries(categorizedCerts).map(([category, items], i) => (
                <div key={i} className="flex flex-col gap-4">
                  <h4 className="font-sans font-bold text-[#444] text-[16px] leading-tight">{category}</h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pl-4">
                    {items.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-1.5" />
                        <span className="text-[13px] font-sans text-[#555] underline underline-offset-[6px] decoration-[#eee] decoration-[1.5px]">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* ── Vertical Divider ── */}
        <div className="w-[1.5px] bg-[#bbb]" />

        {/* ── Right Column ── */}
        <main className="flex-1 flex flex-col gap-6">
          
            {/* Hackathons Section */}
            {hackathons && hackathons.length > 0 && (
              <section className="flex flex-col gap-6 mt-4 min-w-0">
                <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b-2 border-[#ccc] pb-0.5 w-full italic leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                  Hackathon & Team Projects
                </h3>
                <div className="flex flex-col gap-4">
                  {hackathons.map((hack, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="flex justify-between items-baseline min-w-0">
                        <h4 className="text-[17px] font-bold text-[#444] italic leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{hack.title}</h4>
                      </div>
                      <ul className="flex flex-col gap-3 pl-4">
                        <li className="text-[15px] font-sans text-[#555] leading-relaxed text-justify flex gap-4 items-start">
                          <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-[9px]" />
                          <span className="text-[14px]">{hack.description}</span>
                        </li>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-0.5 ml-5 text-[13px] font-sans font-bold text-[#555]">
                           {hack.github && (
                             <a href={hack.github} className="underline underline-offset-[6px] decoration-[#bbb] hover:text-[#000] transition-colors">GitHub</a>
                           )}
                           {hack.deploy && (
                             <a href={hack.deploy} className="underline underline-offset-[6px] decoration-[#bbb] hover:text-[#000] transition-colors">Demo</a>
                           )}
                           {hack.video && (
                             <a href={hack.video} className="underline underline-offset-[6px] decoration-[#bbb] hover:text-[#000] transition-colors">Video</a>
                           )}
                        </div>
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            <section className="flex flex-col gap-6 min-w-0">
              <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b-2 border-[#ccc] pb-0.5 w-full italic leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                Projects
              </h3>
              <div className="flex flex-col gap-6">
                {projects?.map((proj, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="flex justify-between items-baseline min-w-0">
                    <h4 className="text-[17px] font-bold text-[#444] italic leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{proj.title}</h4>
                  </div>
                  <p className="text-[14px] font-sans text-[#555] italic leading-none">( {proj.duration || '2024'} )</p>
                  
                  <ul className="flex flex-col gap-3 pl-4">
                    <li className="text-[15px] font-sans text-[#555] leading-relaxed text-justify flex gap-4 items-start">
                      <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-[9px]" />
                      <span>{proj.description.split('\n').map((line, lidx) => (
                        <span key={lidx} className="block mb-1">
                          {line.startsWith('Technologies:') ? <strong><u>Technologies:</u></strong> : 
                           line.startsWith('Role:') ? <strong><u>Role:</u></strong> : null}
                          {' '}{line.replace(/^(Technologies:|Role:)\s*/, '')}
                        </span>
                      ))}</span>
                    </li>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-0.5 ml-5 text-[13px] font-sans font-bold text-[#555]">
                       {proj.github && (
                         <a href={proj.github} className="underline underline-offset-[6px] decoration-[#bbb] hover:text-[#000] transition-colors">GitHub Repo</a>
                       )}
                       {proj.deploy && (
                         <a href={proj.deploy} className="underline underline-offset-[6px] decoration-[#bbb] hover:text-[#000] transition-colors">Demo Video</a>
                       )}
                    </div>
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* UI/UX Design Section */}
          {uiux && uiux.length > 0 && (
            <section className="flex flex-col gap-6 min-w-0">
              <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b-2 border-[#ccc] pb-0.5 w-full italic whitespace-nowrap overflow-hidden text-ellipsis">
                UI/UX Design
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 pl-4">
                {uiux.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0" />
                      <h4 className="text-[17px] font-bold text-[#444] italic leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</h4>
                      {item.link && (
                        <a href={item.link} className="text-xs font-sans font-bold text-[#888] underline underline-offset-4 decoration-[#ddd]">Figma</a>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[14px] font-sans text-[#666] leading-relaxed pl-5 italic">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          <section className="flex flex-col gap-6 min-w-0">
            <h3 className="text-[20px] font-medium uppercase text-[#444] tracking-wider border-b-2 border-[#ccc] pb-0.5 w-full italic leading-none whitespace-nowrap overflow-hidden text-ellipsis">
              Achievements
            </h3>
            <ul className="flex flex-col gap-5 pl-4">
              {(achievements || []).map((ach, idx) => (
                <li key={idx} className="text-[15px] font-sans text-[#555] leading-relaxed flex gap-4 text-justify items-start">
                  <span className="w-1.5 h-1.5 bg-[#444] rounded-full shrink-0 mt-[9px]" />
                  <span className="flex-1 text-[14px]">
                    {ach.split(/(9.81 CGPA|Final Round of Odoo × Gandhinagar|5\+ hackathons)/g).map((part, pidx) => (
                      <span key={pidx} className={part.match(/9.81 CGPA|Final Round of Odoo × Gandhinagar|5\+ hackathons/) ? "font-bold text-[#333]" : ""}>
                        {part}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CreativeTemplate;
