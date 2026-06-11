function getCurrentYear() {
  return new Date().getFullYear()
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-slate-300 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm md:text-base">
          This website is built with <span className="pulse-heart inline-block">❤️</span> and care by
        </p>
        <div className="mt-2 flex justify-center">
          <img src="/logo.png" alt="Logo" className="h-7 md:h-12" />
        </div>
        <p className="text-xs  text-slate-300 md:text-sm mt-4 font-bold">
          © {getCurrentYear()}
        </p>
      </div>
    </footer>
  )
}
