import certficate1 from '../../assets/images/certficate1.png'
import certficate2 from '../../assets/images/certficate2.png'
// src/components/CertificationBadgesSection.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const CertificationBadgesSection: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleOpen = (src: string) => {
    setModalImage(src);
  };

  return (
    <div className="w-full !my-30 max-w-[1280px] h-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-[80px] mx-auto p-4">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-[504px] gap-4">
        <div className="relative">
          <div className="absolute top-1 right-4 z-0">
            <img src="/Layer_1.svg" alt="" />
          </div>
          <h2
            id="cert-known-title"
            className="font-roboto font-semibold text-[28px] md:text-[40px] leading-[36px] text-[#211C4D] relative z-10 text-center"
          >
            شهادة توثيق معروف
          </h2>
        </div>

        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={() => handleOpen("/Frame 1321317073.svg")}
                className="cursor-pointer focus:outline-none rounded"
              >
                <img
                  src={certficate1}
                  alt="شهادة معروف - Thumbnail"
                  className="max-w-full h-[150px] block"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl p-0 flex items-center justify-center"   
            style={{
    maxWidth: "50%",
    maxHeight: "90vh",
    padding: 0,
    background: "transparent",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
              {modalImage && (
                <img
                  src={modalImage}
                  alt="عرض مكبر للشهادة"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full md:w-[708px] gap-4">
        <div className="relative">
          <div className="absolute top-0 right-47 z-0">
            <img src="/Layer_1.svg" alt="" />
          </div>
          <h2
            id="cert-verify-title"
            className="font-roboto font-semibold text-[28px] md:text-[40px] leading-[36px] text-[#211C4D] relative z-10 text-center"
          >
            شهادة توثيق
          </h2>
        </div>

        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={() => handleOpen("/Frame 13213170732.svg")}
                className="cursor-pointer focus:outline-none rounded"
              >
                <img
                  src={certficate2}
                  alt="شهادة التوثيق - Thumbnail"
                  className="max-w-full h-[120px] block"
                />
              </button>
            </DialogTrigger>
<DialogContent
  className="p-0 flex items-center justify-center"
  style={{
    maxWidth: "50%",
    maxHeight: "90vh",
    padding: 0,
    background: "transparent",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {modalImage && (
    <img
      src={modalImage}
      alt="عرض مكبر للشهادة"
      className="max-w-full max-h-[90vh] w-full object-contain rounded-lg"
    />
  )}
</DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CertificationBadgesSection;
