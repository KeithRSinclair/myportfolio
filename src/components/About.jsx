export default function About() {
  return (
    <section id="about" className="bg-slate-950 text-slate-100 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-400">About Me</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Professional Software Developer
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <article className="space-y-6 text-slate-300">
            <div>
              <h3 className="text-2xl font-semibold text-white">Who I Am</h3>
              <p className="mt-4 leading-8">
                I build thoughtful, maintainable applications with a focus on clean code and efficient user experiences. I enjoy solving complex problems by breaking them into clear, scalable solutions that deliver value quickly.
              </p>
              <p className="mt-4 leading-8">
                My work blends technical discipline with collaboration, making sure projects are both robust and easy to evolve over time. I approach each challenge with a strong sense of ownership and a drive to create polished digital products.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white">My Journey</h3>
              <p className="mt-4 leading-8">
                I transitioned into development after discovering how exciting it is to turn ideas into real software. From early prototype concepts to polished deployments, I’ve built experience across product-focused teams, learning to adapt quickly and keep the user at the center.
              </p>
            </div>
          </article>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.55)]">
            <h3 className="text-2xl font-semibold text-white">Tech Stack</h3>
            <div className="mt-6 space-y-6 text-slate-300">
              <div>
                <h4 className="text-lg font-semibold text-white">Frontend</h4>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>React / JSX</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive UI design</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white">Backend</h4>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>Node.js / Express</li>
                  <li>REST APIs</li>
                  <li>Database integration</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white">Tools</h4>
                <ul className="mt-3 list-disc list-inside space-y-1">
                  <li>Git / GitHub</li>
                  <li>Vite / Build tooling</li>
                  <li>Testing & CI workflows</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
