import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"

export default function Section({
  id, title, subtitle, content, bgImage,
  items, itemsLabel,
  flowSteps, schemeBoxes, schemeLabel,
  participants,
  showButton, buttonText, onButtonClick,
}: SectionProps) {
  return (
    <section
      id={id}
      className="relative h-screen w-full snap-start flex flex-col justify-center overflow-hidden"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Background image */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.18)',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex h-full">
        {/* Left content pane */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 w-full lg:w-1/2">
          {subtitle && <div className="mb-5">{subtitle}</div>}

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
            {title}
          </h2>

          {content && (
            <p className="text-base md:text-lg max-w-lg mt-5 text-neutral-400 leading-relaxed">
              {content}
            </p>
          )}

          {itemsLabel && (
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              {itemsLabel}
            </p>
          )}

          {items && items.length > 0 && (
            <ul className="mt-3 space-y-2 max-w-lg">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-neutral-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF4D00] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {showButton && (
            <div className="mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={onButtonClick}
                className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors gap-2"
              >
                <Icon name="Presentation" size={16} />
                {buttonText}
              </Button>
            </div>
          )}
        </div>

        {/* Right visual pane */}
        {(flowSteps || schemeBoxes || participants) && (
          <div className="hidden lg:flex flex-col justify-center items-center w-1/2 px-10 py-12">
            {/* Flow diagram */}
            {flowSteps && (
              <div className="w-full max-w-sm">
                {schemeLabel && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 text-center">
                    {schemeLabel}
                  </p>
                )}
                <div className="flex flex-col items-center gap-0">
                  {flowSteps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center w-full">
                      <div
                        className={`w-full px-5 py-3 rounded border text-sm font-semibold text-center ${
                          step.label.startsWith('→') || step.label.includes('Реплики')
                            ? 'border-[#FF4D00]/50 text-[#FF4D00] bg-[#FF4D00]/8'
                            : 'border-white/20 text-white bg-white/5'
                        }`}
                      >
                        {step.label}
                        {step.sub && (
                          <div className="text-[11px] font-normal text-neutral-500 mt-0.5">{step.sub}</div>
                        )}
                      </div>
                      {i < flowSteps.length - 1 && (
                        <div className="flex flex-col items-center my-0.5">
                          <div className="w-px h-3 bg-neutral-700" />
                          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-neutral-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scheme boxes grid */}
            {schemeBoxes && !flowSteps && (
              <div className="w-full max-w-md">
                {schemeLabel && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 text-center">
                    {schemeLabel}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {schemeBoxes.map((box, i) => (
                    <div
                      key={i}
                      className={`px-4 py-4 rounded border text-sm ${
                        box.accent
                          ? 'border-[#FF4D00]/60 bg-[#FF4D00]/10 text-[#FF4D00]'
                          : 'border-white/15 bg-white/5 text-neutral-300'
                      }`}
                    >
                      <div className="font-semibold leading-tight">{box.label}</div>
                      {box.sub && <div className="text-[11px] text-neutral-500 mt-1">{box.sub}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participants table */}
            {participants && (
              <div className="w-full max-w-sm">
                {schemeLabel && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 text-center">
                    {schemeLabel}
                  </p>
                )}
                <div className="rounded border border-white/15 overflow-hidden text-sm">
                  <div className="grid grid-cols-[1fr_auto] bg-white/8 px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Участник</span>
                    <span>Право</span>
                  </div>
                  {participants.map((p, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[1fr_auto] px-4 py-2.5 border-t border-white/8 ${
                        i % 2 === 0 ? 'bg-white/3' : ''
                      }`}
                    >
                      <span className="text-neutral-300 text-sm">{p.role}</span>
                      <span className={p.can ? 'text-[#FF4D00] font-bold text-sm' : 'text-neutral-600 text-sm'}>
                        {p.can ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
