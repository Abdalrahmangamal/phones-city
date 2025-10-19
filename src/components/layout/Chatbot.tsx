import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ropot from "@/assets/images/ropot.png";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* زر الروبوت */}
      <img
        src={ropot}
        alt="Chat Bot"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[500] w-[200px] h-[180px] bottom-[-20px] right-[-20px] cursor-pointer transition-transform duration-300 hover:scale-110"
      />

      {/* نافذة الشات مع الأنميشن */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[120px] right-[40px] w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden z-[600]"
          >
            {/* الهيدر */}
            <div className="bg-[#2F2C79] text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={ropot} className="w-[60px]" alt="Chat Bot" />
                <h3 className="font-semibold">شات</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 text-xl"
              >
                ✕
              </button>
            </div>

            {/* الرسائل */}
            <div className="p-4 space-y-3 h-[400px] overflow-y-auto bg-gray-50">
              <div className="self-start bg-[#E3F2FD] text-gray-800 px-3 py-2 rounded-xl w-fit">
                مرحبًا! كيف يمكنني مساعدتك اليوم؟
              </div>
              <div className="self-end bg-[#2F2C79] text-white px-3 py-2 rounded-xl w-fit ml-auto">
                متى سينزل آيفون 17؟
              </div>
            </div>

            {/* إدخال الرسالة */}
            <div className="border-t flex items-center p-3 bg-white">
              <input
                type="text"
                placeholder="اكتب رسالتك هنا..."
                className="flex-grow border rounded-xl px-3 py-2 outline-none text-sm"
              />
              <button className="ml-2 bg-[#2F2C79] text-white px-4 py-2 rounded-xl hover:bg-[#27246a]">
                إرسال
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
