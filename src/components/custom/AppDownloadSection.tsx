import React from 'react';

const AppDownloadSection = () => {
  return (
    <div className="relative w-full h-[530px] bg-white overflow-hidden">
      {/* Background blur elements */}
      <div 
        className="absolute top-[52.5px] left-[105px] w-[480px] h-[646.996px] rounded-full opacity-50"
        style={{ background: '#2AA0DC', filter: 'blur(300px)' }}
      ></div>
      
      <div 
        className="absolute top-[457.5px] left-[391px] w-[169.258px] h-[158.996px] rounded-full opacity-50"
        style={{ background: '#EFAA5B', filter: 'blur(200px)' }}
      ></div>
      
      {/* Decorative ellipse border */}
      <div 
        className="absolute top-[193.5px] left-[105px] w-[480px] h-[480px] rounded-full border-4 border-[#2AA0DC]"
      ></div>
      
      {/* Main visual image */}
      <div className="absolute top-[52.5px] left-[105px] z-10">
        <img 
          src="/75c587161b6c0284b41b9760d01abd058049529f.jpg" 
          alt="Main visual" 
          className="w-[480px] h-auto object-cover"
        />
      </div>
      
      {/* Decorative gray dots images in a grid pattern */}
      <div className="absolute top-[265.5px] left-[138px] w-[432.819px] h-[398.646px] border border-[#2AA0DC] z-10">
        <img 
          src="/92b0f245d3361d26ef979582019c89169ecdba20.png" 
          alt="Decorative dots" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute top-[472.01px] left-[361.59px] w-[209.225px] h-[192.138px] border border-[#2AA0DC] z-10">
        <img 
          src="/92b0f245d3361d26ef979582019c89169ecdba20.png" 
          alt="Decorative dots" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute top-[472.01px] left-[138px] w-[209.225px] h-[192.138px] border border-[#2AA0DC] z-10">
        <img 
          src="/92b0f245d3361d26ef979582019c89169ecdba20.png" 
          alt="Decorative dots" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute top-[265.5px] left-[361.59px] w-[209.225px] h-[192.138px] border border-[#2AA0DC] z-10">
        <img 
          src="/92b0f245d3361d26ef979582019c89169ecdba20.png" 
          alt="Decorative dots" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute top-[265.5px] left-[138px] w-[209.225px] h-[192.138px] border border-[#2AA0DC] z-10">
        <img 
          src="/92b0f245d3361d26ef979582019c89169ecdba20.png" 
          alt="Decorative dots" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text content and app download buttons */}
      <div className="absolute top-[131.5px] left-[738px] w-[614px] h-[323px] flex flex-col gap-[40px] pr-[24px] pl-[24px]">
        <div className="flex flex-col gap-[15px]">
          <h2 
            className="font-roboto font-bold text-[40px] leading-[150%] text-right"
            style={{ color: '#211C4D' }}
          >
            قم بتحميل تطبيقنا واحصل علي خصم 10% وتسوق افضل
          </h2>
          
          <p className="font-roboto font-medium text-[24px] leading-[200%] text-right">
            «اطلب ما تريد في أي وقت ومن أي مكان، واستلمه في أسرع وقت»
          </p>
        </div>
        
        {/* App Store Buttons */}
        <div className="flex gap-[40px]">
          <div className="w-[180px] h-[52px] cursor-pointer">
            <img 
              src="/appstore.png" 
              alt="Download on the App Store" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="w-[179.753px] h-[52px] border border-[#191B1C] rounded cursor-pointer">
            <img 
              src="/googleplay.png" 
              alt="Get it on Google Play" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;