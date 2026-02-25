"use client";
import type { FC } from "react";

interface Props {
  lat: number;
  lng: number;
  className?: string;
}

const MapEmbed: FC<Props> = ({ lat, lng, className }) => {
  const delta = 0.01;
  const left   = lng - delta;
  const right  = lng + delta;
  const top    = lat + delta;
  const bottom = lat - delta;

  const bbox = `${left},${bottom},${right},${top}`;
  const src  =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className={className}>
      <iframe
        key={bbox}
        src={src}
        title={`Mapa ubicación (${lat}, ${lng})`}   /* ✅ evita error ESLint */
        loading="lazy"
        className="w-full aspect-[16/9] rounded-lg border-none"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
