export interface GoogleReview {
  id: string;
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export const googleReviews: GoogleReview[] = [
  {
    id: "1",
    author_name: "María Fernanda González",
    author_url: "#",
    language: "es",
    original_language: "es",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjWbM...=s128-c0x00000000-cc-rp-mo", // We will use a colorful placeholder in the component if this fails
    rating: 5,
    relative_time_description: "hace 2 semanas",
    text: "El mejor café que he probado en el Huila. El lugar es mágico, la atención es impecable y los postres son deliciosos. ¡Súper recomendado!",
    time: 1709423634,
    translated: false,
  },
  {
    id: "2",
    author_name: "Carlos Andrés Rodríguez",
    author_url: "#",
    language: "es",
    original_language: "es",
    profile_photo_url: "", 
    rating: 5,
    relative_time_description: "hace un mes",
    text: "Excelente servicio y un ambiente único. Me encanta venir a trabajar aquí, el internet es rápido y el café siempre está en su punto. Totalmente recomendado.",
    time: 1708423634,
    translated: false,
  },
  {
    id: "3",
    author_name: "Andrea López",
    author_url: "#",
    language: "es",
    original_language: "es",
    profile_photo_url: "",
    rating: 4,
    relative_time_description: "hace 3 meses",
    text: "Me encanta la variedad de preparaciones. El capuchino es perfecto y las opciones de brunch son muy completas. Volveré pronto.",
    time: 1707423634,
    translated: false,
  },
  {
    id: "4",
    author_name: "Juan Sebastián Martinez",
    author_url: "#",
    language: "es",
    original_language: "es",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "hace 1 semana",
    text: "Un sitio espectacular para compartir en familia. La decoración es hermosa y se nota el amor en cada detalle. El café de origen es una experiencia obligada.",
    time: 1710423634,
    translated: false,
  },
  {
    id: "5",
    author_name: "Laura Valentina Ramírez",
    author_url: "#",
    language: "es",
    original_language: "es",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "hace 4 días",
    text: "Simplemente delicioso. Los baristas saben mucho y te explican todo sobre el café. Me sentí muy bien atendida.",
    time: 1711423634,
    translated: false,
  },
];
