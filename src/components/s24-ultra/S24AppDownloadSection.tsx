import background from '../../assets/images/background.png'
import bolitse from '../../assets/images/politssection.png'
import expotuer from '../../assets/images/expotuer.png'
import appstore from '../../assets/images/appstore.png'
import googleplay from '../../assets/images/googleplay.png'
// import './s24-responsive.css'; // Import S24 Ultra specific styles (now imported globally)

const S24AppDownloadSection = () => {
  return (
    <div className="relative w-full h-[530px] s24-app-section overflow-hidden mt-6">
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
            <div className="w-[179.753px] h-[52px]  rounded cursor-pointer">
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
  );
};

export default S24AppDownloadSection;