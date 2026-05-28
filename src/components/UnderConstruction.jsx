import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const text = 'UNDER CONSTRUCTION'

export default function UnderConstruction() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.construction-letter')

      gsap.from(letters, {
        opacity: 0,
        y: 40,
        duration: 2.1,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-start pt-10 sm:pt-16 bg-slate-950 px-4 text-blue-400"
    >
      <div className="max-w-full w-full text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-4">
          Website is currently
        </p>
        <h1 className="w-full text-4xl sm:text-4xl md:text-7xl font-extrabold tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.3em] leading-none whitespace-normal sm:whitespace-nowrap">
          <span className="inline-flex">
            {'UNDER'.split('').map((char, index) => (
              <span key={`u-${index}`} className="inline-block construction-letter">
                {char}
              </span>
            ))}
          </span>
          <span className="block sm:inline-block md:ml-8">
            {'CONSTRUCTION'.split('').map((char, index) => (
              <span key={`c-${index}`} className="inline-block construction-letter">
                {char}
              </span>
            ))}
          </span>
        </h1>
        <p className="mt-6 text-base md:text-xl text-slate-300 max-w-2xl mx-auto">
          This portfolio is currently being built.
        </p>
      </div>
    </section>
  )
}
