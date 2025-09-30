import React from 'react';

interface RoundedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ 
  children, 
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-[118px] 
        h-[48px] 
        rounded-[16px] 
        flex 
        items-center 
        justify-center 
        gap-[10px] 
        pt-3 
        pr-5 
        pb-3 
        pl-5
        bg-blue-500
        text-white
        border-none
        cursor-pointer
        transition-all
        duration-200
        hover:opacity-90
        ${className}
      `}
      style={{
        opacity: 1,
      }}
    >
      {children}
    </button>
  );
};

export default RoundedButton;