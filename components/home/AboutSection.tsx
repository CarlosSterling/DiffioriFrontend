import { 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure, 
  Image
} from "@heroui/react";
import { motion } from "framer-motion";
import { title as titleStyle } from "@/components/primitives";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface AboutSectionProps {
  title: string;
  description: string;
  longDescription?: string; // Content for the modal
  ctaText?: string;
  imageSrc?: string;
}

export const AboutSection = ({
  title,
  description,
  longDescription,
  ctaText,
  imageSrc = "/coffee-farm-huila-hero.png"
}: AboutSectionProps) => {
  const { dict } = useLanguage();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <section className="py-24 px-6 relative overflow-hidden bg-background">
        {/* Subtle background decoration - Floral/Organic hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50/40 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            
            <h2 className={titleStyle({ size: "sm", class: "mb-8 leading-tight text-primary" })}>
              {title}
            </h2>
            
            <p className="text-xl md:text-2xl text-default-600 mb-10 leading-relaxed font-light font-serif italic antialiased max-w-2xl mx-auto">
              &ldquo;{description}&rdquo;
            </p>
            
            {/* Action Button that opens Modal */}
            <Button
              onPress={onOpen}
              size="lg"
              variant="flat"
              color="primary"
              className="font-medium bg-primary-100/50 hover:bg-primary-100 text-primary capitalize"
              endContent={<ChevronRight size={16} />}
            >
              {ctaText || dict.productos.seeMore}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        classNames={{
          base: "bg-background/90 backdrop-blur-md border border-white/20 shadow-2xl",
          header: "border-b border-white/10",
          footer: "border-t border-white/10",
          closeButton: "hover:bg-white/10 active:bg-white/20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold font-display text-primary-900">{title}</h3>
                <p className="text-small text-default-500 uppercase tracking-wider">{dict.about.fullHistory}</p>
              </ModalHeader>
              <ModalBody className="py-8">
                <div className="prose prose-lg prose-stone max-w-none text-default-600 font-light leading-relaxed whitespace-pre-line">
                  {longDescription}
                  
                  {/* Optional: Add an image inside the modal via props in future versions */}
                  <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={imageSrc}
                      alt={title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {dict.about.close}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {dict.about.understood}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
