import React, { forwardRef } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ModernTimelineTemplate from './templates/ModernTimelineTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import ProfessionalSerifTemplate from './templates/ProfessionalSerifTemplate';

const PreviewPanel = forwardRef(({ resumeData, selectedTemplate, isFullWidth }, ref) => {
  return (
    <div 
      className={`w-[21cm] min-h-[29.7cm] bg-white shadow-xl rounded-sm flex-shrink-0 origin-top transform transition-transform duration-300 print:scale-100 print:shadow-none ${
        isFullWidth 
          ? 'scale-[0.85] sm:scale-[1] md:scale-[1.15] lg:scale-[1.25]' 
          : 'scale-[0.45] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-100'
      }`} 
      ref={ref}
    >
      {selectedTemplate === 'classic' ? (
        <ClassicTemplate data={resumeData} />
      ) : selectedTemplate === 'modern' ? (
        <ModernTemplate data={resumeData} />
      ) : selectedTemplate === 'professional' ? (
        <ProfessionalTemplate data={resumeData} />
      ) : selectedTemplate === 'creative' ? (
        <CreativeTemplate data={resumeData} />
      ) : selectedTemplate === 'elegant' ? (
        <ElegantTemplate data={resumeData} />
      ) : selectedTemplate === 'professional-serif' ? (
        <ProfessionalSerifTemplate data={resumeData} />
      ) : (
        <ModernTimelineTemplate data={resumeData} />
      )}
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
