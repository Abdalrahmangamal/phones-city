import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
const Loader: React.FC = () => {
  const { t } = useTranslation();
  const [rand, setRand] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRand(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0f1c] flex items-center justify-center z-[9999]">
      <div className="relative flex flex-col items-center">

        {/* نقاط بتلف حوالين الشعار */}
        <div
          className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg
                     animate-[orbit-1_3.4s_linear_infinite]"
        />
        <div
          className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-md
                     animate-[orbit-2_4.1s_linear_infinite]"
        />
        <div
          className="absolute w-2 h-2 bg-blue-400 rounded-full
                     animate-[orbit-3_5s_linear_infinite]"
        />

        {/* حلقات تتحرك في اتجاهين */}
        <div
          className="absolute w-[210px] h-[210px] rounded-full border-4 border-yellow-400
                     animate-[spin_6s_linear_infinite]"
        />
        <div
          className="absolute w-[180px] h-[180px] rounded-full border-4 border-white
                     animate-[spin_7s_linear_infinite_reverse]"
        />

        {/* الشعار نفسه */}
        <img
          src={logo}   
          alt="Phone City"
          className="w-24 drop-shadow-[0_0_15px_rgba(0,153,229,0.6)]
                     animate-[bounce-smooth_2s_ease-in-out_infinite]"
        />

        {/* موجات الواي فاي تحت الشعار */}
        <div className="absolute bottom-10 flex flex-col items-center gap-1">
          <div className="w-10 h-2 bg-yellow-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
          <div className="w-8  h-2 bg-yellow-400 rounded-full animate-[pulse_1.6s_ease-in-out_infinite]" />
          <div className="w-6  h-2 bg-yellow-400 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
        </div>

        <p className="text-white text-lg mt-4 tracking-[0.3em] animate-pulse">
          {t("Loading...")}
        </p>
      </div>
    </div>
  );
};

export default Loader;
