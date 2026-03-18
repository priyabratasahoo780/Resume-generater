import React from 'react';
import { 
  Github, 
  Linkedin, 
  Globe, 
  Mail, 
  Trophy, 
  Briefcase, 
  Palette, 
  ExternalLink, 
  Zap, 
  Code,
  GraduationCap,
  PlayCircle
} from 'lucide-react';

const ModernTimelineTemplate = ({ data }) => {
  const { 
    personalInfo, 
    skills, 
    projects, 
    hackathons, 
    uiux, 
    certificates, 
    languages 
  } = data || {};

  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  // Initialize audio only once
  React.useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Helper to render section title with line
  const SectionHeader = ({ title, showLinks }) => (
    <div className="flex items-center justify-between border-b border-gray-300 pb-1 mb-3">
      <h2 className="text-[16px] font-black uppercase tracking-widest text-gray-800">
        {title}
      </h2>
      {showLinks && (
        <span className="text-[12px] font-bold text-gray-500 underline uppercase tracking-tight">Links</span>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-full bg-white text-gray-800 font-sans p-10 flex flex-col gap-6 leading-tight select-none">
      {/* ── Header ── */}
      <header className="flex flex-col gap-1 relative">
        {/* Music Toggle */}
        <button 
          onClick={toggleMusic}
          className={`absolute right-0 top-0 p-2 rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-yellow-50 text-amber-500 hover:bg-yellow-100'
          }`}
          title={isPlaying ? "Click to Pause Music" : "Click to Play Music"}
        >
          {isPlaying ? (
            <PlayCircle className="w-6 h-6 fill-amber-200" />
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          )}
        </button>

        <h1 className="text-[36px] font-black uppercase tracking-tight text-gray-900 border-b-none pr-12">
          {personalInfo?.name || 'NAME SURNAME'}
        </h1>
        <p className="text-[16px] font-medium text-gray-600 tracking-wide">
          {personalInfo?.title || 'Job Title'}
        </p>
        <div className="h-px bg-gray-300 w-full mt-2" />
      </header>

      <div className="flex gap-10">
        {/* ── Left Sidebar (33%) ── */}
        <aside className="w-[33%] flex flex-col gap-8">
          
          {/* Contact */}
          <section>
            <SectionHeader title="Contact" />
            <div className="flex flex-col gap-3">
              {personalInfo?.email && (
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-sm bg-blue-50">
                    <Mail className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                  </div>
                  <span className="text-[13px] font-medium text-gray-700 truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.portfolio && (
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-sm bg-cyan-50">
                    <Globe className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <a href={personalInfo.portfolio} className="text-[13px] font-bold text-gray-700 hover:text-indigo-600">Portfolio</a>
                </div>
              )}
              {personalInfo?.linkedin && (
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-sm overflow-hidden">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <a href={personalInfo.linkedin} className="text-[13px] font-bold text-gray-700 hover:text-indigo-600">LinkedIn</a>
                </div>
              )}
              {personalInfo?.github && (
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-sm overflow-hidden">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#181717">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <a href={personalInfo.github} className="text-[13px] font-bold text-gray-700 hover:text-indigo-600">GitHub</a>
                </div>
              )}
              {personalInfo?.leetcode && (
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-sm overflow-hidden">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFA116">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-4.68 4.68a1.375 1.375 0 1 0 1.944 1.944l4.68-4.68a1.374 1.374 0 0 0-1.944-1.944zM24 10.625l-6.29 6.29a3.11 3.11 0 1 1-4.398-4.398l6.29-6.29A3.11 3.11 0 1 1 24 10.625zM12.43 14.436l-3.328 3.328a1.375 1.375 0 1 0 1.944 1.944l3.328-3.328a1.375 1.375 0 1 0-1.944-1.944zM4.73 14.436l-3.328 3.328a1.375 1.375 0 1 0 1.944 1.944l3.328-3.328a1.375 1.375 0 1 0-1.944-1.944z"/>
                    </svg>
                  </div>
                  <a href={personalInfo.leetcode} className="text-[13px] font-bold text-gray-700 hover:text-indigo-600">LeetCode</a>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          <section>
            <SectionHeader title="Skills" />
            <ul className="flex flex-col gap-1.5 list-disc ml-4">
              {skills?.map((skill, idx) => (
                <li key={idx} className="text-[13px] font-medium text-gray-700">
                  {skill.includes(':') ? skill.split(':')[1].trim() : skill}
                </li>
              ))}
            </ul>
          </section>

          {/* Certificates */}
          <section>
            <SectionHeader title="Certificate" showLinks />
            <ul className="flex flex-col gap-1.5 list-disc ml-4">
              {certificates?.map((cert, idx) => (
                <li key={idx} className="text-[13px] font-medium text-gray-700">
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          <section>
            <SectionHeader title="Languages" />
            <ul className="flex flex-col gap-1.5 list-disc ml-4">
              {languages?.map((lang, idx) => (
                <li key={idx} className="text-[13px] font-medium text-gray-700 uppercase">
                  {lang}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* ── Right Content (67%) ── */}
        <main className="flex-1 flex flex-col gap-0 relative">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-[13.5px] top-[20px] bottom-10 w-[1px] bg-gray-300" />

          {/* Hackathons & Team Projects */}
          {hackathons && hackathons.length > 0 && (
            <section className="mb-6 relative pl-10 text-left">
              <div className="absolute left-0 top-0 w-7 h-7 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center z-10 overflow-hidden p-1.5">
                <Code className="w-full h-full text-indigo-600" />
              </div>
              <h2 className="text-[16px] font-black uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-4">
                Hackathon & Team Projects
              </h2>
              <div className="flex flex-col gap-6">
                {hackathons.map((hack, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-black text-gray-900">{hack.title}:</h3>
                      <div className="flex gap-2 text-[12px] font-bold text-gray-500 underline underline-offset-2 cursor-pointer">
                        {hack.deploy && <a href={hack.deploy}>Demo</a>}
                        {hack.video && <a href={hack.video}>Video</a>}
                        {hack.github && <a href={hack.github}>GitHub</a>}
                      </div>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray-700 font-medium">
                      {hack.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-6 relative pl-10 text-left">
              <div className="absolute left-0 top-0 w-7 h-7 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center z-10 overflow-hidden p-1.5">
                <Briefcase className="w-full h-full text-blue-600" />
              </div>
              <h2 className="text-[16px] font-black uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-4">
                Projects
              </h2>
              <div className="flex flex-col gap-8">
                {projects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5">{proj.title}</h3>
                      <div className="flex gap-2 text-[12px] font-bold text-gray-500 underline underline-offset-2 cursor-pointer">
                        {proj.deploy && <a href={proj.deploy}>Demo</a>}
                        {proj.github && <a href={proj.github}>GitHub</a>}
                        <span className="no-underline text-gray-400">Documentations</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[13px] font-bold text-gray-800">
                        Role : {proj.role || 'UI/UX Designer & Backend Developer'}
                      </p>
                      <ul className="flex flex-col gap-1 list-disc ml-4">
                         <li className="text-[13px] text-gray-700 font-medium leading-relaxed">
                            {proj.description?.split('\n')[0] || proj.description}
                         </li>
                         {proj.description?.split('\n').slice(1).map((line, i) => (
                           <li key={i} className="text-[13px] text-gray-700 font-medium leading-relaxed">
                              {line.replace(/^- /, '')}
                           </li>
                         ))}
                      </ul>
                      <p className="text-[13px] font-bold text-gray-800 mt-1">
                        Tech Stack: {proj.techStack || 'React, Node.js, Express, MongoDB'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* UI/UX Design */}
          {uiux && uiux.length > 0 && (
            <section className="relative pl-10 text-left">
              <div className="absolute left-0 top-0 w-7 h-7 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center z-10 overflow-hidden p-1.5">
                <Palette className="w-full h-full text-purple-600" />
              </div>
              <h2 className="text-[16px] font-black uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-4">
                UI/UX Design
              </h2>
              <div className="flex flex-col gap-5">
                {uiux.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-black text-gray-900 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed">
                      {item.description}
                    </p>
                    {item.link && (
                      <a href={item.link} className="text-[13px] font-bold text-gray-800 underline underline-offset-2 flex items-center gap-1">
                        View Design
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default ModernTimelineTemplate;
