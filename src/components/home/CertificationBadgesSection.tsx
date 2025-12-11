// src/components/CertificationBadgesSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCertificateStore } from "@/store/home/certificateStore";
import { useTranslation } from "react-i18next";

const CertificationBadgesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    certificates,
    currentCertificate,
    isLoading: loading,
    loadingSingle,
    error,
    fetchCertificates,
    fetchCertificateById,
    clearCurrentCertificate,
  } = useCertificateStore();

  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  // جلب الشهادات عند أول تحميل فقط
  useEffect(() => {
    if (certificates.length === 0 && !loading && !error) {
      fetchCertificates();
    }
  }, [certificates.length, loading, error, fetchCertificates]);

  const handleOpen = useCallback(
    (certId: number) => {
      setOpenDialogId(certId);
      fetchCertificateById(certId);
    },
    [fetchCertificateById]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialogId(null);
    clearCurrentCertificate();
  }, [clearCurrentCertificate]);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.currentTarget;
      target.src = "/placeholder-certificate.png";
      target.onerror = null;
    },
    []
  );

  // حالة التحميل الأولي
  if (loading && certificates.length === 0) {
    return (
      <section className="w-full my-[30px] md:!my-20 max-w-[1280px] mx-auto px-4">
        <h2 className="font-semibold text-[22px] md:text-[32px] text-[#211C4D] text-center mb-8">
          {t("OurCertificates") || "شهاداتنا واعتماداتنا"}
        </h2>
        <div className="flex flex-col items-center justify-center h-40 gap-4 py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <span className="text-gray-600">
            {isArabic ? "جارِ تحميل الشهادات..." : "Loading certificates..."}
          </span>
        </div>
      </section>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <section className="w-full my-[30px] md:!my-20 max-w-[1280px] mx-auto px-4">
        <h2 className="font-semibold text-[22px] md:text-[32px] text-[#211C4D] text-center mb-8">
          {t("OurCertificates") || "شهاداتنا واعتماداتنا"}
        </h2>
        <div className="text-center p-8 bg-red-50 rounded-xl max-w-2xl mx-auto">
          <div className="text-red-600 font-bold text-2xl mb-3">Warning: حدث خطأ</div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => fetchCertificates()}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {isArabic ? "إعادة المحاولة" : "Retry"}
          </button>
        </div>
      </section>
    );
  }

  // لا توجد شهادات
  if (!loading && certificates.length === 0) {
    return (
      <section className="w-full my-[30px] md:!my-20 max-w-[1280px] mx-auto px-4">
        <h2 className="font-semibold text-[22px] md:text-[32px] text-[#211C4D] text-center mb-8">
          {t("OurCertificates") || "شهاداتنا واعتماداتنا"}
        </h2>
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-6">
            {isArabic ? "لا توجد شهادات متاحة حالياً" : "No certificates available at the moment"}
          </p>
          <button
            onClick={() => fetchCertificates()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isArabic ? "تحميل الشهادات" : "Load Certificates"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full my-[30px] md:!my-20 max-w-[1280px] mx-auto px-4">
      {/* العنوان المترجم */}
      <h2 className="font-semibold text-[22px] md:text-[32px] text-[#211C4D] text-center mb-8">
        {t("OurCertificates") || (isArabic ? "شهاداتنا واعتماداتنا" : "Our Certificates & Accreditations")}
      </h2>

      {/* عدد الشهادات */}
      <div className="text-center text-gray-500 text-sm mb-6">
        {isArabic
          ? `عرض ${certificates.length} شهادة`
          : `Showing ${certificates.length} ${certificates.length === 1 ? "certificate" : "certificates"}`}
      </div>

      {/* الشهادات */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12">
        {certificates.map((cert) => (
          <div key={cert.id} className="text-center group">
            <Dialog open={openDialogId === cert.id} onOpenChange={(open) => !open && handleCloseDialog()}>
              <DialogTrigger asChild>
                <button
                  onClick={() => handleOpen(cert.id)}
                  className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <div className="p-5 bg-white rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <img
                      src={cert.image}
                      alt={isArabic ? cert.name_ar : cert.name_en}
                      className="h-[100px] md:h-[130px] w-[130px] md:w-[160px] object-contain mx-auto"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                </button>
              </DialogTrigger>

              {/* Dialog - التفاصيل الكاملة */}
              <DialogContent
                className="md:max-w-[90%] lg:max-w-[70%] p-0 bg-white rounded-2xl overflow-hidden max-h-[90vh]"
                style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                onEscapeKeyDown={handleCloseDialog}
                onInteractOutside={handleCloseDialog}
              >
                <div className="sr-only">
                  <DialogTitle>{isArabic ? cert.name_ar : cert.name_en}</DialogTitle>
                  <DialogDescription></DialogDescription>
                </div>

                <div className="flex flex-col">
                  {loadingSingle && openDialogId === cert.id ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                      <span className="text-gray-600">
                        {isArabic ? "جارِ تحميل التفاصيل..." : "Loading details..."}
                      </span>
                    </div>
                  ) : currentCertificate ? (
                    <>
                      {/* الصورة الكبيرة */}
                      <div className="bg-gray-50 p-6 flex items-center justify-center">
                        <img
                          src={currentCertificate.main_image}
                          alt={isArabic ? currentCertificate.name_ar : currentCertificate.name_en}
                          className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                          onError={handleImageError}
                        />
                      </div>

                      {/* النصوص */}
                      <div className="p-8 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                          {isArabic ? currentCertificate.name_ar : currentCertificate.name_en}
                        </h3>

                        {/* عرض الاسم باللغة الثانية كمعلومة إضافية (اختياري وأنيق) */}
                        <p className="text-lg text-gray-600">
                          {isArabic ? currentCertificate.name_en : currentCertificate.name_ar}
                        </p>

                        <div className="mt-10">
                          <button
                            onClick={handleCloseDialog}
                            className="px-10 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                          >
                            {isArabic ? "إغلاق" : "Close"}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-red-500 text-xl mb-4">Warning: فشل تحميل التفاصيل</p>
                      <button
                        onClick={handleCloseDialog}
                        className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        {isArabic ? "عودة" : "Back"}
                      </button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* اسم الشهادة تحت البادج - مترجم حسب اللغة الحالية */}
            <p className="mt-4 text-sm md:text-base text-[#211C4D] font-semibold max-w-[180px] mx-auto line-clamp-2 leading-tight">
              {isArabic ? cert.name_ar : cert.name_en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(CertificationBadgesSection);