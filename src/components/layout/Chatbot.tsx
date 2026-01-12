import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWebchat } from '@botpress/webchat';
import botGif from '../../assets/images/Untitled design (1).gif';

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
  // const toggleChat = () => setIsOpen(!isOpen);

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
      {/* Floating Button - Robot Image (Exact User Code) */}
      {!isOpen && (
        <img
          src={botGif}
          alt="Chat Bot"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed z-[500] w-[200px] h-[180px] bottom-[-20px] right-[-20px] cursor-pointer transition-transform duration-300 hover:scale-110"
        />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 z-50 w-[360px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden font-sans"
            style={{ direction: 'rtl' }}
          >
            {/* Header */}
            <div className="bg-[#2F2C79] text-white p-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm w-10 h-10 overflow-hidden flex items-center justify-center">
                    <img src={botGif} alt="Bot" className="w-full h-full object-cover" />
                  </div>
                  {isConnected && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#2F2C79] rounded-full"></span>}
                </div>
                <div>
                  <h3 className="font-bold text-base">المساعد الذكي</h3>
                  <p className="text-[10px] text-gray-300 opacity-90">دائماً في خدمتك</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 p-1.5 rounded-full text-white hover:bg-white/20 transition">
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
                // 1. Precise User Detection (Robust)
                const storedUserId = typeof window !== 'undefined' ? localStorage.getItem('bp-webchat-user-id') : null;
                const currentUserId = user?.id || (client as any)?.user?.id || storedUserId;
                const isUser = msg.publisher === 'user' || (currentUserId && msg.authorId === currentUserId);

                // --- Content Extraction ---
                const block = msg.block;
                const payload = msg.payload;
                let content: React.ReactNode = null;

                if (block && block.type === 'carousel') {
                  content = renderCarousel(block);
                } else if (block && block.type === 'bubble' && block.block?.type === 'text') {
                  content = block.block.text;
                } else if (block && block.type === 'image') {
                  content = (
                    <div className="min-w-[240px] max-w-sm bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-3 shadow-md">
                      <div className="w-full h-48 bg-gray-50 rounded-lg overflow-hidden relative">
                        <img src={block.url} alt="Product" className="w-full h-full object-contain mix-blend-multiply p-2" />
                      </div>
                    </div>
                  );
                } else if (block && block.type === 'text') {
                  content = block.text;
                } else if (payload) {
                  if (payload.type === 'text') content = payload.text;
                  else if (payload.type === 'image') {
                    content = (
                      <div className="min-w-[240px] max-w-sm bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-3 shadow-md">
                        <div className="w-full h-48 bg-gray-50 rounded-lg overflow-hidden relative">
                          <img src={payload.image || payload.imageUrl} alt="content" className="w-full h-full object-contain mix-blend-multiply p-2" />
                        </div>
                      </div>
                    );
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

                if (!content) content = msg.text || "";

                // 3. Media Check
                const isMedia = (block?.type === 'carousel' || block?.type === 'image' || payload?.type === 'image');

                // --- Final Styling (Simple & Radical) ---

                // RTL Context: 
                // self-start -> Right (User)
                // self-end   -> Left (Bot)

                const alignmentClass = isUser ? "self-start" : "self-end";

                const colorClass = isUser
                  ? "bg-[#2F2C79] text-white rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl rounded-br-none" // User: Blue
                  : "bg-white text-gray-800 border border-gray-100 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-none shadow-sm"; // Bot: White/Gray

                // Media: Transparent
                const finalClass = isMedia
                  ? `w-full max-w-full bg-transparent ${alignmentClass}`
                  : `max-w-[85%] px-4 py-3 shadow-sm ${alignmentClass} ${colorClass}`;

                return (
                  <div key={msg.id || idx} className={`flex flex-col mb-3 ${finalClass}`}>
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
                  {/* Rotated -90deg to point LEFT (Outwards in RTL) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -rotate-90" viewBox="0 0 20 20" fill="currentColor">
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
