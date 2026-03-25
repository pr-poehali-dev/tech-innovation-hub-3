import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"

export default function Section({ id, title, subtitle, content, paragraphs, items, itemsLabel, isActive, showButton, buttonText, onButtonClick }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24" style={{ fontFamily: 'Arial, sans-serif' }}>
      {subtitle && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}

      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        style={{ fontFamily: 'Arial, sans-serif' }}
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      {content && (
        <motion.p
          className="text-lg md:text-xl max-w-2xl mt-5 text-neutral-400"
          style={{ fontFamily: 'Arial, sans-serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {content}
        </motion.p>
      )}

      {paragraphs && paragraphs.length > 0 && (
        <motion.div
          className="mt-5 space-y-2 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-neutral-400" style={{ fontFamily: 'Arial, sans-serif' }}>
              {p}
            </p>
          ))}
        </motion.div>
      )}

      {itemsLabel && (
        <motion.p
          className="mt-5 text-xs font-bold uppercase tracking-widest text-neutral-500"
          style={{ fontFamily: 'Arial, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {itemsLabel}
        </motion.p>
      )}

      {items && items.length > 0 && (
        <motion.ul
          className="mt-3 space-y-2 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {items.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm md:text-base text-neutral-300"
              style={{ fontFamily: 'Arial, sans-serif' }}
              initial={{ opacity: 0, x: -16 }}
              animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF4D00] flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onButtonClick}
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors gap-2"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <Icon name="Presentation" size={16} />
            {buttonText}
          </Button>
        </motion.div>
      )}
    </section>
  )
}
