"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { getOrderStatus, verifyPayment } from "@/lib/api";
import { WhatsAppIcon } from "@/components/icons";

type OrderStatus = "PENDING" | "PAID" | "FAILED" | "CANCELED" | "SHIPPED" | "DELIVERED";

interface OrderData {
  order_id: number;
  status: OrderStatus;
  total_amount: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  shipping_address: string;
}

function CheckoutReturnContent() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const wompiTxId = searchParams.get("id");

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const fmt = (n: number) =>
    n.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  const fetchStatus = useCallback(async () => {
    if (!orderId) {
      setError(locale === "en" ? "No order ID found in URL." : "No se encontró el ID del pedido en la URL.");
      setLoading(false);
      return;
    }
    try {
      // Si Wompi devolvió el ID de transacción en la URL, verificamos directamente
      let data;
      if (wompiTxId && wompiTxId !== "undefined") {
        data = await verifyPayment(orderId, wompiTxId);
      } else {
        data = await getOrderStatus(orderId);
      }
      setOrderData(data as OrderData);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(locale === "en" ? "Error fetching order status." : "Error al obtener el estado del pedido.");
      setLoading(false);
    }
  }, [orderId, wompiTxId, locale]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Poll every 3s up to 10 times while status is PENDING
  useEffect(() => {
    if (!orderData) return;
    if (orderData.status === "PENDING" && pollCount < 10) {
      const timer = setTimeout(() => {
        setPollCount((prev) => prev + 1);
        fetchStatus();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [orderData, pollCount, fetchStatus]);

  const buildWhatsAppUrl = (data: OrderData) => {
    const totalVal = Number(data.total_amount) || 0;
    const totalStr = fmt(totalVal);
    const isPickup = data.shipping_address?.includes("Recogida en tienda");

    let message = locale === "en"
      ? `☕ *NEW ORDER - DIFFIORI CAFÉ*\n\n`
      : `☕ *NUEVO PEDIDO - DIFFIORI CAFÉ*\n\n`;

    message += `📄 *${locale === "en" ? "Order #" : "Pedido #"}:* ${data.order_id}\n`;
    message += `💰 *${locale === "en" ? "PAID AMOUNT" : "VALOR PAGADO"}:* ${totalStr}\n\n`;
    message += `👤 *${locale === "en" ? "CUSTOMER DATA" : "DATOS DEL CLIENTE"}:*\n`;
    message += `• *${locale === "en" ? "Name" : "Nombre"}:* ${data.contact_name}\n`;
    message += `• *Email:* ${data.contact_email}\n`;
    message += `• *${locale === "en" ? "Phone" : "Teléfono"}:* ${data.contact_phone}\n\n`;

    if (isPickup) {
      message += `📍 *${locale === "en" ? "DELIVERY" : "ENTREGA"}:* ${locale === "en" ? "Pick up in store" : "Recoger en Tienda"}\n`;
      message += `🏠 *Ubicación:* Cl. 17 Sur #1-37, Pitalito – Huila\n\n`;
    } else {
      message += `📍 *${locale === "en" ? "DELIVERY" : "ENTREGA"}:* ${locale === "en" ? "Home delivery" : "Envío a Domicilio"}\n`;
      message += `🚚 *${locale === "en" ? "Address" : "Dirección"}:* ${data.shipping_address}\n\n`;
    }

    message += `\n*${locale === "en" ? "Purchased at" : "Comprado desde"} www.diffiorecafe.com*`;

    return `https://wa.me/573227560973?text=${encodeURIComponent(message)}`;
  };

  /* ── Loading / Polling ── */
  if (loading || (orderData?.status === "PENDING" && pollCount < 10)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-6 text-center">
        <Spinner size="lg" color="primary" />
        <div className="space-y-3">
          <h2 className="text-2xl font-black uppercase tracking-widest text-[#4A3728] dark:text-white">
            {locale === "en" ? "Confirming your payment..." : "Confirmando tu pago..."}
          </h2>
          <p className="text-default-500 font-medium">
            {locale === "en"
              ? "Please wait while we verify the transaction with Wompi."
              : "Por favor espera mientras verificamos la transacción con Wompi."}
          </p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-6 text-center">
        <div className="p-10 rounded-full bg-danger/10 text-danger">
          <XCircleIcon size={80} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#4A3728] dark:text-white">
          {locale === "en" ? "Something went wrong" : "Algo salió mal"}
        </h2>
        <p className="text-default-500">{error}</p>
        <Button as={Link} href="/checkout" className="btn-gold-premium px-10 h-12">
          {locale === "en" ? "Return to checkout" : "Volver al checkout"}
        </Button>
      </div>
    );
  }

  const isPaid    = orderData.status === "PAID";
  const isPending = orderData.status === "PENDING";
  const waUrl     = buildWhatsAppUrl(orderData);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center space-y-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={clsx(
          "p-10 rounded-full",
          isPaid    ? "bg-primary/10 text-primary"  :
          isPending ? "bg-warning/10 text-warning"  :
                      "bg-danger/10 text-danger"
        )}
      >
        {isPaid    ? <CheckCircle2Icon size={100} strokeWidth={1.5} /> :
         isPending ? <ClockIcon        size={100} strokeWidth={1.5} /> :
                     <XCircleIcon      size={100} strokeWidth={1.5} />}
      </motion.div>

      <div className="space-y-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-[#4A3728] dark:text-primary-100"
        >
          {isPaid    ? (locale === "en" ? "Payment Successful!" : "¡Pago Exitoso!")  :
           isPending ? (locale === "en" ? "Payment Pending"    : "Pago Pendiente")  :
                       (locale === "en" ? "Payment Failed"     : "Pago Fallido")}
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <p className={clsx(
            "text-2xl font-bold",
            isPaid ? "text-primary" : isPending ? "text-warning" : "text-danger"
          )}>
            {locale === "en" ? "Order #" : "Pedido #"}{orderData.order_id}
          </p>
          <p className="text-default-500 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {isPaid
              ? (locale === "en"
                  ? "Thank you for your purchase! We will contact you soon to confirm your order."
                  : "¡Gracias por tu compra! Te contactaremos pronto para confirmar tu pedido.")
              : isPending
              ? (locale === "en"
                  ? "Your payment is still being processed. You will receive an email when confirmed."
                  : "Tu pago aún está siendo procesado. Recibirás un email cuando sea confirmado.")
              : (locale === "en"
                  ? "We could not process your payment. Please try again or contact us."
                  : "No pudimos procesar tu pago. Por favor intenta de nuevo o contáctanos.")}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center gap-6 w-full max-w-2xl px-4"
      >
        {isPaid && (
          <div className="bg-white/90 dark:bg-black/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-mocha-premium flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-white p-3 rounded-2xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waUrl)}`}
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
                  ? "Scan this QR with your phone to send the order confirmation via WhatsApp."
                  : "Escanea este QR con tu celular para enviar la confirmación del pedido por WhatsApp."}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter justify-center md:justify-start">
                <WhatsAppIcon size={16} />
                {locale === "en" ? "Instant WhatsApp Message" : "Mensaje de WhatsApp Instantáneo"}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full max-w-md">
          {isPaid && (
            <Button
              as="a"
              href={waUrl}
              target="_blank"
              className="w-full h-14 font-bold text-lg flex items-center justify-center gap-3 bg-[#25D366] text-white rounded-2xl"
            >
              <WhatsAppIcon size={22} color="white" />
              {locale === "en" ? "Confirm via WhatsApp" : "Confirmar por WhatsApp"}
            </Button>
          )}

          {!isPaid && !isPending && (
            <Button
              as={Link}
              href="/checkout"
              className="w-full btn-gold-premium h-14 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3"
            >
              <RefreshCcwIcon size={22} />
              {locale === "en" ? "Try Again" : "Intentar de nuevo"}
            </Button>
          )}

          <Button
            as={Link}
            href="/"
            variant={isPaid ? "flat" : "light"}
            className="w-full h-12 font-bold uppercase tracking-widest text-default-500"
          >
            {locale === "en" ? "Back to home" : "Volver al inicio"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutReturnPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
        <Spinner size="lg" color="primary" />
      </div>
    }>
      <CheckoutReturnContent />
    </Suspense>
  );
}
