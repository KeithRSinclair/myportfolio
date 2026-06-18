import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroAvatar from "./HeroAvatar";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const firstName = "Keith";
  const lastName = "Sinclair";
  const tagline = "Creative 3D Developer";

  const renderLetters = (name, key) =>
    name.split("").map((letter, index) => (
      <span
        key={`${key}-${index}`}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 1.5,
          transformOrigin: "left top",
          stagger: {
            each: 0.075,
            from: "start",
          },
        },
      ).fromTo(
        ".job-title",
        { y: 30, opacity: 0, scale: 1.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "elastic.out(1, 0.3)",
          scale: 1,
        },
        "-=0.8",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center lg:mb-12 -translate-y-10">
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold leading-none tracking-tight">
              {/* Mobile Heading */}
              <div className="md:hidden text-5xl text-center">
                <span className="text-slate-400">
                  {renderLetters(firstName, "first")}
                </span>{" "}
                <span className="text-slate-600">
                  {renderLetters(lastName, "last")}
                </span>
              </div>

              {/* Desktop Heading */}
              <div className="hidden md:block text-[clamp(3rem,6vw,5.5rem)] text-center">
                <span className="inline-block text-slate-400 mr-4">
                  {renderLetters(firstName, "first")}
                </span>
                <span className="inline-block text-slate-600">
                  {renderLetters(lastName, "last")}
                </span>
              </div>
            </h1>

            <span
              className="job-title mt-4 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.2em] opacity-0"
              style={{
                background: "linear-gradient(90deg,#38bdf8,#a855f7,#f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {tagline}
            </span>
          </div>
        </div>

        {/* Outer Grid Layout Layout Wrapper */}
        <div className="grid gap-6 lg:grid-cols-12 items-center -mt-12 max-h-screen landscape:grid-cols-2 landscape:gap-2 lg:landscape:grid-cols-12">
          {/* Avatar Area: Full screen row on mobile, Left 7-columns wide space on Desktop */}
          <div className="w-full h-[45vh] sm:h-[50vh] lg:h-[60vh] lg:col-span-7 relative">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full h-full hero-3d-layout">
                <HeroAvatar />
              </div>
              <div className="w-full flex justify-center items-center hero-button">
                <button
                onClick={() => navigate("/contact")}
                className="absolute ml-2 lg:ml-6 md:ml-0 left-1/2 lg:left-1/4 md:left-1/2 -translate-x-1/2 bottom-0 md:bottom-8 lg:bottom-32 xl:bottom-24 z-50 px-8 py-3 rounded-xl font-semibold text-black shadow-[0_0_12px_rgba(255,255,255,0.8)]  lg:landscape:bottom-20 hover:scale-110"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(56, 189, 248), rgb(168, 85, 247), rgb(244, 114, 182))",
                }}
              >
                Contact Me
              </button>
              </div>
              
            </div>
          </div>

          {/* Tech Grid Area: Full screen row on mobile, Right 5-columns wide space on Desktop */}
          <div className="w-full lg:col-span-5 space-y-6 mt-2">
            <h3 className="text-xl font-bold text-slate-200 uppercase tracking-wider text-center lg:text-left">
              Core Tech Stack
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {/* Card 1: Blender */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c-3.03 0-5.5-2.47-5.5-5.5s2.47-5.5 5.5-5.5 5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      Blender
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-orange-500/80 font-bold">
                      Modeling & Pipeline Optimization
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Low-poly asset generation, UV packing, texture baking, and
                      custom glTF compression to ensure rapid loading.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: React */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 animate-[spin_20s_linear_infinite]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <ellipse
                        rx="10"
                        ry="4.5"
                        cx="12"
                        cy="12"
                        transform="rotate(0 12 12)"
                      />
                      <ellipse
                        rx="10"
                        ry="4.5"
                        cx="12"
                        cy="12"
                        transform="rotate(60 12 12)"
                      />
                      <ellipse
                        rx="10"
                        ry="4.5"
                        cx="12"
                        cy="12"
                        transform="rotate(120 12 12)"
                      />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors duration-300">
                      React
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-sky-500/80 font-bold">
                      Component Architecture
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Building modular UI overlay systems, accessible custom web
                      controls, state hydration, and reactive event flows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Three.js / Fiber */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2L2 22h20L12 2zm0 4.8L18.4 19H5.6L12 6.8z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                      Three.js / R3F
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-indigo-500/80 font-bold">
                      Rendering & Custom Shaders
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Real-time rendering, custom GLSL shaders, camera controls,
                      post-processing stacks, and GPU instantiation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Unity */}
              <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm8 6.5v7l-8 4.4-8-4.4v-7l8-4.4 8 4.4z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                      Unity
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-pink-500/80 font-bold">
                      Logic & Complex Mechanics
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2">
                      Adapting state machine behaviors, complex physics
                      integration, game-logic structures, and WebGL export
                      practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
