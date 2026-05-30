import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // 👈 Swapped Link for NavLink for navigation items

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900 text-white py-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Container */}
          <div className="shrink-0">
            <Link
              to="/"
              className="group flex flex-col items-center font-bold text-2xl text-white hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/favicon.svg"
                alt="Logo icon"
                className="h-24 w-24 p-2 rounded-full transition shadow-none group-hover:shadow-[0_0_30px_rgba(96,165,250,0.45),inset_0_0_16px_rgba(96,165,250,0.35)]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end // 👈 Crucial: stops "/" from matching sub-routes like "/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-500 cursor-default pointer-events-none font-medium" // Greyed out style
                    : "text-white hover:text-blue-400 transition duration-200 font-medium" // Default style
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                // Close Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-4 bg-gray-950 text-gray-500 rounded mt-3 text-center cursor-default pointer-events-none" // Active mobile style
                    : "block py-2 px-4 text-white hover:bg-gray-800 rounded transition duration-200 mt-3 text-center" // Default mobile style
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}