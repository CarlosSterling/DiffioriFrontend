"use client";

import { Link } from "@heroui/link";
import {
  MapPinIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  ArrowUpIcon,
} from "lucide-react";
import { WhatsAppIcon, TikTokIcon } from "@/components/icons";
import { useLanguage } from "@/i18n/LanguageContext";
import Image from "next/image";

export const Footer = () => {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-zinc-800 to-black pt-20 pb-10 text-gold-light relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-trama-diffiori-light opacity-[0.07] pointer-events-none" />
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-light/20 to-transparent" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* ---- Col 1: Logo & About (5 columns) ---- */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="flex items-center justify-center md:justify-start w-full">
              <img 
                src="/navbar-logo.png" 
                alt="Diffiori Logo"
                className="w-full max-w-[300px] sm:max-w-[450px] h-auto object-contain opacity-95 hover:opacity-100 transition-all duration-300 drop-shadow-2xl"
              />
            </div>
            <p className="text-base leading-relaxed opacity-80 max-w-md font-medium tracking-wide">
              {dict.footer.description}
            </p>
            
            <div className="flex gap-6 pt-4">
              {[
                { icon: FacebookIcon, href: "https://facebook.com/diffioricafe/", label: "Facebook" },
                { icon: InstagramIcon, href: "https://instagram.com/diffioricafe", label: "Instagram" },
                { icon: TikTokIcon, href: "https://tiktok.com/@diffioricafe", label: "TikTok" },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  isExternal
                  href={social.href}
                  className="opacity-70 hover:opacity-100 hover:scale-110 hover:text-white transition-all duration-300 transform p-2 hover:bg-white/5 rounded-full text-gold-light border border-white/5"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>

          {/* ---- Col 2: Contáctanos (3 columns) ---- */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-6 justify-center">
            <h4 className="text-base font-black tracking-widest text-gold-light opacity-80 uppercase border-b border-gold-light/30 pb-2 w-full md:w-auto text-center md:text-left">
              {dict.footer.contact}
            </h4>
            
            <ul className="space-y-5 text-base">
              <li className="flex items-center gap-4 group justify-center md:justify-start">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                  <MailIcon size={18} className="opacity-90" />
                </div>
                <Link href="mailto:diffioricafe@gmail.com" className="hover:text-white transition-colors font-light tracking-wide text-gold-light">
                  diffioricafe@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-4 group justify-center md:justify-start">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10">
                  <WhatsAppIcon size={18} className="opacity-90" />
                </div>
                <Link 
                  href={`https://wa.me/573227560973?text=${encodeURIComponent(dict.footer.whatsappMsg)}`} 
                  isExternal 
                  className="hover:text-white transition-colors font-light tracking-wide text-gold-light"
                >
                  +57 322 756 0973
                </Link>
              </li>
            </ul>
          </div>

          {/* ---- Col 3: Visítanos (4 columns) ---- */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6 justify-center">
            <h4 className="text-base font-black tracking-widest text-gold-light opacity-80 uppercase border-b border-gold-light/30 pb-2 w-full md:w-auto text-center md:text-left">
              {dict.footer.visitUs}
            </h4>

            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="p-2 rounded-full bg-white/5 mt-0.5 border border-white/10">
                <MapPinIcon size={22} className="opacity-90 flex-shrink-0" />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <p className="font-black text-xl mb-1 leading-tight tracking-wide text-gold-light opacity-90">Diffiori Café Pitalito</p>
                <p className="text-gold-light opacity-70 text-base leading-relaxed font-light">
                  Cl. 17 Sur #1-37<br />
                  Pitalito – Huila, Colombia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm opacity-60 gap-4">
          <p className="font-medium tracking-wider text-center md:text-left">
            © {year} {dict.footer.techForField}
          </p>
          <div className="flex gap-6 tracking-wide">
            <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
          </div>
        </div>
      </div>

      {/* ---- Floating Buttons ---- */}
      <div className="fixed bottom-28 xl:bottom-8 right-4 xl:right-8 z-40 flex flex-col gap-3">
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="p-2 transition-all hover:scale-110 active:scale-95 group text-gold-light opacity-80 hover:opacity-100"
        >
          <ArrowUpIcon size={28} className="group-hover:-translate-y-1 transition-transform drop-shadow-md" />
        </button>
      </div>
    </footer>
  );
};
