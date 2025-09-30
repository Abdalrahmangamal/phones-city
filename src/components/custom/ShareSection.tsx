import React from 'react';

const ShareSection: React.FC = () => {
  return (
    <div className="w-full rounded-[16px] overflow-hidden">
      <img 
        src="/Share.svg" 
        alt="Share" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default ShareSection;