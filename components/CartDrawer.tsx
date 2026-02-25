"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Image,
} from "@heroui/react";
import { Trash2Icon, PlusIcon, MinusIcon } from "lucide-react";
import NextLink from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();
  const { dict } = useLanguage();
  const t = dict.cart;

  const fmt = (n: number) =>
    n.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  return (
    <Drawer size="md" isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className="text-xl font-bold">
              {t.title}
            </DrawerHeader>

            <DrawerBody className="space-y-4">
              {items.length === 0 && (
                <p className="text-default-500 text-center mt-10">
                  {t.empty}
                </p>
              )}

              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="flex gap-3 items-start border-b border-default-200 pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={72}
                    height={72}
                    className="rounded-lg object-cover h-[72px] w-[72px] flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-default-400">{item.variant}</p>
                    )}
                    <p className="text-primary-500 font-bold text-sm mt-1">
                      {fmt(item.price)}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        aria-label={t.decreaseQty}
                        onPress={() =>
                          updateQty(item.productId, item.variant, item.qty - 1)
                        }
                        isDisabled={item.qty <= 1}
                      >
                        <MinusIcon size={14} />
                      </Button>
                      <span className="font-semibold text-sm w-6 text-center">
                        {item.qty}
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        aria-label={t.increaseQty}
                        onPress={() =>
                          updateQty(item.productId, item.variant, item.qty + 1)
                        }
                      >
                        <PlusIcon size={14} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        className="ml-auto"
                        aria-label={t.remove}
                        onPress={() =>
                          removeFromCart(item.productId, item.variant)
                        }
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </DrawerBody>

            <DrawerFooter className="flex-col gap-3 pb-24 xl:pb-6">
              {items.length > 0 && (
                <>
                  <div className="w-full flex justify-between text-lg font-bold">
                    <span>{t.total}</span>
                    <span className="text-primary-500">{fmt(totalPrice)}</span>
                  </div>
                  <Button
                    as={NextLink}
                    href="/checkout"
                    color="primary"
                    fullWidth
                    size="lg"
                    radius="full"
                    onPress={onClose}
                  >
                    {t.goToCheckout}
                  </Button>
                </>
              )}
              <Button
                as={NextLink}
                href="/productos"
                variant="light"
                fullWidth
                onPress={onClose}
              >
                {t.continueShopping}
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
