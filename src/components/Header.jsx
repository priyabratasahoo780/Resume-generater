import React from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';

const Header = ({ handlePrint, isDownloading, selectedTemplate, setSelectedTemplate }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
          ProResume
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-slate-100 rounded-lg p-1 mr-2">
          <button 
            onClick={() => setSelectedTemplate('classic')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedTemplate === 'classic' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Classic
          </button>
          <button 
            onClick={() => setSelectedTemplate('modern')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedTemplate === 'modern' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Modern
          </button>
          <button 
            onClick={() => setSelectedTemplate('professional')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedTemplate === 'professional' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Professional
          </button>
        </div>
        <button 
          onClick={handlePrint}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium transition-colors shadow-sm"
        >
          {isDownloading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Download className="w-4 h-4" />
          }
          <span className="hidden sm:inline">
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
