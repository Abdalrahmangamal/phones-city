import background from '../../assets/images/background.png'
import bolitse from '../../assets/images/politssection.png'
import expotuer from '../../assets/images/expotuer.png'
import appstore from '../../assets/images/appstore.png'
import googleplay from '../../assets/images/googleplay.png'
import useS24Ultra from '@/hooks/useS24Ultra';
import S24AppDownloadSection from '@/components/s24-ultra/S24AppDownloadSection';

const AppDownloadSection = () => {
  const isS24Ultra = useS24Ultra();
  
  // If device is S24 Ultra, render the S24 Ultra specific component
  if (isS24Ultra) {
    console.log("Rendering S24 Ultra version");
    return <S24AppDownloadSection />;
  }

  console.log("Rendering regular version");
  return (
    <div className="w-full">
      {/* Desktop version - hidden on mobile */}
      <div className="relative w-full h-[530px] hidden md:block overflow-hidden mt-6">
        {/* Background blur elements */}
        <div 
          className="absolute top-[52.5px] left-[105px]  w-[480px] h-[646.996px] rounded-full opacity-50"
        ></div>
        
        <div 
          className="absolute top-[457.5px] left-[391px] w-[169.258px] h-[158.996px] rounded-full opacity-50"
          style={{ background: '#EFAA5B', filter: 'blur(200px)' }}
        ></div>
        
        {/* Decorative ellipse border */}
        <div 
          className="absolute top-[141.5px] left-[138px] w-[480px] h-[480px] rounded-full border-4 border-[#2AA0DC]"
        ></div>
        
        {/* Main visual image */}
        <div className="absolute top-[58.5px] left-[205px] z-10">
          <img 
            src={background} 
            alt="Main visual" 
            className="w-[349px] h-auto object-cover"
          />
        </div>
        <div className="absolute top-[58.5px] left-[205px] z-10">
          <img 
            src={expotuer} 
            alt="Main visual" 
            className="w-[349px] h-auto object-cover"
          />
        </div>
      
        {/* Decorative gray dots images in a grid pattern */}
        <div className='absolute bottom-[0px] left-[135px] z-9'>
          <img src={bolitse} className='h-[300px]' alt="" />
        </div>
      
        {/* Text content and app download buttons */}
        <div className="absolute top-[80.5px] right-[100px] w-[614px] h-[323px] flex flex-col gap-[40px] pr-[24px] pl-[24px]">
          <div className="flex flex-col gap-[15px]">
            <h2 
              className="font-roboto font-bold text-[40px] text-[#211C4D] leading-[150%] text-right"
              
            >
              قم بتحميل تطبيقنا واحصل علي خصم 10% وتسوق افضل
            </h2>
            
            <p className="font-roboto font-medium text-[24px] leading-[200%] text-right">
              «اطلب ما تريد في أي وقت ومن أي مكان، واستلمه في أسرع وقت»
            </p>
          </div>
          
          {/* App Store Buttons */}
          <div className="flex gap-[40px]">
            <div className="w-[179.753px] h-[52px] rounded cursor-pointer">
              <img 
                src={googleplay}
                alt="Get it on Google Play" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-[180px] h-[52px] cursor-pointer">
              <img 
                src={appstore} 
                alt="Download on the App Store" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version - Always visible on mobile devices */}
      <div className="w-full md:hidden bg-white py-8 px-4 mt-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-roboto font-bold text-2xl text-[#211C4D] mb-3">
            قم بتحميل تطبيقنا واحصل علي خصم 10% وتسوق افضل
          </h2>
          
          <p className="font-roboto font-medium text-lg text-[#211C4D] mb-6">
            «اطلب ما تريد في أي وقت ومن أي مكان، واستلمه في أسرع وقت»
          </p>
          
          {/* App Store Buttons */}
          <div className="flex gap-4 mb-6">
            <div className="w-32 h-12 cursor-pointer">
              <img 
                src={googleplay}
                alt="Get it on Google Play" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-32 h-12 cursor-pointer">
              <img 
                src={appstore} 
                alt="Download on the App Store" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Main visual image moved to the bottom */}
          <div className="mt-4">
            <img 
              src={background} 
              alt="Main visual" 
              className="w-48 h-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;