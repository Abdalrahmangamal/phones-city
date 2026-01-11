import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWebchat } from '@botpress/webchat';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use the Webchat hook
  const {
    client,
    messages,
    isTyping,
    user,
    clientState,
  } = useWebchat({
    clientId: "4741ef2b-e155-4f54-9fb9-3f4e8260aaf1",
  });

  const isConnected = clientState === 'connected';

  // Toggle Chat
  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Handle Send
  const handleSend = async () => {
    if (!inputValue.trim() || !client) return;

    const text = inputValue;
    setInputValue("");

    try {
      await client.sendMessage({
        type: 'text',
        text: text
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  // Helper to parse Botpress Carousel Structure
  const renderCarousel = (carouselBlock: any) => {
    if (!carouselBlock || !carouselBlock.blocks) return null;

    // Structure: block.blocks (Array of Columns) -> Column.blocks (Array of Elements)
    const columns = carouselBlock.blocks;

    if (!columns.length) return null;

    return (
      <div className="flex gap-3 overflow-x-auto pb-4 max-w-[300px] snap-x no-scrollbar">
        {columns.map((col: any, colIdx: number) => {
          // Extract data from the column's nested blocks
          const colBlocks = col.blocks || [];
          let image = "";
          let title = "";
          let subtitle = "";
          let buttons: any[] = [];

          colBlocks.forEach((b: any) => {
            if (b.type === 'image') {
              image = b.url;
            } else if (b.type === 'text') {
              if (b.text?.startsWith('####')) {
                title = b.text.replace('####', '').trim();
              } else {
                subtitle = b.text;
              }
            } else if (b.type === 'row') {
              // Row usually contains buttons
              (b.blocks || []).forEach((btn: any) => {
                if (btn.type === 'button') {
                  buttons.push(btn);
                }
              });
            }
          });

          return (
            <div key={colIdx} className="min-w-[240px] snap-center bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-3 shadow-md shrink-0 h-full">
              {image && (
                <div className="w-full h-32 bg-gray-50 rounded-lg overflow-hidden relative">
                  <img src={image} alt={title} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </div>
              )}

              <div className="flex flex-col gap-1 flex-grow">
                {title && <h4 className="font-bold text-gray-900 text-sm">{title}</h4>}
                {subtitle && <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{subtitle}</p>}
              </div>

              {buttons.length > 0 && (
                <div className="flex flex-col gap-2 mt-auto pt-2">
                  {buttons.map((btn: any, btnIdx: number) => (
                    <a
                      key={btnIdx}
                      href={btn.buttonValue || '#'}
                      target={btn.buttonValue?.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="text-xs bg-[#2F2C79] text-white py-2 px-3 rounded-lg hover:bg-[#27246a] transition text-center font-medium shadow-sm transition-transform active:scale-95"
                    >
                      {btn.text || "عرض التفاصيل"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Button - Robot Icon */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-[#2F2C79] text-white p-3.5 rounded-full shadow-2xl border-[3px] border-white hover:bg-[#27246a] transition-all flex items-center justify-center"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          // Robot Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7V5.73C7.4 5.39 7 4.74 7 4a2 2 0 0 1 2-2h3M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden font-sans"
            style={{ direction: 'rtl' }}
          >
            {/* Header */}
            <div className="bg-[#2F2C79] text-white p-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    {/* Small Robot Icon for Header */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7V5.73C7.4 5.39 7 4.74 7 4a2 2 0 0 1 2-2h3M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5" />
                    </svg>
                  </div>
                  {isConnected && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#2F2C79] rounded-full"></span>}
                </div>
                <div>
                  <h3 className="font-bold text-base">المساعد الذكي</h3>
                  <p className="text-[10px] text-gray-300 opacity-90">دائماً في خدمتك</p>
                </div>
              </div>
              <button onClick={toggleChat} className="bg-white/10 p-1.5 rounded-full text-white hover:bg-white/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#F8FAFC]">
              {clientState === 'error' && (
                <div className="text-center bg-red-50 text-red-500 text-xs p-2 rounded-lg border border-red-100">
                  فشل الاتصال بالخادم. يرجى التحقق من الشبكة.
                </div>
              )}

              {/* Loop through Webchat Messages */}
              {messages.map((msg: any, idx: number) => {
                const isUser = msg.publisher === 'user' || msg.authorId === user?.id;

                // --- Content Extraction ---
                const block = msg.block; // Top level block
                const payload = msg.payload;
                let content: React.ReactNode = null;

                // 1. CAROUSEL Specific Logic
                if (block && block.type === 'carousel') {
                  content = renderCarousel(block);
                }
                // 2. TEXT Specific Logic (Handling Nested 'bubble' structure)
                else if (block && block.type === 'bubble' && block.block?.type === 'text') {
                  // Case: block -> type: 'bubble' -> block: { type: 'text', text: '...' }
                  content = block.block.text;
                }
                // 3. Direct TEXT Block
                else if (block && block.type === 'text') {
                  content = block.text;
                }
                // 4. Payload-based (Fallbacks)
                else if (payload) {
                  if (payload.type === 'text') {
                    content = payload.text;
                  }
                  else if (payload.type === 'image') {
                    content = <img src={payload.image || payload.imageUrl} alt="content" className="rounded-lg max-h-48 border border-gray-100" />
                  }
                  else if (['single-choice', 'choice', 'quick_reply'].includes(payload.type)) {
                    content = (
                      <div className="flex flex-col gap-2">
                        {payload.text && <span className="mb-1">{payload.text}</span>}
                        <div className="flex flex-wrap gap-2">
                          {(payload.choices || payload.quick_replies)?.map((choice: any, i: number) => (
                            <button
                              key={i}
                              onClick={() => client?.sendMessage({ type: 'text', text: choice.value || choice.title })}
                              className="bg-white border border-[#2F2C79] text-[#2F2C79] px-3 py-1.5 rounded-full text-xs hover:bg-[#2F2C79] hover:text-white transition"
                            >
                              {choice.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                }

                // 5. Final Fallback (Debug)
                if (!content) {
                  content = msg.text || (
                    <div className="p-2 bg-red-50 rounded border border-red-100 text-left" dir="ltr">
                      <p className="text-[10px] text-red-500 font-bold mb-1">Debug: Unsupported Message</p>
                      <pre className="text-[9px] text-gray-600 overflow-auto max-w-[200px] max-h-[100px] font-mono leading-tight">
                        {JSON.stringify(msg, null, 2)}
                      </pre>
                    </div>
                  );
                }

                // --- Alignment Logic (RTL Optimized) ---
                // User (Right Side): Start
                // Bot (Left Side): End

                const containerClass = isUser
                  ? "self-start items-start ml-auto" // User: Right
                  : "self-end items-end mr-auto";    // Bot: Left

                const bubbleClass = isUser
                  ? "bg-[#2F2C79] text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm";

                // If carousel, remove standard bubble padding/bg to let it span
                const isCarousel = block && (block.type === 'carousel' || (block.type === 'bubble' && block.block?.type === 'carousel'));

                const finalBubbleClass = isCarousel ? "w-full max-w-full !p-0 !bg-transparent !shadow-none" : bubbleClass;
                const finalContainerClass = isCarousel ? "w-full max-w-full" : `${containerClass} max-w-[85%]`;

                return (
                  <div
                    key={msg.id || idx}
                    className={`px-4 py-3 rounded-2xl text-sm flex flex-col mb-3 ${finalContainerClass} ${finalBubbleClass}`}
                  >
                    {content}
                  </div>
                );
              })}

              {isTyping && (
                <div className="self-end bg-gray-100 text-gray-400 px-3 py-2 rounded-xl w-fit text-xs flex gap-1 items-center">
                  <span>جاري الكتابة</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200">
                <input
                  type="text"
                  placeholder="اكتب رسالتك..."
                  className="flex-grow bg-transparent px-3 py-2 outline-none text-sm text-gray-700 min-w-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!isConnected}
                />
                <button
                  onClick={handleSend}
                  disabled={!isConnected || !inputValue.trim()}
                  className="p-2 bg-[#2F2C79] text-white rounded-full hover:bg-[#27246a] disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
