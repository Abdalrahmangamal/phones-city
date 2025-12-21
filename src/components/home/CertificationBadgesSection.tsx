// src/components/CertificationBadgesSection.tsx
import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCertificateStore } from "@/store/home/certificateStore";
import { useTranslation } from "react-i18next";

interface Certificate {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  main_image?: string;
}

interface CertificationBadgesSectionProps {
  certificates: Certificate[];
}

const CertificationBadgesSection: React.FC<CertificationBadgesSectionProps> = ({
  certificates,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    currentCertificate,
    loadingSingle,
    fetchCertificateById,
  } = useCertificateStore();

  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const handleOpen = useCallback(
    (certId: number) => {
      setOpenDialogId(certId);
      fetchCertificateById(certId);
    },
    [fetchCertificateById]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialogId(null);
  }, []);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.currentTarget;
      target.src = "/placeholder-certificate.png";
      target.onerror = null;
    },
    []
  );

  // حالة عدم وجود بيانات أو تحميل
  if (!certificates || certificates.length === 0) {
    return (
      <section className="w-full my-[30px] md:!my-20 max-w-[1280px] mx-auto px-4">
        <h2 className="font-semibold text-[22px] md:text-[32px] text-[#211C4D] text-center mb-8">
          {t("OurCertificates")}
        </h2>
        <div className="flex flex-col items-center justify-center h-40 gap-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <span className="text-gray-600">
            {isArabic ? t("LoadingCertificates") : t("LoadingCertificatesEn")}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full my-[30px] md:!my-20 max-w-[1280px] mx-auto px-4">
      <h2 className="font-semibold text-[22px] md:text-[32px] text-[#211C4D] text-center mb-8">
        {t("OurCertificates")}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8 justify-items-center">
        {certificates.map((cert) => (
          <div key={cert.id} className="flex flex-col items-center justify-center w-full">
            <Dialog
              open={openDialogId === cert.id}
              onOpenChange={(open) => {
                if (!open) handleCloseDialog();
              }}
            >
              <DialogTrigger asChild>
                <div
                  className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleOpen(cert.id)}
                >
                  <img
                    src={cert.image}
                    alt={isArabic ? cert.name_ar : cert.name_en}
                    className="w-full h-full object-contain p-4"
                    onError={handleImageError}
                  />
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl">
                {loadingSingle ? (
                  <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <span className="text-gray-600">
                      {isArabic ? t("LoadingDetails") : t("LoadingDetailsEn")}
                    </span>
                  </div>
                ) : currentCertificate ? (
                  <>
                    <div className="bg-gray-50 p-6 flex items-center justify-center">
                      <img
                        src={currentCertificate.main_image}
                        alt={isArabic ? currentCertificate.name_ar : currentCertificate.name_en}
                        className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                        onError={handleImageError}
                      />
                    </div>

                    <div className="p-8 text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                        {isArabic ? currentCertificate.name_ar : currentCertificate.name_en}
                      </h3>

                      <p className="text-lg text-gray-600">
                        {isArabic ? currentCertificate.name_en : currentCertificate.name_ar}
                      </p>

                      <div className="mt-10">
                        <button
                          onClick={handleCloseDialog}
                          className="px-10 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          {t("Close")}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-red-500 text-xl mb-4">{isArabic ? "Warning: فشل تحميل التفاصيل" : "Warning: Failed to load details"}</p>
                    <button
                      onClick={handleCloseDialog}
                      className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      {t("Back")}
                    </button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <p className="mt-4 text-sm md:text-base text-[#211C4D] font-semibold max-w-[180px] mx-auto text-center line-clamp-2 leading-tight">
              {isArabic ? cert.name_ar : cert.name_en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(CertificationBadgesSection);