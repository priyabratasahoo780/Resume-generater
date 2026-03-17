import React from 'react';
import { 
  Phone, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  MonitorSmartphone, 
  User, 
  Award, 
  Trophy, 
  ExternalLink,
  BookOpen,
  Languages,
  Heart,
  Zap,
  Star
} from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { 
    personalInfo, 
    aboutMe, 
    skills, 
    projects, 
    experience,
    education, 
    certificates, 
    achievements,
    languages = ['English (Fluent)', 'Hindi (Native)'],
    interests = ['Open Source', 'UI/UX Design', 'AI Research', 'Photography']
  } = data;

  return (
    <div className="w-full min-h-full bg-white text-slate-800 font-sans flex drop-shadow-2xl overflow-hidden border border-slate-200">
      
      {/* Left Sidebar */}
      <div className="w-[35%] bg-indigo-900 text-indigo-50 p-5 flex flex-col gap-5 h-full relative overflow-hidden">
        
        {/* Advanced Decorative Background Shapes */}
        <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[20%] right-[-15%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-20%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap gap-4 p-4">
           {Array.from({ length: 20 }).map((_, i) => (
             <div key={i} className="w-8 h-8 border border-white rotate-45" />
           ))}
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center gap-3 py-4 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-3xl blur-xl opacity-50 scale-110 animate-pulse" />
            <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-indigo-800/80 relative z-10 transform -rotate-3 hover:rotate-0 transition-all duration-500">
              <User className="w-14 h-14 text-white drop-shadow-md" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
              {personalInfo?.name || 'Your Name'}
            </h1>
            <div className="h-1 w-12 bg-indigo-400 mx-auto rounded-full mb-1"></div>
            <h2 className="text-sm font-black text-indigo-200 tracking-[0.3em] uppercase opacity-90">
              {personalInfo?.title || 'Your Job Title'}
            </h2>
          </div>
        </div>

        {/* Contact info grid-like panel */}
        <div className="flex flex-col gap-5 text-xs mt-2 bg-indigo-950/60 p-6 rounded-3xl border border-indigo-700/30 backdrop-blur-md relative z-10 shadow-inner">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 mb-1 flex items-center gap-2">
             <div className="w-1 h-3 bg-indigo-500 rounded-full" />
             Contact Channels
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {personalInfo?.phone && (
              <div className="flex items-center gap-4 group cursor-default">
                <div className="p-2 bg-indigo-800/50 rounded-xl text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-bold tracking-wide">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo?.email && (
              <div className="flex items-center gap-4 group cursor-default">
                <div className="p-2 bg-indigo-800/50 rounded-xl text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all font-bold tracking-wide">{personalInfo.email}</span>
              </div>
            )}

            {personalInfo?.portfolio && (
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-indigo-800/50 rounded-xl text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-bold tracking-wide border-b border-indigo-700/50 hover:border-white">
                  {personalInfo.portfolio.replace(/https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            
            {personalInfo?.github && (
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-indigo-800/50 rounded-xl text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                  <Github className="w-4 h-4" />
                </div>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-bold tracking-wide border-b border-indigo-700/50 hover:border-white">
                  {personalInfo.github.replace(/https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section - Refined with progress-like dots for density */}
        {skills && skills.length > 0 && (
          <div className="flex flex-col gap-5 mt-4 relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 border-b border-indigo-800/50 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Core Expertise
            </h3>
            <div className="flex flex-col gap-4">
              {skills.map((skillGroup, index) => {
                const parts = skillGroup.includes(':') ? skillGroup.split(':') : [null, skillGroup];
                const category = parts[0];
                const skillList = parts.slice(1).join(':').trim();
                
                return (
                  <div key={index} className="flex flex-col gap-2">
                    {category && (
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300 ml-1">{category}</h4>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {skillList.split(',').map((skill, sIdx) => (
                        <div key={sIdx} className="px-3 py-1 bg-indigo-800/40 text-indigo-100 rounded-lg text-[9px] font-black border border-indigo-700/50 hover:bg-indigo-600 transition-all shadow-sm flex items-center gap-1.5 capitalize">
                          <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                          {skill.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Languages & Interests Grid - NEW SECTIONS TO FILL SPACE */}
        <div className="grid grid-cols-1 gap-8 mt-4 relative z-10">
          {/* Languages */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 border-b border-indigo-800/50 pb-3 flex items-center gap-2">
              <Languages className="w-4 h-4" /> Languages
            </h3>
            <div className="flex flex-col gap-3 ml-1">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className="text-[11px] font-bold text-indigo-100/90">{lang.split(' ')[0]}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(dot => (
                      <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (i === 0 ? 5 : 4) ? 'bg-indigo-400' : 'bg-indigo-800'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 border-b border-indigo-800/50 pb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Interests
            </h3>
            <div className="flex flex-wrap gap-2 ml-1">
              {interests.map((interest, i) => (
                <span key={i} className="text-[11px] font-bold text-indigo-200/80 italic flex items-center gap-1.5">
                   <Star className="w-2.5 h-2.5 fill-indigo-500 text-indigo-500" /> {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Graphic at Bottom Sidebar */}
        <div className="mt-auto pt-6 pb-4 relative z-10 flex justify-center">
           <div className="w-full h-24 border-2 border-dashed border-indigo-700/30 rounded-3xl flex flex-col items-center justify-center gap-2 opacity-60">
              <Zap className="w-6 h-6 text-indigo-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Innovation Driven</span>
           </div>
        </div>

      </div>

      {/* Right Content */}
      <div className="w-[65%] p-6 flex flex-col gap-6 h-full bg-white relative overflow-y-auto">
        
        {/* Subtle grid pattern background for the right side */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[radial-gradient(#4f46e5_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        {/* Floating gradient accents on the right */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-20 left-0 w-48 h-48 bg-purple-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Profile/About Section */}
        {aboutMe && (
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900 text-white rounded-2xl shadow-lg ring-4 ring-indigo-50">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-indigo-950">
                Professional Bio
              </h3>
            </div>
            <div className="pl-10 space-y-4">
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-900 to-purple-600 rounded-full" />
              <p className="text-[14px] leading-relaxed text-slate-600 text-justify font-medium">
                {aboutMe}
              </p>
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {experience && experience.length > 0 && (
          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900 text-white rounded-2xl shadow-lg ring-4 ring-indigo-50">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-indigo-950">
                Work Experience
              </h3>
            </div>
            <div className="flex flex-col gap-6 ml-6">
              {experience.map((exp, index) => (
                <div key={index} className="flex flex-col gap-4 relative pl-10 border-l-4 border-slate-50 group hover:border-indigo-100 transition-all">
                  <div className="absolute w-6 h-6 bg-white border-4 border-indigo-600 rounded-2xl -left-[14px] top-1 group-hover:rotate-12 group-hover:bg-indigo-600 transition-all shadow-md"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-black text-slate-900 text-xl group-hover:text-indigo-700 transition-colors">
                        {exp.title}
                      </h4>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{exp.duration || '2024-Present'}</span>
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed text-slate-600 text-justify font-medium bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900 text-white rounded-2xl shadow-lg ring-4 ring-indigo-50">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-indigo-950">
                Top Contributions
              </h3>
            </div>
            <div className="flex flex-col gap-6 ml-6">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col gap-4 relative pl-10 border-l-4 border-slate-50 group hover:border-indigo-100 transition-all">
                  <div className="absolute w-6 h-6 bg-white border-4 border-indigo-600 rounded-2xl -left-[14px] top-1 group-hover:rotate-12 group-hover:bg-indigo-600 transition-all shadow-md"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-black text-slate-900 text-xl group-hover:text-indigo-700 transition-colors">
                        {project.title}
                      </h4>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Full-cycle Development</span>
                    </div>
                    <div className="flex gap-4 text-[11px] font-black uppercase tracking-tight">
                      {project.github && (
                        <a href={project.github} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-slate-200">
                          <Github className="w-3.5 h-3.5"/> Source
                        </a>
                      )}
                      {project.deploy && (
                        <a href={project.deploy} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-indigo-100">
                          <MonitorSmartphone className="w-3.5 h-3.5"/> Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed text-slate-600 text-justify font-medium bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="flex flex-col gap-8 relative z-10">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900 text-white rounded-2xl shadow-lg ring-4 ring-indigo-50">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-indigo-950">
                Educational Path
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-8 ml-6">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-5 relative pl-10 border-l-4 border-slate-50 group bg-slate-50/30 p-6 rounded-3xl border-r-8 border-r-indigo-50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all">
                   <div className="absolute w-6 h-6 bg-white border-4 border-indigo-600 rounded-full -left-[14px] top-6 group-hover:bg-indigo-600 transition-all shadow-md"></div>
                   
                  <div className="flex justify-between items-center w-full">
                    <h4 className="font-black text-slate-900 text-lg">{edu.degree}</h4>
                    <span className="text-[11px] font-black text-white bg-indigo-900 px-4 py-1.5 rounded-2xl uppercase tracking-tighter shadow-lg shadow-indigo-100 border border-indigo-800">
                      {edu.duration}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-base font-black text-indigo-950 flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      {edu.institution}
                    </div>
                    {edu.score && (
                      <div className="flex items-center gap-3">
                         <div className="text-[12px] font-black text-indigo-700 bg-indigo-50/80 px-4 py-1.5 rounded-xl border border-indigo-200/50 shadow-sm">
                          Grade: <span className="text-indigo-900">{edu.score}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div className="flex flex-col gap-8 relative z-10 pb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-900 text-white rounded-2xl shadow-lg ring-4 ring-indigo-50">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-indigo-950">
                Key Accomplishments
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6 ml-10">
              {achievements.map((ach, index) => (
                <div key={index} className="flex gap-6 items-start bg-gradient-to-r from-slate-50 to-white p-6 rounded-3xl border-l-[6px] border-l-indigo-600 shadow-sm group hover:shadow-xl transition-all">
                  <div className="p-3 bg-white rounded-2xl shadow-md text-indigo-600 ring-4 ring-indigo-50 group-hover:scale-110 group-hover:rotate-12 transition-all">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                     <p className="text-[15px] leading-relaxed text-slate-800 font-black tracking-tight">{ach}</p>
                     <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Verified Milestone</p>
                  </div>
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
