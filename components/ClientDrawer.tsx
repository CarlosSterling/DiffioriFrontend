// components/ClientDrawer.tsx
"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  Button,
} from "@heroui/react";
import type { Client } from "@/types/api";

export default function ClientDrawer({
  client,
  open,
  onClose,
}: {
  client: Client;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={open} size="xl" onClose={onClose}>
      <DrawerContent>
        {(close) => (
          <>
            <DrawerHeader>{client.name}</DrawerHeader>

            <DrawerBody className="space-y-6 overflow-y-auto">
              {!!client.gallery.length && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {client.gallery.map((img) => (
                    <Image
                      key={img.id}
                      alt={img.alt ?? client.name}
                      src={img.image}
                      className="aspect-video object-cover rounded-lg"
                      width={600}
                      height={400}
                    />
                  ))}
                </div>
              )}

              <p className="whitespace-pre-line">{client.testimonial}</p>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="light" color="danger" onPress={close}>
                Cerrar
              </Button>
              <Button as="a" href="/contact" color="primary">
                Cotizar
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
