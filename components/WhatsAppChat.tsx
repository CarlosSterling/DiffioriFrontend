"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage } from "@/i18n/LanguageContext";

export const WhatsAppChat = () => {
  const { dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const WHATSAPP_NUMBER = "573227560973";

  const handleSend = () => {
    if (!message.trim()) return;
    
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-28 xl:bottom-8 right-4 xl:right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-[320px] sm:w-[380px] bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="btn-gold-premium p-4 flex justify-between items-center !rounded-none !shadow-none">
              <div className="flex items-center gap-3">
                <div className="bg-[#4A3728]/10 p-2 rounded-full backdrop-blur-sm">
                  <WhatsAppIcon size={24} className="text-[#4A3728]" />
                </div>
                <div>
                  <h3 className="font-black text-sm leading-none text-[#4A3728] uppercase tracking-wider">{dict.whatsappChat.title}</h3>
                  <span className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-black text-[#4A3728]">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-[#4A3728]/10 p-2 rounded-full transition-all text-[#4A3728] hover:scale-110 active:scale-90"
                aria-label={dict.whatsappChat.close}
              >
                <X size={20} className="stroke-[3]" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-gradient-to-b from-primary/5 to-transparent min-h-[150px] flex flex-col justify-end">
              <div className="bg-content2 self-start p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] mb-4 border border-white/5">
                <p className="text-sm">
                  {dict.whatsappChat.greeting}
                </p>
                <span className="text-[9px] opacity-40 mt-1 block text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-content1 border-t border-white/5 space-y-3">
              <Textarea
                placeholder={dict.whatsappChat.placeholder}
                value={message}
                onValueChange={setMessage}
                className="w-full"
                variant="flat"
                classNames={{
                   input: "placeholder:text-foreground/30 text-sm",
                   innerWrapper: "bg-background/50 border-white/5",
                }}
                minRows={2}
                maxRows={4}
              />
              <Button
                onPress={handleSend}
                className="w-full font-bold group btn-gold-premium"
                endContent={<Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                isDisabled={!message.trim()}
              >
                {dict.whatsappChat.send}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.05, 1] 
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative"
      >
        {/* Pulse effect rings */}
        {!isOpen && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.5, 1.8], opacity: [0.3, 0.1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1.5], opacity: [0.2, 0.05, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
            />
          </>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir Chat WhatsApp"
          className={`shadow-2xl rounded-full p-4 transition-all hover:scale-110 active:scale-95 ring-2 xl:ring-4 ring-black/20 hover:ring-[#25D366]/30 z-50 ${
            isOpen ? 'bg-primary' : 'bg-[#25D366]'
          }`}
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <WhatsAppIcon size={28} className="text-white" />
          )}
        </button>
      </motion.div>
    </div>
  );
};
