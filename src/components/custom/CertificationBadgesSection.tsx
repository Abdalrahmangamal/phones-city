import React, { useState } from 'react';

const CertificationBadgesSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="w-full max-w-[1280px] h-[282px] flex flex-row items-center gap-[80px] mx-auto">
      {/* Left Section */}
      <div className="flex flex-col w-[504px] gap-[24px]">
        <div className="relative">
          <div className="absolute -top-2 -right-4 z-0">
            <img src="/Layer_1.svg" alt="" className="opacity-100" />
          </div>
          <h2 
            className="font-roboto font-semibold text-[40px] leading-[36px] text-[#211C4D] relative z-10 text-center"
            style={{ fontFamily: 'Roboto' }}
          >
            شهاده توثيق معروف
          </h2>
        </div>
        
        {/* Image below the title */}
        <div className="flex justify-center">
          <img 
            src="/4ba8876e3b460700ce9e4cefe22262966e014980.png" 
            alt="Product" 
            className="cursor-pointer"
            onClick={() => openModal('/Frame_1321317073.svg')}
          />
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex flex-col w-[708px] gap-[24px]">
        <div className="relative">
          <div className="absolute -top-2 -right-4 z-0">
            <img src="/Layer_1.svg" alt="" className="opacity-100" />
          </div>
          <h2 
            className="font-roboto font-semibold text-[40px] leading-[36px] text-[#211C4D] relative z-10 text-center"
            style={{ fontFamily: 'Roboto' }}
          >
            شهاده توثيق
          </h2>
        </div>
        
        {/* Image below the title */}
        <div className="flex justify-center">
          <img 
            src="/2cc69f9d527f16247d632f5d5ed259bf6d997a43.png" 
            alt="Product" 
            className="cursor-pointer"
            onClick={() => openModal('/Frame_13213170732.svg')}
          />
        </div>
      </div>
      
      {/* Modal for enlarged image */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="relative rounded-[16px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <img 
              src={modalImage} 
              alt="Enlarged view" 
              className="max-w-[1234px] max-h-[861px] w-auto h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationBadgesSection; // Exported correctly