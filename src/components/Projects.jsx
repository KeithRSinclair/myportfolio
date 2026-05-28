export default function Projects() {
  return (
    <section id="projects" className="bg-slate-950 text-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Projects</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Selected Work
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.45)]">
            <h3 className="text-xl font-semibold text-white">E-commerce Dashboard</h3>
            <p className="mt-4 text-slate-300 leading-7">
              A responsive analytics dashboard that helps teams monitor sales, inventory, and customer behavior in real time. It solves the need for a central place to track performance and act on data quickly.
            </p>
            <div className="mt-5 space-y-3 text-slate-300">
              <p className="font-medium text-white">Key Features</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Interactive charts and sales forecasting</li>
                <li>Custom product and inventory filters</li>
                <li>User role management and activity logs</li>
              </ul>
            </div>
            <div className="mt-5 text-slate-300">
              <p className="font-medium text-white">Tech Stack</p>
              <p className="mt-2">React, Tailwind CSS, Node.js, PostgreSQL</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#" className="rounded-3xl bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700">GitHub</a>
              <a href="#" className="rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">Live Demo</a>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.45)]">
            <h3 className="text-xl font-semibold text-white">Task Management App</h3>
            <p className="mt-4 text-slate-300 leading-7">
              A productivity tool that helps users organize projects, deadlines, and daily tasks in one place. It addresses the challenge of staying focused and aligned while managing multiple workstreams.
            </p>
            <div className="mt-5 space-y-3 text-slate-300">
              <p className="font-medium text-white">Key Features</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Drag-and-drop task organization</li>
                <li>Custom labels, due dates, and reminders</li>
                <li>Team collaboration with shared workspaces</li>
              </ul>
            </div>
            <div className="mt-5 text-slate-300">
              <p className="font-medium text-white">Tech Stack</p>
              <p className="mt-2">React, TypeScript, Firebase, Tailwind CSS</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#" className="rounded-3xl bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700">GitHub</a>
              <a href="#" className="rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">Live Demo</a>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.45)]">
            <h3 className="text-xl font-semibold text-white">Real-time Chat Interface</h3>
            <p className="mt-4 text-slate-300 leading-7">
              A live communication experience designed for teams and communities to stay connected. It solves the need for instant messaging with presence indicators and fast message delivery.
            </p>
            <div className="mt-5 space-y-3 text-slate-300">
              <p className="font-medium text-white">Key Features</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Live messaging with typing and read receipts</li>
                <li>Group channels and direct messages</li>
                <li>Responsive mobile-first chat UI</li>
              </ul>
            </div>
            <div className="mt-5 text-slate-300">
              <p className="font-medium text-white">Tech Stack</p>
              <p className="mt-2">React, Socket.io, Express, Styled Components</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#" className="rounded-3xl bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700">GitHub</a>
              <a href="#" className="rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">Live Demo</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
