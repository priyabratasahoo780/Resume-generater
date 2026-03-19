import React from 'react';
import { FileText, Download, Loader2, Eye, EyeOff } from 'lucide-react';

const Header = ({ handlePrint, isDownloading, selectedTemplate, setSelectedTemplate, isEditorHidden, setIsEditorHidden }) => {
  const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'professional-serif', name: 'Pro Serif' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400 hidden xs:block">
          ProResume
        </h1>
      </div>
      
      <div className="flex-1 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-1 px-2">
        <div className="flex items-center bg-slate-100/80 backdrop-blur-sm rounded-xl p-1 shadow-inner border border-slate-200/50 min-w-max">
          {templates.map((template) => (
            <button 
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 uppercase tracking-widest whitespace-nowrap ${
                selectedTemplate === template.id 
                  ? 'bg-white shadow-md text-indigo-700 ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button 
          onClick={() => setIsEditorHidden(!isEditorHidden)}
          className={`items-center gap-2 px-3 py-2 rounded-md font-medium transition-all shadow-sm hidden lg:flex ${isEditorHidden ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
        >
          {isEditorHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="text-sm">{isEditorHidden ? 'Show Editor' : 'Preview Mode'}</span>
        </button>
        <button 
          onClick={handlePrint}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium transition-colors shadow-sm"
        >
          {isDownloading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Download className="w-4 h-4" />
          }
          <span className="hidden sm:inline text-sm">
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
