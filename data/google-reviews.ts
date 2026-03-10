export interface GoogleReview {
  id: string;
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

export const googleReviews: GoogleReview[] = [
  {
    id: "1",
    author_name: "María Fernanda González",
    rating: 5,
    text: "El mejor café que he probado en el Huila. El lugar es mágico, la atención es impecable y los postres son deliciosos. ¡Súper recomendado!",
    relative_time_description: "hace 2 semanas",
  },
  {
    id: "2",
    author_name: "Carlos Andrés Rodríguez",
    rating: 5,
    text: "Excelente servicio y un ambiente único. Me encanta venir a trabajar aquí, el internet es rápido y el café siempre está en su punto. Totalmente recomendado.",
    relative_time_description: "hace un mes",
  },
  {
    id: "3",
    author_name: "Andrea López",
    rating: 5,
    text: "Me encanta la variedad de preparaciones. El capuchino es perfecto y las opciones de brunch son muy completas. Volveré pronto.",
    relative_time_description: "hace 3 meses",
  },
  {
    id: "4",
    author_name: "Juan Sebastián Martinez",
    rating: 5,
    text: "Un sitio espectacular para compartir en familia. La decoración es hermosa y se nota el amor en cada detalle. El café de origen es una experiencia obligada.",
    relative_time_description: "hace 1 semana",
  },
  {
    id: "5",
    author_name: "Laura Valentina Ramírez",
    rating: 5,
    text: "Simplemente delicioso. Los baristas saben mucho y te explican todo sobre el café. Me sentí muy bien atendida.",
    relative_time_description: "hace 4 días",
  },
];
