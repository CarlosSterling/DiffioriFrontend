"use client";

import { Link } from "@heroui/link";
import {
  MapPinIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  ArrowUpIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage } from "@/i18n/LanguageContext";
import Image from "next/image";

export const Footer = () => {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-primary to-black pt-20 pb-10 text-primary-100 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-100/20 to-transparent" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* ---- Col 1: Logo & About (5 columns) ---- */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="flex items-center justify-center md:-ml-[4cm]">
              <div 
                className="bg-white/90 w-[550px] h-[192px]"
                style={{
                  maskImage: 'url("/logoDiffiori.png")',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url("/logoDiffiori.png")',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
                role="img"
                aria-label="Diffiori Logo"
              />
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-md font-medium tracking-wide">
              {dict.footer.description}
            </p>
            
            <div className="flex gap-5 pt-2">
              {[
                { icon: FacebookIcon, href: "https://facebook.com/diffioricafe/", label: "Facebook" },
                { icon: InstagramIcon, href: "https://instagram.com/diffioricafe", label: "Instagram" },
                { icon: TwitterIcon, href: "https://x.com/diffioricafe", label: "X" },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  isExternal
                  href={social.href}
                  className="opacity-70 hover:opacity-100 hover:scale-110 hover:text-white transition-all duration-300 transform p-2 hover:bg-white/5 rounded-full text-primary-100"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>

          {/* ---- Col 2: Contáctanos (3 columns) ---- */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-6 justify-center">
            <h4 className="text-sm font-bold tracking-widest text-primary-100 uppercase border-b border-primary-100/20 pb-2 w-full md:w-auto text-center md:text-left">
              {dict.footer.contact}
            </h4>
            
            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-4 group justify-center md:justify-start">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                  <MailIcon size={18} className="opacity-90" />
                </div>
                <Link href="mailto:diffioricafe@gmail.com" className="hover:text-white transition-colors font-light tracking-wide text-primary-100">
                  diffioricafe@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-4 group justify-center md:justify-start">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5">
                  <WhatsAppIcon size={18} className="opacity-90" />
                </div>
                <Link 
                  href={`https://wa.me/573123938505?text=${encodeURIComponent(dict.footer.whatsappMsg)}`} 
                  isExternal 
                  className="hover:text-white transition-colors font-light tracking-wide text-primary-100"
                >
                  +57 312 393 8505
                </Link>
              </li>
            </ul>
          </div>

          {/* ---- Col 3: Visítanos (4 columns) ---- */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6 justify-center">
            <h4 className="text-sm font-bold tracking-widest text-primary-100 uppercase border-b border-primary-100/20 pb-2 w-full md:w-auto text-center md:text-left">
              {dict.footer.visitUs}
            </h4>

            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="p-2 rounded-full bg-white/5 mt-0.5 border border-white/5">
                <MapPinIcon size={20} className="opacity-90 flex-shrink-0" />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <p className="font-bold text-base mb-1 leading-tight tracking-wide text-white/90">Diffiori Café Pitalito</p>
                <p className="opacity-70 text-sm leading-relaxed font-light">
                  Cl. 17 Sur #1-37<br />
                  Pitalito – Huila, Colombia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-60 gap-4">
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
          className="p-2 transition-all hover:scale-110 active:scale-95 group text-primary-100 opacity-80 hover:opacity-100"
        >
          <ArrowUpIcon size={28} className="group-hover:-translate-y-1 transition-transform drop-shadow-md" />
        </button>

        {/* WhatsApp */}
        <Link
          href={`https://wa.me/573123938505?text=${encodeURIComponent(dict.footer.whatsappMsg)}`}
          isExternal
          aria-label="Chat WhatsApp"
          className="shadow-2xl rounded-full p-3 transition-all hover:scale-110 active:scale-95 bg-[#25D366] ring-2 xl:ring-4 ring-black/20 hover:ring-[#25D366]/30"
        >
          <WhatsAppIcon size={28} className="text-white" />
        </Link>
      </div>
    </footer>
  );
};
