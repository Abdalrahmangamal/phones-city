// components/home/InstallmentSection.tsx
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next' // ⬅️ أضف هذا
import { useInstallmentStore } from '../../store/home/installmentStore'
import coara from '../../assets/images/coara.png'
import mora from '../../assets/images/mora.png'

export default function InstallmentSection() {
  const { 
    installmentData, 
    loading, 
    error, 
    fetchInstallmentData 
  } = useInstallmentStore()
  
  // ⬇️ استخدم useTranslation مثل AppDownloadSection تماماً
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'ar' // ⬅️ هذه هي اللغة الحالية من i18n
  
  useEffect(() => {
    fetchInstallmentData();
  }, [fetchInstallmentData]);

  // ⬇️ دالة بسيطة للحصول على النص حسب اللغة
  const getOfferText = () => {
    if (!installmentData) {
      // ⬇️ استخدم currentLang من i18n
      return currentLang === 'ar' ? "عرض خاص!" : "Special Offer!";
    }
    
    // ⬇️ استخدم النص المناسب للغة
    return currentLang === 'ar' 
      ? installmentData.offer_text_ar || installmentData.offer_text
      : installmentData.offer_text_en || installmentData.offer_text;
  };

  // ⬇️ راقب تغيير اللغة
  useEffect(() => {
    console.log('🌍 InstallmentSection - Language:', currentLang);
  }, [currentLang]);

  // Loading state - يستخدم اللغة الحالية
  if (loading) {
    return (
      <div className='xl:px-[90px] px-2 pt-0 md:pt-0 my-8'>
        <div className='md:h-[300px] h-[150px] w-full bg-gray-100 rounded-[16px] px-5 flex items-center justify-center'>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {currentLang === 'ar' ? 'جاري تحميل العروض...' : 'Loading offers...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state - يستخدم اللغة الحالية
  if (error) {
    return (
      <div className='xl:px-[90px] px-2 pt-0 md:pt-0 my-8'>
        <div className='md:h-[300px] h-[150px] w-full bg-red-50 border border-red-200 rounded-[16px] px-5 flex items-center justify-center'>
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-2">
              {currentLang === 'ar' ? '⚠️ حدث خطأ' : '⚠️ Error'}
            </p>
            <p className="text-gray-700 text-sm">{error}</p>
            <button 
              onClick={fetchInstallmentData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentLang === 'ar' ? 'حاول مرة أخرى' : 'Try again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isRTL = currentLang === 'ar';

  return (
    <div className='xl:px-[90px] px-2 pt-0 md:pt-0 my-8'>
      <div className='md:h-[300px] h-[150px] w-full bg-[#4058A61A] md:pt-[5px] pt-[10px] rounded-[16px] px-5'>
        {/* العنوان - يظهر باللغة الحالية من i18n */}
        <p className={`
          md:text-[38px] lg:text-[42px] mt-3 text-[11px] md:text-[16px] 
          font-[500] text-[#211C4D] text-center 
          ${isRTL ? 'md:text-right' : 'md:text-left'}
          leading-relaxed
        `}>
          {getOfferText()}
        </p>
        
        <div className='flex items-center mt-[20px] justify-between md:px-[30px]'>
          <Link to={installmentData?.coara_link || "/about-quara"}>
            <img 
              className='w-[120px] md:w-full max-w-[200px] hover:scale-105 transition-transform' 
              src={coara} 
              alt={isRTL ? "شعار كوارا" : "Coara Logo"} 
            />
          </Link>
          
          <Link to={installmentData?.mora_link || "/about-mora"}>
            <img 
              src={mora} 
              className='w-[120px] md:w-full max-w-[200px] hover:scale-105 transition-transform' 
              alt={isRTL ? "شعار مورا" : "Mora Logo"} 
            />
          </Link>
        </div>
      </div>
    </div>
  )
}