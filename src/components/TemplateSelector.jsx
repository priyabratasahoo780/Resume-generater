import React from 'react';
import { CheckCircle, Layout } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate, onConfirm }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and clean single-column layout.',
      preview: (
        <div className="w-full h-full bg-white border border-slate-200 rounded-sm flex flex-col gap-1 p-1.5 overflow-hidden">
          <div className="w-full h-2 bg-slate-800 rounded-sm" />
          <div className="w-3/4 h-1 bg-slate-400 rounded-sm" />
          <div className="mt-1 w-full h-px bg-slate-300" />
          <div className="w-full h-1 bg-slate-200 rounded-sm mt-0.5" />
          <div className="w-5/6 h-1 bg-slate-200 rounded-sm" />
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Bold sidebar with colored highlights.',
      preview: (
        <div className="w-full h-full rounded-sm flex overflow-hidden border border-slate-200">
          <div className="w-2/5 bg-indigo-800 flex flex-col gap-1 p-1">
            <div className="w-full h-1.5 bg-white/80 rounded-sm" />
            <div className="w-3/4 h-1 bg-indigo-400 rounded-sm" />
          </div>
          <div className="w-3/5 bg-white flex flex-col gap-1 p-1">
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-3/4 h-1 bg-slate-200 rounded-sm" />
          </div>
        </div>
      )
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Structured layout for corporate standards.',
      preview: (
        <div className="w-full h-full rounded-sm flex flex-col overflow-hidden border border-slate-200 bg-white">
          <div className="w-full h-4 bg-slate-900 flex flex-col gap-0.5 p-1">
            <div className="w-2/3 h-1 bg-white/60 rounded-sm" />
          </div>
          <div className="flex-1 flex flex-col gap-1 p-1">
            <div className="w-full h-0.5 bg-indigo-100 rounded-sm" />
            <div className="w-full h-1 bg-slate-100 rounded-sm" />
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Elegant 2-column layout with social profiles.',
      preview: (
        <div className="w-full h-full rounded-sm flex overflow-hidden border border-slate-200 bg-white">
          <div className="w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col gap-1 p-1">
            <div className="w-full h-2 bg-slate-200 rounded-full" />
            <div className="w-full h-1 bg-slate-100 rounded-sm" />
          </div>
          <div className="w-2/3 flex flex-col gap-1 p-1">
            <div className="w-3/4 h-1.5 bg-slate-800 rounded-sm" />
            <div className="w-full h-1 bg-slate-200 rounded-sm mt-1" />
          </div>
        </div>
      )
    },
    {
      id: 'timeline',
      name: 'Timeline',
      description: 'Modern 2-column layout with vertical timeline.',
      preview: (
        <div className="w-full h-full rounded-sm flex overflow-hidden border border-slate-200 bg-white">
          <div className="w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col items-center gap-1 p-1">
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
          </div>
          <div className="w-2/3 flex flex-col gap-1 p-1 items-start">
            <div className="w-full h-1.5 bg-slate-800 rounded-sm" />
            <div className="w-0.5 h-full bg-slate-200 ml-1 rounded-full relative">
               <div className="absolute top-2 -left-1 w-2 h-2 bg-indigo-500 rounded-full" />
               <div className="absolute top-6 -left-1 w-2 h-2 bg-indigo-500 rounded-full" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated serif design with green accents.',
      preview: (
        <div className="w-full h-full rounded-sm flex overflow-hidden border border-slate-200 bg-white">
          <div className="w-full flex flex-col gap-1 p-1.5">
            <div className="w-full h-2 bg-slate-900 rounded-sm" />
            <div className="w-full h-px bg-[#2D4A22] mt-0.5" />
            <div className="flex gap-2 mt-1">
               <div className="w-1/2 flex flex-col gap-1">
                  <div className="w-full h-1 bg-[#2D4A22]/20 rounded-full" />
                  <div className="w-full h-1.5 bg-slate-100 rounded-sm" />
               </div>
               <div className="w-1/2 bg-slate-50 p-1 border-l-2 border-[#2D4A22] rounded-sm">
                  <div className="w-full h-1 bg-slate-300 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4">
            <Layout className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Choose Your Template</h1>
          <p className="text-slate-400 text-lg">Select a starting point for your professional journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`relative group flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.15)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="w-24 h-32 bg-slate-800 rounded-xl p-2 transition-transform duration-300 group-hover:scale-110">
                {template.preview}
              </div>
              <div className="text-center">
                <h3 className={`font-bold transition-colors ${selectedTemplate === template.id ? 'text-indigo-400' : 'text-white'}`}>
                  {template.name}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  {template.description}
                </p>
              </div>
              
              {selectedTemplate === template.id && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg border-4 border-[#0a0f1d]">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={onConfirm}
            disabled={!selectedTemplate}
            className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 text-lg"
          >
            Start Building Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
