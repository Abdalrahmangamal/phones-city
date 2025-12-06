import locationpen from "../../assets/images/locationpen.png";
import { useTranslation } from "react-i18next";
interface LocationProps {
  location?: string;
  map?: string;
}
export default function Location({ location,map }: LocationProps) {
  const { t } = useTranslation();
  return (
    <div className="lg:px-[90px] px-2 pt-20 md:pt-0">
      <div className="flex items-end justify-start gap-[10px]">
        <img src={locationpen} alt="" />
        <h1 className="text-[40px] font-[700] text-[#211C4D]">
          {t("FullAddress")}
        </h1>
      </div>
      <p className="mx-[60px] text-[#211C4DCC] md:text-[24px] mt-[20px] font-[400] md:max-w-[30%]">
        {location}
      </p>
      <iframe
        className="w-full h-[400px] mt-[40px] rounded-[16px] mb-[40px]"
        src={map}
        // src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11615.464581934855!2d31.311769198610563!3d30.056983380949198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1759577090769!5m2!1sen!2seg"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
}
