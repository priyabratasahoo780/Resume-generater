import React, { forwardRef } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

const PreviewPanel = forwardRef(({ resumeData, selectedTemplate }, ref) => {
  return (
    <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-xl rounded-sm flex-shrink-0 origin-top transform scale-[0.45] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-100 transition-transform duration-300 print:scale-100 print:shadow-none" ref={ref}>
      {selectedTemplate === 'classic' ? (
        <ClassicTemplate data={resumeData} />
      ) : selectedTemplate === 'modern' ? (
        <ModernTemplate data={resumeData} />
      ) : (
        <ProfessionalTemplate data={resumeData} />
      )}
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
