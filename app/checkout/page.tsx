"use client";

import { useState } from "react";
import { Button, Input, RadioGroup, Radio, Card, CardBody, Image, Select, SelectItem } from "@heroui/react";
import NextLink from "next/link";
import {
  CreditCardIcon,
  BuildingIcon,
  WalletIcon,
  CheckCircle2Icon,
  ArrowLeftIcon,
  Trash2Icon,
} from "lucide-react";
import { title } from "@/components/primitives";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { Country, State, City } from "country-state-city";

type DeliveryMethod = "shipping" | "pickup";
type PaymentMethod = "credit" | "debit" | "pse" | "paypal";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, removeFromCart } = useCart();
  const { dict } = useLanguage();
  const t = dict.checkout;

  const [delivery, setDelivery] = useState<DeliveryMethod>("shipping");
  const [payment, setPayment] = useState<PaymentMethod>("credit");
  const [submitted, setSubmitted] = useState(false);

  /* ─── Global Cascading Address States (using country-state-city) ─── */
  const [countryCode, setCountryCode] = useState("CO"); // Default Colombia
  const [stateCode, setStateCode] = useState("HUI");   // Default Huila
  const [cityName, setCityName] = useState("Neiva");   // Default Neiva

  // Derived lists
  const allCountries = Country.getAllCountries();
  const statesOfCountry = State.getStatesOfCountry(countryCode);
  const citiesOfState = City.getCitiesOfState(countryCode, stateCode);

  const fmt = (n: number) =>
    n.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  /* ── Empty cart ── */
  if (items.length === 0 && !submitted) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-xl text-default-500">{t.emptyCart}</p>
        <Button as={NextLink} href="/productos" color="primary" radius="full" size="lg">
          {t.goToShop}
        </Button>
      </div>
    );
  }

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="text-center py-20 space-y-6">
        <CheckCircle2Icon size={64} className="mx-auto text-primary-500" />
        <h2 className="text-3xl font-bold">{t.successTitle}</h2>
        <p className="text-default-500 max-w-md mx-auto">{t.successMsg}</p>
        <Button as={NextLink} href="/" color="primary" radius="full" size="lg">
          {t.backToHome}
        </Button>
      </div>
    );
  }

  /* ── Checkout form ── */
  return (
    <>
      <h1 className={title({ class: "mb-8 text-center block" })}>{t.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ─── Buyer info ─── */}
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">{t.buyerData}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label={t.name} isRequired variant="bordered" name="name" />
              <Input label={t.email} type="email" isRequired variant="bordered" name="email" />
              <Input label={t.phone} type="tel" isRequired variant="bordered" name="phone" />
            </div>
          </CardBody>
        </Card>

        {/* ─── Delivery ─── */}
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">{t.delivery}</h2>
            <RadioGroup
              value={delivery}
              onValueChange={(v) => setDelivery(v as DeliveryMethod)}
              orientation="horizontal"
            >
              <Radio value="shipping">{t.shipping}</Radio>
              <Radio value="pickup">{t.pickup}</Radio>
            </RadioGroup>

            {delivery === "shipping" ? (
              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                {/* --- Country Select --- */}
                <Select 
                  label={t.country} 
                  isRequired 
                  variant="bordered" 
                  name="country" 
                  selectedKeys={[countryCode]}
                  onSelectionChange={(keys) => {
                    const code = Array.from(keys)[0] as string;
                    if (code) {
                      setCountryCode(code);
                      // Reset state and city
                      const firstState = State.getStatesOfCountry(code)[0];
                      if (firstState) {
                        setStateCode(firstState.isoCode);
                        const firstCity = City.getCitiesOfState(code, firstState.isoCode)[0];
                        setCityName(firstCity ? firstCity.name : "");
                      } else {
                        setStateCode("");
                        setCityName("");
                      }
                    }
                  }}
                >
                  {allCountries.map((c) => (
                    <SelectItem key={c.isoCode} textValue={c.name}>{c.name}</SelectItem>
                  ))}
                </Select>

                {/* --- State / Province --- */}
                <Select 
                  label={t.state} 
                  isRequired 
                  variant="bordered" 
                  name="state"
                  selectedKeys={[stateCode]}
                  isDisabled={statesOfCountry.length === 0}
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

                {/* --- City --- */}
                <Select 
                  label={t.city} 
                  isRequired 
                  variant="bordered" 
                  name="city"
                  selectedKeys={[cityName]}
                  isDisabled={citiesOfState.length === 0}
                  onSelectionChange={(keys) => {
                    const name = Array.from(keys)[0] as string;
                    if (name) setCityName(name);
                  }}
                >
                  {citiesOfState.map((city) => (
                    <SelectItem key={city.name} textValue={city.name}>{city.name}</SelectItem>
                  ))}
                </Select>

                <Input label={t.zipCode} isRequired variant="bordered" name="zipCode" />
                <Input label={t.address} isRequired variant="bordered" className="sm:col-span-2" name="address" />
              </div>
            ) : (
              <p className="text-sm text-default-500 mt-2 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                📍 {t.pickupNote}
              </p>
            )}
          </CardBody>
        </Card>

        {/* ─── Order Summary ─── */}
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">{t.orderSummary}</h2>

            <div className="divide-y divide-default-200">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="flex items-center gap-3 py-3"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover h-12 w-12 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-default-400">{item.variant}</p>
                    )}
                  </div>
                  <span className="text-sm text-default-500">×{item.qty}</span>
                  <span className="font-bold text-sm w-24 text-right">
                    {fmt(item.price * item.qty)}
                  </span>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    aria-label={t.remove}
                    onPress={() => removeFromCart(item.productId, item.variant)}
                  >
                    <Trash2Icon size={14} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-lg font-bold pt-2 border-t border-default-200">
              <span>{t.total}</span>
              <span className="text-primary-500">{fmt(totalPrice)}</span>
            </div>
          </CardBody>
        </Card>

        {/* ─── Payment ─── */}
        <Card>
          <CardBody className="space-y-4">
            <h2 className="text-xl font-bold">{t.paymentMethod}</h2>

            <RadioGroup
              value={payment}
              onValueChange={(v) => setPayment(v as PaymentMethod)}
              className="gap-3"
            >
              <Radio
                value="credit"
                description={t.creditCardDesc}
                classNames={{ label: "flex items-center gap-2" }}
              >
                <span className="flex items-center gap-2">
                  <CreditCardIcon size={18} /> {t.creditCard}
                </span>
              </Radio>
              <Radio
                value="debit"
                description={t.debitCardDesc}
                classNames={{ label: "flex items-center gap-2" }}
              >
                <span className="flex items-center gap-2">
                  <CreditCardIcon size={18} /> {t.debitCard}
                </span>
              </Radio>
              <Radio
                value="pse"
                description={t.pseDesc}
                classNames={{ label: "flex items-center gap-2" }}
              >
                <span className="flex items-center gap-2">
                  <BuildingIcon size={18} /> {t.pse}
                </span>
              </Radio>
              <Radio
                value="paypal"
                description={t.paypalDesc}
                classNames={{ label: "flex items-center gap-2" }}
              >
                <span className="flex items-center gap-2">
                  <WalletIcon size={18} /> {t.paypal}
                </span>
              </Radio>
            </RadioGroup>

            {/* Detailed Payment Forms */}
            <div className="mt-6 p-4 bg-default-50 rounded-xl border border-default-200">
              {payment === "credit" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label={t.cardNumber} isRequired variant="flat" name="card_number" className="sm:col-span-2" />
                  <Input label={t.cardName} isRequired variant="flat" name="card_name" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input label="MM/YY" isRequired variant="flat" name="card_expiry" />
                    <Input label={t.cvv} isRequired variant="flat" name="card_cvv" type="password" maxLength={4} />
                  </div>
                  <Select label={t.installments} isRequired variant="flat" name="installments" defaultSelectedKeys={["1"]}>
                    {[1, 3, 6, 12, 24, 36].map((n) => (
                      <SelectItem key={n.toString()}>
                        {n} {n === 1 ? t.installment : t.installmentsPlural}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              )}

              {payment === "debit" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label={t.cardNumber} isRequired variant="flat" name="debit_number" className="sm:col-span-2" />
                  <Input label={t.cardName} isRequired variant="flat" name="debit_name" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input label="MM/YY" isRequired variant="flat" name="debit_expiry" />
                    <Input label={t.cvv} isRequired variant="flat" name="debit_cvv" type="password" />
                  </div>
                </div>
              )}

              {payment === "pse" && (
                <div className="space-y-4">
                  <p className="text-sm text-default-500">{t.pseRedirect}</p>
                  <Input label={t.bankEmail} isRequired type="email" variant="flat" name="pse_email" />
                </div>
              )}

              {payment === "paypal" && (
                <div className="text-center py-4 space-y-2">
                  <p className="text-sm text-default-500">{t.paypalRedirect}</p>
                  <div className="bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-lg inline-block">PayPal Checkout</div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* ─── Submit ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            as={NextLink}
            href="/productos"
            variant="bordered"
            radius="full"
            size="lg"
            startContent={<ArrowLeftIcon size={16} />}
            className="sm:w-auto"
          >
            {t.continueShopping}
          </Button>
          <Button
            type="submit"
            color="primary"
            radius="full"
            size="lg"
            className="flex-1 font-bold text-lg"
          >
            {t.pay} — {fmt(totalPrice)}
          </Button>
        </div>
      </form>
    </>
  );
}
