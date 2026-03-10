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
        scrolled ? "h-[52px]" : "h-[85px] sm:h-[135px]",
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
            "brightness-105 contrast-[1.1] saturate-[1.1] dark:brightness-125",
            /* Stronger black shadow for maximum white text pop on light backgrounds */
            "[filter:drop-shadow(0_2px_20px_rgba(0,0,0,0.6))_drop-shadow(0_0_5px_rgba(0,0,0,0.7))]",
            "dark:drop-shadow-none"
          )}
        />
      )}
    </div>
  );
};
