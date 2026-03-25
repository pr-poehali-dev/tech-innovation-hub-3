import { useEffect, useRef, useState } from 'react'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'
import { exportToPdf } from '@/lib/exportPdf'
import { exportToPptx } from '@/lib/exportPptx'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        setActiveSection(Math.floor(scrollPosition / windowHeight))
      }
    }
    const container = containerRef.current
    if (container) container.addEventListener('scroll', handleScroll)
    return () => { if (container) container.removeEventListener('scroll', handleScroll) }
  }, [])

  const handleNavClick = (index: number) => {
    containerRef.current?.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })
  }

  return (
    <Layout>
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-2.5 h-2.5 rounded-full my-1.5 transition-all ${
              index === activeSection ? 'bg-[#FF4D00] scale-125' : 'bg-neutral-700 hover:bg-neutral-500'
            }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>

      <div className="fixed bottom-6 left-8 z-30 flex gap-3" style={{ fontFamily: 'Arial, sans-serif' }}>
        <Button
          onClick={exportToPdf}
          variant="outline"
          size="sm"
          className="text-white bg-transparent border-white/20 hover:bg-white hover:text-black transition-colors gap-2"
        >
          <Icon name="Download" size={14} />
          Скачать PDF
        </Button>
        <Button
          onClick={exportToPptx}
          variant="outline"
          size="sm"
          className="text-[#FF4D00] bg-transparent border-[#FF4D00]/40 hover:bg-[#FF4D00] hover:text-black transition-colors gap-2"
        >
          <Icon name="Presentation" size={14} />
          Скачать PPTX
        </Button>
      </div>

      <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory">
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
            onButtonClick={exportToPptx}
          />
        ))}
      </div>
    </Layout>
  )
}
