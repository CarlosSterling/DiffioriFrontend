"use client";
import clsx from "clsx";

interface LogoProps {
  scrolled: boolean;
  className?: string;
}

export const Logo = ({ scrolled, className }: LogoProps) => {
  return (
    <div
      className={clsx(
        "relative flex items-center transition-all duration-500",
        scrolled ? "h-[45px] sm:h-[55px]" : "h-[100px] sm:h-[150px] xl:h-[170px]",
        className
      )}
    >
      {scrolled ? (
        /* Isotipo - Small version when scrolling */
        <img 
          src="/Isotipo.jpg" 
          alt="Diffiori Isotipo"
          className="h-full w-auto object-contain rounded-full shadow-lg brightness-110 saturate-[1.1] border border-white/10"
        />
      ) : (
        /* Full Logo - Large version with premium black shadow/glow for white text legibility */
        <img 
          src="/logoDiffiori.png" 
          alt="Diffiori Café"
          className={clsx(
            "h-full w-auto object-contain transition-all duration-500",
            "brightness-105 contrast-125 saturate-[1.1] dark:brightness-125",
            /* Cross-browser safe filter: defined 1px shadow for text + soft 12px halo */
            "[filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.15))_drop-shadow(0_0_12px_rgba(255,255,255,0.8))]",
            "dark:drop-shadow-none"
          )}
        />
      )}
    </div>
  );
};
