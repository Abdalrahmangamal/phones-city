import React from "react";
import logo from "../../assets/images/logo.png"; // حط مسار اللوجو هنا
import "../../style.css"
const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0e0d20]">
      <div className="relative flex items-center justify-center">
        {/* ضوء بيلف حوالين اللوجو */}
        <div className="absolute w-[220px] h-[220px] rounded-full border-[3px] border-transparent animate-rotate-glow 
          before:content-[''] before:absolute before:inset-0 before:rounded-full 
          before:border-[3px] before:border-t-[#F3AC5D] before:border-l-transparent before:border-r-transparent before:border-b-transparent
          before:animate-rotate-glow">
        </div>

        {/* إضاءة خلفية */}
        <div className="absolute w-[180px] h-[180px] bg-[#F3AC5D] opacity-10 blur-[40px] animate-pulse-slow"></div>

        {/* اللوجو */}
        <img
          src={logo}
          alt="Phones City"
          className="relative z-10 w-[140px] h-[140px] animate-logo-glow"
        />
      </div>
    </div>
  );
};

export default Loader;
