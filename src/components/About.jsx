export default function About() {
  return (
    <section id="about" className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-sky-400 font-bold">About Me</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-white">
            Creative 3D Developer
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Bridging high-fidelity art and high-performance code to engineer interactive web experiences.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Narrative Strategy Left Side */}
          <article className="lg:col-span-7 space-y-8 text-slate-300">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-sky-500 rounded-full"></span>
                The Vision
              </h3>
              <p className="leading-relaxed text-slate-300 text-[1.05rem]">
                I specialize in solving complex visual and performance problems for the real-time web. 
                Instead of treating 3D as a decorative layer, I treat it as an interactive interface—engineering 
                solutions that optimize asset size, minimize draw calls, and implement custom shaders without 
                sacrificing browser performance.
              </p>
              <p className="leading-relaxed text-slate-300 text-[1.05rem]">
                My development process bridges the gap between artistic vision and production-grade code. By 
                understanding the limits of GPU execution, memory consumption, and layout systems, I deliver 
                highly polished experiences that run smoothly across both flagship desktop rigs and low-end mobile devices.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                Integrated Pipeline
              </h3>
              <p className="leading-relaxed text-slate-300 text-[1.05rem]">
                A premium 3D web experience requires a unified technical workflow. I use <strong className="text-white font-semibold">Blender</strong> for 
                optimized asset generation and pipeline workflows, which I render in <strong className="text-white font-semibold">React</strong> using <strong className="text-white font-semibold">Three.js / React Three Fiber</strong> for 
                seamless interface control and web performance, while leveraging design patterns inspired by <strong className="text-white font-semibold">Unity</strong> to implement sophisticated interactive logic and physics.
              </p>
            </div>
          </article>

          {/* Grid / Modular Technology Stack Right Side */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-slate-200 uppercase tracking-wider text-center lg:text-left">
              Core Tech Stack
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              
              {/* Card 1: Blender */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {/* Stylized Blender eye icon */}
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c-3.03 0-5.5-2.47-5.5-5.5s2.47-5.5 5.5-5.5 5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300">Blender</h4>
                    <p className="text-xs uppercase tracking-widest text-orange-500/80 font-bold">Modeling & Pipeline Optimization</p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Low-poly asset generation, UV packing, texture baking, and custom glTF compression to ensure rapid loading.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: React */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      {/* Stylized React atom icon */}
                      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
                      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
                      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors duration-300">React</h4>
                    <p className="text-xs uppercase tracking-widest text-sky-500/80 font-bold">Component Architecture</p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Building modular UI overlay systems, accessible custom web controls, state hydration, and reactive event flows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Three.js / Fiber */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {/* Stylized 3D Prism/Triangle icon */}
                      <path d="M12 2L2 22h20L12 2zm0 4.8L18.4 19H5.6L12 6.8z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">Three.js / R3F</h4>
                    <p className="text-xs uppercase tracking-widest text-indigo-500/80 font-bold">Rendering & Custom Shaders</p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Real-time rendering, custom GLSL shaders, camera controls, post-processing stacks, and GPU instantiation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Unity */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {/* Stylized Unity Cube / Polygon Icon */}
                      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm8 6.5v7l-8 4.4-8-4.4v-7l8-4.4 8 4.4z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors duration-300">Unity</h4>
                    <p className="text-xs uppercase tracking-widest text-pink-500/80 font-bold">Logic & Complex Mechanics</p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Adapting state machine behaviors, complex physics integration, game-logic structures, and WebGL export practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
