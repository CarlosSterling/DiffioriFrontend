/* ──────────────  Base Dictionary Interface  ────────────── */
export interface LocaleDict {
  nav: {
    inicio: string;
    productos: string;
    carta: string;
    cafe: string;
    clientes: string;
    blog: string;
    contactanos: string;
    cotizar: string;
    cotizarAhora: string;
    leerMas: string;
    cargando: string;
  };
  hero: {
    title: string;
    subtitle: string;
    buyNow: string;
    slides: {
      prep: { title: string; desc: string };
      capuchino: { title: string; desc: string };
      milkshake: { title: string; desc: string };
      pound: { title: string; desc: string };
    };
  };
  footer: {
    menu: string;
    followUs: string;
    contact: string;
    techForField: string;
    privacyPolicy: string;
    visitUs: string;
    hoursTitle: string;
    hoursWeek: string;
    hoursWeekend: string;
    description: string;
    emailLabel: string;
    hoursLabel: string;
    whatsappMsg: string;
  };
  about: {
    title: string;
    description: string;
    fullHistory: string;
    understood: string;
    close: string;
  };
  productos: {
    title: string;
    seeMore: string;
    close: string;
    quoteIt: string;
    price: string;
  };
  cafe: {
    title: string;
    subtitle: string;
    addToCart: string;
    buyNow: string;
    variant: string;
    added: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    total: string;
    goToCheckout: string;
    remove: string;
    continueShopping: string;
    increaseQty: string;
    decreaseQty: string;
  };
  checkout: {
    title: string;
    buyerData: string;
    name: string;
    email: string;
    phone: string;
    delivery: string;
    shipping: string;
    pickup: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
    pickupNote: string;
    orderSummary: string;
    paymentMethod: string;
    creditCard: string;
    debitCard: string;
    pse: string;
    paypal: string;
    creditCardDesc: string;
    debitCardDesc: string;
    pseDesc: string;
    paypalDesc: string;
    pseRedirect: string;
    paypalRedirect: string;
    cardNumber: string;
    cardName: string;
    cvv: string;
    installments: string;
    installment: string;
    installmentsPlural: string;
    bankEmail: string;
    pay: string;
    total: string;
    continueShopping: string;
    successTitle: string;
    successMsg: string;
    backToHome: string;
    emptyCart: string;
    goToShop: string;
    remove: string;
  };
}

const es: LocaleDict = {
  /* ── Nav ── */
  nav: {
    inicio: "Inicio",
    productos: "Tienda",
    carta: "Nuestra Carta",
    cafe: "Café",
    clientes: "Clientes",
    blog: "Blog",
    contactanos: "Contáctanos",
    cotizar: "Cotizar",
    cotizarAhora: "Cotizar ahora",
    leerMas: "Leer más",
    cargando: "Cargando...",
  },
  /* ── Hero / Home ── */
  hero: {
    title: "El sabor de lo que somos",
    subtitle: "Descubre el café que nace de nuestra tierra y nos define.",
    buyNow: "Comprar ahora",
    slides: {
      prep: {
        title: "Arte con Sabor a Café!",
        desc: "Somos una cafetería que combina la pasión por el buen café con el arte y la cultura local. Más que un lugar para disfrutar de una bebida, somos un espacio de encuentro donde convergen sabores, aromas, creatividad y calidez."
      },
      capuchino: {
        title: "Capuchinos Perfectos",
        desc: "Textura sedosa y arte latte que deleitan tus sentidos en cada sorbo."
      },
      milkshake: {
        title: "Malteadas de Especialidad",
        desc: "Una explosión de frescura y sabor con nuestra base de café premium."
      },
      pound: {
        title: "Café por Libra",
        desc: "Lleva a casa la esencia del Huila, tostado a la perfección para tu hogar."
      }
    }
  },
  /* ── Footer ── */
  footer: {
    menu: "Menú",
    followUs: "Síguenos",
    contact: "Contacto",
    techForField: "Diffiori: El sabor de lo que somos",
    privacyPolicy: "Política de privacidad",
    visitUs: "Visítanos",
    hoursTitle: "Horarios",
    hoursWeek: "Lunes - Sábado: 8:00 AM - 9:30 PM",
    hoursWeekend: "Domingos y Festivos: 10:00 AM - 6:00 PM",
    description: "Cada grano cuenta una historia de nuestra tierra. En Diffiori, transformamos el café del Huila en una experiencia sensorial única, donde la pasión por el tostado y el compromiso social se encuentran en cada taza. Visítanos y descubre el alma de nuestra cultura cafetera en un ambiente diseñado para los amantes de la excelencia.",
    emailLabel: "Email:",
    hoursLabel: "Horarios:",
    whatsappMsg: "Hola Diffiori Café, me gustaría obtener más información sobre sus cafés de especialidad.",
  },
  /* ── Sobre Nosotros ── */
  about: {
    title: "Sobre Nosotros",
    description: "Somos una empresa apasionada por el café de origen del Huila. Trabajamos de la mano con caficultores locales para llevar el sabor de nuestra tierra a cada taza. Nuestra misión es resaltar la calidad y el esfuerzo de quienes cultivan lo mejor de nuestro campo.",
    fullHistory: "La Historia Completa",
    understood: "Entendido",
    close: "Cerrar",
  },
  /* ── Productos ── */
  productos: {
    title: "Conoce más sobre nuestros productos.",
    seeMore: "Ver más",
    close: "Cerrar",
    quoteIt: "Cotizar",
    price: "Precio",
  },
  /* ── Café / Catálogo ── */
  cafe: {
    title: "Nuestro Café",
    subtitle: "Selección premium de café colombiano, cultivado con pasión en el Huila.",
    addToCart: "Agregar al carrito",
    buyNow: "Comprar ahora",
    variant: "Variante",
    added: "¡Agregado!",
  },
  /* ── Carrito ── */
  cart: {
    title: "Tu Carrito",
    empty: "Tu carrito está vacío.",
    subtotal: "Subtotal",
    total: "Total",
    goToCheckout: "Pagar",
    remove: "Eliminar",
    continueShopping: "Seguir comprando",
    increaseQty: "Aumentar cantidad",
    decreaseQty: "Disminuir cantidad",
  },
  /* ── Checkout ── */
  checkout: {
    title: "Finalizar Compra",
    buyerData: "Datos del comprador",
    name: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono",
    delivery: "Método de entrega",
    shipping: "Envío a domicilio",
    pickup: "Recoger en tienda",
    address: "Dirección de envío",
    city: "Ciudad",
    country: "País",
    state: "Departamento / Estado",
    zipCode: "Código Postal",
    pickupNote: "Recoge tu pedido en: Cl. 17 Sur #1-37, Pitalito – Huila",
    orderSummary: "Resumen de compra",
    paymentMethod: "Método de pago",
    creditCard: "Tarjeta de crédito",
    debitCard: "Tarjeta débito",
    pse: "PSE",
    paypal: "PayPal",
    creditCardDesc: "Visa, MasterCard, Amex",
    debitCardDesc: "Visa Débito, Maestro",
    pseDesc: "Débito bancario directo",
    paypalDesc: "PayPal",
    pseRedirect: "Serás redirigido a la página de PSE para completar tu pago de forma segura.",
    paypalRedirect: "Al confirmar, serás redirigido a PayPal para autorizar el pago.",
    cardNumber: "Número de tarjeta",
    cardName: "Nombre en la tarjeta",
    cvv: "CVV",
    installments: "Cuotas",
    installment: "cuota",
    installmentsPlural: "cuotas",
    bankEmail: "Correo vinculado al banco",
    pay: "Pagar",
    total: "Total",
    continueShopping: "Seguir comprando",
    successTitle: "¡Pedido recibido!",
    successMsg: "Gracias por tu compra. Te contactaremos pronto para confirmar tu pedido.",
    backToHome: "Volver al inicio",
    emptyCart: "Tu carrito está vacío. Agrega productos antes de continuar.",
    goToShop: "Ir a la tienda",
    remove: "Eliminar",
  },
};

export default es;
