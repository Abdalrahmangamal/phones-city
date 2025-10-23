"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import order from "@/assets/images/order.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";
import Cheackoutsummary from "@/components/chekout/Cheackoutsummary";
import Checkoutaddress from "@/components/chekout/Checkoutaddress";
import Checkoutpayment from "@/components/chekout/Checkoutpayment";
import { addSampleProductsToCart } from "@/utils/cartHelpers";
import Layout from "@/components/layout/Layout";
export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Add sample products to cart when component mounts
  useEffect(() => {
    addSampleProductsToCart();
  }, []);

  const steps = [
    { title: "ملخص الطلب", number: order, componunt: <Cheackoutsummary /> },
    { title: "العنوان", number: step2, componunt: <Checkoutaddress /> },
    { title: "الدفع", number: step3, componunt: <Checkoutpayment /> },
  ];

  return (
    <Layout>
      <div className="min-h-screen mt-[60px] bg-white" dir="rtl">
        {/* Stepper */}
        <div className="bg-white  flex items-center justify-center   py-8">
          <div className="md:w-[600px] w-full  px-4">
            <div className="flex items-center justify-around gap-8">
              {steps.map((step, index) => (
                <div className="flex items-center justify-center flex-col">
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center justify-center">
                      {/* الدائرة */}
                      <div
                        className={`w-[37px] h-[37px] rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                          activeStep === index
                            ? "bg-orange-400 text-white"
                            : activeStep > index
                            ? "bg-green-500 text-white"
                            : "bg-[#AEAEAE] text-gray-600"
                        }`}
                      >
                        {activeStep > index ? (
                          "✓"
                        ) : (
                          <img src={step.number} alt="" />
                        )}
                      </div>

                      {/* العنوان */}
                      <span
                        className={`mt-2 text-sm font-semibold ${
                          activeStep === index
                            ? "text-orange-400"
                            : "text-[#939393]"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="md:w-[150px] w-[50px] h-[2px] mt-5 bg-gray-300 " />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Step Content Area */}
        <div className="w-full mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 min-h-96">
            <div className="text-center text-gray-400">
              <p className="text-lg"> {steps[activeStep].componunt}</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Removed the "رجوع" button as requested */}
        <div className="bg-white   py-6">
          <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4">
            <Button
              className="w-[400px] h-[56px] bg-[#F3AC5D] !opacity-[100%] rounded-[16px] flex items-center justify-center text-[24px] text-[white]"
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
            >
              {activeStep === steps.length - 1 ? "إنهاء" : "التالي"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}