"use client";

import { useState } from "react";
import { 
  Button, 
  Input, 
  RadioGroup, 
  Radio, 
  Card, 
  CardBody, 
  Image, 
  Select, 
  SelectItem,
  Spinner
} from "@heroui/react";
import Link from "next/link";
import NextLink from "next/link";
import {
  BuildingIcon,
  CheckCircle2Icon,
  ArrowLeftIcon,
  Trash2Icon,
  ShoppingBagIcon,
  SendIcon,
  XCircleIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { Country, State, City } from "country-state-city";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { checkout } from "@/lib/api";
import { WhatsAppIcon } from "@/components/icons";

type DeliveryMethod = "shipping" | "pickup";
type PaymentMethod = "pse";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, removeFromCart } = useCart();
  const { dict, locale } = useLanguage();
  const t = dict.checkout;

  const [delivery, setDelivery] = useState<DeliveryMethod>("shipping");
  const [payment] = useState<PaymentMethod>("pse");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [orderItemsSnapshot, setOrderItemsSnapshot] = useState<any[]>([]);

  // States para errores de validación
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validate = (email: string, phone: string) => {
    let isValid = true;
    setEmailError("");
    setPhoneError("");

    // Regex estricto para email (requiere .TLD)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    if (!emailRegex.test(email)) {
      setEmailError(locale === "en" ? "Check email format (example@domain.com)" : "Verifica el formato del correo (ejemplo@dominio.com)");
      isValid = false;
    }

    // Regex para validar celular/teléfono (Solo números, espacios, guiones y el + opcional)
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    const pureNumbers = phone.replace(/\D/g, "");

    if (!phoneRegex.test(phone)) {
        setPhoneError(locale === "en" ? "Invalid characters in phone" : "Caracteres no válidos en el teléfono");
        isValid = false;
    } else if (pureNumbers.length < 7) {
        setPhoneError(locale === "en" ? "Phone too short (min 7 digits)" : "Número muy corto (mínimo 7 dígitos)");
        isValid = false;
    } else if (pureNumbers.length > 15) {
        setPhoneError(locale === "en" ? "Phone too long (max 15 digits)" : "Número muy largo (máximo 15 dígitos)");
        isValid = false;
    }

    return isValid;
  };

  /* ─── Global Cascading Address States ─── */
  const [countryCode, setCountryCode] = useState("CO");
  const [stateCode, setStateCode] = useState("HUI");
  const [cityName, setCityName] = useState("Pitalito");

  const allCountries = Country.getAllCountries();
  const statesOfCountry = State.getStatesOfCountry(countryCode);
  const citiesOfState = City.getCitiesOfState(countryCode, stateCode);

  const fmt = (n: number) =>
    n.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const customerName = formData.get("name") as string;
      const email = (formData.get("email") as string || "").trim().toLowerCase();
      const phone = (formData.get("phone") as string || "").trim();
      const address = formData.get("address") as string;
      
      // Validar antes de enviar
      if (!validate(email, phone)) {
          setLoading(false);
          return;
      }

      const fullAddress = delivery === "pickup" 
        ? "Recogida en tienda (Pitalito)"
        : `${address}, ${cityName}, ${stateCode}, ${countryCode}`;

      // Lógica de simulación dinámica
      const isManualFailure = email.includes("fallo") || email.includes("failed");

      const payload = {
        contact_name: customerName,
        contact_email: email,
        contact_phone: phone,
        shipping_address: fullAddress,
        items: items.map(item => ({
          variant_id: item.variantId,
          quantity: item.qty
        })),
        simulate: !isManualFailure,
        simulate_status: isManualFailure ? "FAILED" : "PAID"
      };

      const res = await checkout(payload);
      const finalOrderResult = { ...res, deliveryMethod: delivery, contact_email: email };
      setOrderResult(finalOrderResult);
      setOrderItemsSnapshot([...items]); 
      setSubmitted(true);
      
      // Auto-enviar a WhatsApp si fue exitoso (después de cambiar estado)
      if (res.status === "PAID") {
          const waUrl = buildWhatsAppUrl(finalOrderResult, [...items]);
          window.open(waUrl, '_blank');
          clearCart();
      }
    } catch (err) {
      alert(locale === "en" ? "Error processing order. Please try again." : "Error al procesar el pedido. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buildWhatsAppUrl = (result: any, cartItems: any[]) => {
    if (!result) return "#";
    const orderId = result.order_id;
    const name = result.contact_name;
    const email = result.contact_email;
    const phone = result.contact_phone;
    const totalVal = Number(result.total_amount) || 0;
    const totalStr = fmt(totalVal);
    const address = result.shipping_address || "N/A";
    const isPickup = result.deliveryMethod === "pickup";
    
    let message = locale === "en" 
        ? `☕ *NEW ORDER - DIFFIORI CAFÉ*\n\n`
        : `☕ *NUEVO PEDIDO - DIFFIORI CAFÉ*\n\n`;
        
    message += `📄 *${t.orderNumber}:* ${orderId}\n`;
    message += `💰 *VALOR PAGADO:* ${totalStr}\n\n`;

    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `• *Nombre:* ${name}\n`;
    message += `• *Email:* ${email}\n`;
    message += `• *Teléfono:* ${phone}\n\n`;

    if (isPickup) {
        message += `📍 *ENTREGA:* Recoger en Tienda\n`;
        message += `🏠 *Ubicación:* Cl. 17 Sur #1-37, Pitalito – Huila\n\n`;
    } else {
        message += `📍 *ENTREGA:* Envío a Domicilio\n`;
        message += `🚚 *Dirección:* ${address}\n\n`;
    }

    message += `📦 *RESUMEN DE COMPRA:*\n`;
    cartItems.forEach(item => {
        message += `🔹 *${item.qty}x* ${item.name}${item.variant ? ` - [${item.variant}]` : ''}\n`;
    });

    message += `\n*Comprado desde www.diffioricafe.com*`;

    return `https://wa.me/573227560973?text=${encodeURIComponent(message)}`;
  };

  const getWhatsAppUrl = () => {
    return buildWhatsAppUrl(orderResult, orderItemsSnapshot);
  };

  const sectionTitleStyle = "text-sm uppercase tracking-[0.3em] font-black text-[#4A3728] dark:text-primary-100 mb-8 flex items-center gap-3";
  const cardStyle = "bg-white/90 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-mocha-premium rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl";
  const labelStyle = "text-[10px] uppercase tracking-[0.2em] font-black text-[#4A3728]/60 dark:text-primary-200/60 ml-1 mb-2 block";
  const inputWrapperStyle = "space-y-1.5";

  /* ── Empty cart ── */
  if (items.length === 0 && !submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 bg-default-100/50 rounded-full text-default-400"
        >
          <ShoppingBagIcon size={80} strokeWidth={1} />
        </motion.div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black uppercase tracking-widest text-[#4A3728] dark:text-white">
            {t.emptyCart.split(".")[0]}
          </h2>
          <p className="text-xl text-default-500 font-light max-w-md mx-auto italic">
            {t.emptyCart.split(".")[1] || "Agrega productos para comenzar tu experiencia Diffiori."}
          </p>
        </div>
        <Button 
          as={Link} 
          href="/productos" 
          className="btn-gold-premium px-12 h-14 text-xl"
        >
          {t.goToShop}
        </Button>
      </div>
    );
  }

  /* ── Success ── */
  if (submitted) {
    const isPaid = orderResult?.status === "PAID";

    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center space-y-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={clsx(
            "p-10 rounded-full",
            isPaid ? "bg-primary/10 text-primary" : "bg-danger/10 text-danger"
          )}
        >
          {isPaid ? (
            <CheckCircle2Icon size={100} strokeWidth={1.5} />
          ) : (
            <XCircleIcon size={100} strokeWidth={1.5} />
          )}
        </motion.div>
        
        <div className="space-y-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-[#4A3728] dark:text-primary-100"
          >
            {isPaid ? t.successTitle : (locale === "en" ? "Payment Failed" : "Pago Fallido")}
          </motion.h2>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <p className={clsx("text-2xl font-bold", isPaid ? "text-primary" : "text-danger")}>
              {t.orderNumber} {orderResult?.order_id}
            </p>
            <p className="text-default-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              {isPaid 
                ? t.successMsg 
                : (locale === "en" 
                    ? "We could not process your payment. Please try again or contact us." 
                    : "No pudimos procesar tu pago. Por favor intenta de nuevo o contáctanos.")
              }
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-8 w-full max-w-2xl px-4"
        >
          {isPaid ? (
            <>
              {/* QR Code Section for PC users */}
              <div className="bg-white/90 dark:bg-black/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-mocha-premium flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-white p-3 rounded-2xl">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getWhatsAppUrl())}`} 
                      alt="WhatsApp Order QR"
                      className="w-[180px] h-[180px]"
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-3">
                  <h4 className="text-xl font-black uppercase tracking-widest text-[#4A3728] dark:text-primary-100">
                    {locale === "en" ? "Scan to Confirm" : "Escanea para Confirmar"}
                  </h4>
                  <p className="text-default-500 text-sm leading-relaxed">
                    {locale === "en" 
                      ? "If you are on a computer without WhatsApp, scan this QR code with your phone to send the order confirmation." 
                      : "Si estás en una computadora sin WhatsApp, escanea este código QR con tu celular para enviar la confirmación."}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter justify-center md:justify-start">
                    <WhatsAppIcon size={16} />
                    {locale === "en" ? "Instant WhatsApp Message" : "Mensaje de WhatsApp Instantáneo"}
                  </div>
                </div>
              </div>

              <Button as={Link} href="/" className="w-full max-w-md btn-gold-premium h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3">
                <RefreshCcwIcon size={24} className="rotate-180" />
                {t.backToHome}
              </Button>
            </>
          ) : (
            <>
              <Button 
                onPress={() => setSubmitted(false)}
                className="w-full btn-gold-premium h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <RefreshCcwIcon size={24} />
                {locale === "en" ? "Try Again" : "Intentar de nuevo"}
              </Button>
              <Button 
                as="a" 
                href={getWhatsAppUrl()} 
                target="_blank"
                variant="flat"
                className="w-full h-16 text-lg font-bold flex items-center justify-center gap-3"
              >
                <WhatsAppIcon size={24} color="#25D366" />
                {locale === "en" ? "Help by WhatsApp" : "Ayuda por WhatsApp"}
              </Button>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  /* ── Checkout form ── */
  return (
    <div className="w-full py-12 pb-32">
      <CinematicHeader
        preTitle={locale === "en" ? "CHECKOUT PROCESS" : "PROCESO DE COMPRA"}
        title={t.title}
        subtitle={locale === "en" ? "Complete your details to enjoy the best coffee in the world." : "Completa tus datos para disfrutar del mejor café del mundo en tu hogar."}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* ─── Buyer info ─── */}
          <Card className={cardStyle}>
            <CardBody className="p-8 space-y-8">
              <h2 className={sectionTitleStyle}>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">1</div>
                {t.buyerData}
              </h2>
              <div className="flex flex-col gap-8">
                <div className={inputWrapperStyle}>
                  <label className={labelStyle}>{t.name}</label>
                  <Input isRequired variant="bordered" placeholder="Ej. Juan Pérez" name="name" className="font-medium" size="lg" radius="lg" />
                </div>
                <div className={inputWrapperStyle}>
                  <label className={labelStyle}>{t.email}</label>
                  <Input 
                    type="email" 
                    isRequired 
                    variant="bordered" 
                    placeholder="juan@email.com" 
                    name="email" 
                    size="lg" 
                    radius="lg" 
                    isInvalid={!!emailError}
                    errorMessage={emailError}
                    onValueChange={() => setEmailError("")}
                  />
                </div>
                <div className={inputWrapperStyle}>
                  <label className={labelStyle}>{t.phone}</label>
                  <Input 
                    type="tel" 
                    isRequired 
                    variant="bordered" 
                    placeholder="+57 300 000 0000" 
                    name="phone" 
                    size="lg" 
                    radius="lg" 
                    isInvalid={!!phoneError}
                    errorMessage={phoneError}
                    onValueChange={() => setPhoneError("")}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* ─── Delivery ─── */}
          <Card className={cardStyle}>
            <CardBody className="p-8 space-y-8">
              <h3 className={sectionTitleStyle}>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">2</div>
                {t.delivery}
              </h3>
              
              <RadioGroup
                value={delivery}
                onValueChange={(v) => setDelivery(v as DeliveryMethod)}
                orientation="horizontal"
                className="gap-8"
              >
                <Radio value="shipping" classNames={{ label: "font-black uppercase tracking-widest text-xs text-[#4A3728] dark:text-white" }}>{t.shipping}</Radio>
                <Radio value="pickup" classNames={{ label: "font-black uppercase tracking-widest text-xs text-[#4A3728] dark:text-white" }}>{t.pickup}</Radio>
              </RadioGroup>

              <AnimatePresence mode="wait">
                {delivery === "shipping" ? (
                  <motion.div 
                    key="shipping"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-8 sm:grid-cols-2 pt-4"
                  >
                    <div className={inputWrapperStyle}>
                      <label className={labelStyle}>{t.country}</label>
                      <Select 
                        isRequired 
                        variant="bordered" 
                        selectedKeys={[countryCode]}
                        size="lg"
                        radius="lg"
                        onSelectionChange={(keys) => {
                          const code = Array.from(keys)[0] as string;
                          if (code) {
                            setCountryCode(code);
                            const firstState = State.getStatesOfCountry(code)[0];
                            if (firstState) {
                              setStateCode(firstState.isoCode);
                              const firstCity = City.getCitiesOfState(code, firstState.isoCode)[0];
                              setCityName(firstCity ? firstCity.name : "");
                            }
                          }
                        }}
                      >
                        {allCountries.map((c) => (
                          <SelectItem key={c.isoCode} textValue={c.name}>{c.name}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className={inputWrapperStyle}>
                      <label className={labelStyle}>{t.state}</label>
                      <Select 
                        isRequired 
                        variant="bordered" 
                        selectedKeys={[stateCode]}
                        isDisabled={statesOfCountry.length === 0}
                        size="lg"
                        radius="lg"
                        onSelectionChange={(keys) => {
                          const code = Array.from(keys)[0] as string;
                          if (code) {
                            setStateCode(code);
                            const firstCity = City.getCitiesOfState(countryCode, code)[0];
                            setCityName(firstCity ? firstCity.name : "");
                          }
                        }}
                      >
                        {statesOfCountry.map((s) => (
                          <SelectItem key={s.isoCode} textValue={s.name}>{s.name}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className={inputWrapperStyle}>
                      <label className={labelStyle}>{t.city}</label>
                      <Select 
                        isRequired 
                        variant="bordered" 
                        selectedKeys={[cityName]}
                        isDisabled={citiesOfState.length === 0}
                        size="lg"
                        radius="lg"
                        onSelectionChange={(keys) => {
                          const name = Array.from(keys)[0] as string;
                          if (name) setCityName(name);
                        }}
                      >
                        {citiesOfState.map((city) => (
                          <SelectItem key={city.name} textValue={city.name}>{city.name}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className={inputWrapperStyle}>
                      <label className={labelStyle}>{t.zipCode}</label>
                      <Input isRequired variant="bordered" placeholder="410001" name="zipCode" size="lg" radius="lg" />
                    </div>

                    <div className={clsx(inputWrapperStyle, "sm:col-span-2")}>
                      <label className={labelStyle}>{t.address}</label>
                      <Input 
                        isRequired={delivery === "shipping"} 
                        variant="bordered" 
                        placeholder="Calle, Carrera, Edificio, Apto..." 
                        name="address" 
                        size="lg" 
                        radius="lg" 
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pickup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-[2rem] mt-4"
                  >
                    <p className="text-[#4A3728] dark:text-primary-100 font-medium leading-relaxed flex items-start gap-4">
                      <span className="text-3xl">📍</span> {t.pickupNote}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardBody>
          </Card>

          {/* ─── Payment ─── */}
          <Card className={cardStyle}>
            <CardBody className="p-8 space-y-6">
              <h3 className={sectionTitleStyle}>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">3</div>
                MÉTODO DE PAGO
              </h3>

              <div className="p-8 bg-primary/5 dark:bg-primary/10 border-2 border-primary/30 rounded-[2rem] flex flex-col items-center justify-center text-center gap-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-primary mb-2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="space-y-2">
                  <p className="font-black text-[#4A3728] dark:text-white uppercase tracking-widest text-lg">
                    Pago Seguro y Encriptado
                  </p>
                  <p className="text-default-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Al finalizar, serás redirigido a la pasarela oficial de Wompi (Bancolombia) donde podrás pagar de forma 100% segura con Tarjetas, PSE o Nequi.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-8">
            <Card className={clsx(cardStyle, "border-primary/20 bg-primary/[0.02] dark:bg-primary/[0.05]")}>
              <CardBody className="p-8 space-y-8">
                <h2 className={sectionTitleStyle}>
                  <ShoppingBagIcon size={20} className="text-primary" />
                  {t.orderSummary}
                </h2>

                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variant}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 bg-white dark:bg-black/20 rounded-2xl overflow-hidden border border-default-100 dark:border-white/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-[#4A3728] dark:text-white uppercase text-sm tracking-widest truncate">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-primary font-bold">{item.variant}</p>
                        )}
                        <p className="text-xs text-default-400 mt-1">Cant. {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#4A3728] dark:text-white">{fmt(item.price * item.qty)}</p>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-default-300 hover:text-danger hover:bg-danger/10 transition-all rounded-full"
                          onPress={() => removeFromCart(item.productId, item.variant)}
                        >
                          <Trash2Icon size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t-2 border-dashed border-default-100 dark:border-white/10 space-y-4">
                  <div className="flex justify-between text-default-500 font-medium">
                    <span>Subtotal</span>
                    <span>{fmt(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-black text-[#4A3728] dark:text-white uppercase tracking-widest">{t.total}</span>
                    <span className="text-4xl font-black text-primary drop-shadow-sm leading-none tracking-tight">
                      {fmt(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    isDisabled={loading}
                    className="w-full btn-gold-premium h-16 text-xl shadow-2xl flex items-center justify-center gap-3"
                  >
                    {loading ? <Spinner size="sm" color="white" /> : <CreditCardIcon size={20} />}
                    {t.pay}
                  </Button>
                  <Button
                    as={NextLink}
                    href="/productos"
                    variant="light"
                    isDisabled={loading}
                    className="w-full text-default-500 font-bold uppercase tracking-widest h-12 hover:bg-default-100"
                    startContent={<ArrowLeftIcon size={16} />}
                  >
                    {t.continueShopping}
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            <p className="text-center text-[10px] text-default-400 uppercase tracking-[0.2em] font-medium italic">
              Compra 100% segura y encriptada
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

const CreditCardIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);
