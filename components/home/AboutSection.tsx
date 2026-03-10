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
  imageSrc = ""
}: AboutSectionProps) => {
  const { dict } = useLanguage();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <section className="py-16 px-6 relative overflow-hidden bg-background">
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-trama-diffiori opacity-[0.4] dark:opacity-[0.1] pointer-events-none" />
        
        {/* Subtle background decoration - Floral/Organic hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50/40 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-xs md:text-sm uppercase text-primary font-black mb-4 block"
            >
              {dict.about.fullHistory}
            </motion.span>
            <h2 className={titleStyle({ size: "md", class: "mb-8 leading-tight text-[#4A3728] dark:text-primary-100 font-black uppercase tracking-[0.2em]" })}>
              {title}
            </h2>
            
            <div className="relative mb-12">
              {/* Decorative Quotes */}
              <span className="absolute -top-6 -left-4 text-7xl text-primary/10 font-serif pointer-events-none">&ldquo;</span>
              <p className="text-2xl md:text-3xl text-[#4A3728] dark:text-gray-300 leading-relaxed font-medium font-serif italic antialiased max-w-3xl mx-auto relative z-10 px-6">
                {description}
              </p>
              <span className="absolute -bottom-16 -right-4 text-7xl text-primary/10 font-serif rotate-180 pointer-events-none">&ldquo;</span>
            </div>
            
            {/* Subtle Divider */}
            <div className="flex justify-center gap-2 mb-10 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-8 h-[1px] bg-primary self-center" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            {/* Action Button that opens Modal */}
            <Button
              onPress={onOpen}
              size="lg"
              className="font-bold btn-gold-premium capitalize px-10 h-14 text-[#4A3728]"
              endContent={<ChevronRight size={18} />}
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
              <ModalHeader className="flex flex-col gap-2 text-center pt-8">
                <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-1 block">
                  DIFFIORI CAFÉ
                </span>
                <h3 className="text-3xl font-black font-montserrat uppercase tracking-widest text-[#4A3728] dark:text-primary-100">
                  {title}
                </h3>
                <div className="h-1 w-12 bg-primary mx-auto mt-2 rounded-full opacity-60" />
              </ModalHeader>
              <ModalBody className="py-8 px-8 md:px-12">
                <div className="prose prose-lg prose-stone dark:prose-invert max-w-none">
                  <p className="text-[#4A3728] dark:text-gray-300 font-serif font-medium italic text-xl leading-relaxed text-center mb-8">
                    &ldquo;{description}&rdquo;
                  </p>
                  
                  <div className="text-default-600 dark:text-default-400 font-light leading-relaxed whitespace-pre-line text-lg">
                    {longDescription}
                  </div>
                  
                  {/* Optional: Add an image inside the modal via props in future versions */}
                  {imageSrc && (
                    <div className="my-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/5">
                      <Image
                        src={imageSrc}
                        alt={title}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="pb-8 flex justify-center">
                <Button 
                  className="btn-gold-premium font-black uppercase tracking-widest px-12 h-14 text-[#4A3728]" 
                  onPress={onClose}
                >
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
