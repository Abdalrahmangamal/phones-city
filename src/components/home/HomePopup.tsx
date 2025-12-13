import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface HomePopupProps {
  onClose: () => void;
}

const HomePopup: React.FC<HomePopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Call onClose after animation completes
    setTimeout(onClose, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ 
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
    >
      <div 
        className="relative bg-white rounded-lg shadow-lg transition-transform duration-300 transform"
        style={{
          width: "788px",
          height: "594px",
          borderRadius: "16px",
          background: "#FFFFFFF5",
          top: "215px",
          left: "326px",
          animation: "fadeInScale 0.3s ease-out"
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute rounded-md flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            borderWidth: "1px",
            padding: "8px",
            top: "38px",
            left: "28px",
            backgroundColor: "#29293A12",
            border: "1px solid #E2E8F0"
          }}
          aria-label="إغلاق"
        >
          <X 
            className="text-gray-500" 
            style={{
              width: "10px",
              height: "10px",
              borderWidth: "2px"
            }}
          />
        </button>

        {/* Title */}
        <div 
          className="absolute text-right font-bold"
          style={{
            width: "231px",
            height: "26px",
            top: "40px",
            left: "516px",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "26px",
            color: "#211C4D"
          }}
        >
          عرض جديد
        </div>

        {/* Image/Content Area */}
        <div 
          className="absolute"
          style={{
            width: "747.63px",
            height: "392.20px",
            top: "138.94px",
            left: "20px",
            background: "linear-gradient(179.7deg, rgba(33, 28, 77, 0) 57.98%, rgba(33, 28, 77, 0.5) 99.74%)",
            borderRadius: "8px"
          }}
        >
          {/* Placeholder for image/content */}
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src="https://via.placeholder.com/747x392/211C4D/FFFFFF?text=New+Offer+Image" 
              alt="عرض جديد" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePopup;