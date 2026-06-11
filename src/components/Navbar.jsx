import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    {
      name: "Home",
      to: "/",
      icon: "/home3d.png",
      activeIcon: "/home.png",
    },
    {
      name: "Projects",
      to: "/projects",
      icon: "/projects3d.png",
      activeIcon: "/projects.png",
    },
    {
      name: "Contact",
      to: "/contact",
      icon: "/contact3d.png",
      activeIcon: "/contact.png",
    },
  ];

  const shadow3D = "drop-shadow-[-2px_-1px_0px_#000]";
  const isHomePage = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link
              to="/"
              className={`group flex flex-col items-center font-bold text-2xl text-white transition ${
                isHomePage ? "pointer-events-none" : "hover:text-sky-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/favicon.svg"
                alt="Logo icon"
                className={`h-24 w-24 rounded-full transition-all duration-300 ease-out shadow-none ${
                  !isHomePage && "group-hover:scale-110"
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.to} 
                end
                // FIX: Move pointer-events-none to the outer NavLink component
                className={({ isActive }) => isActive ? "pointer-events-none cursor-default" : ""}
              >
                {({ isActive }) => (
                  <div
                    className={`flex flex-col items-center font-medium transition-all duration-300 ${
                      isActive
                        ? `text-black` 
                        : `text-sky-400 ${shadow3D} hover:scale-125`
                    }`}
                  >
                    {link.icon && (
                      <img
                        src={isActive ? link.activeIcon : link.icon}
                        alt={`${link.name} icon`}
                        className="w-8 h-8 mb-1 object-contain transition-transform duration-300"
                      />
                    )}
                    <span>{link.name}</span>
                  </div>
                )}
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                onClick={() => setIsOpen(false)}
                // FIX: Move pointer-events-none to the outer NavLink component here too
                className={({ isActive }) => isActive ? "pointer-events-none cursor-default" : ""}
              >
                {({ isActive }) => (
                  <div
                    className={`py-3 px-4 rounded mt-3 text-center flex flex-col items-center transition duration-200 ${
                      isActive
                        ? "bg-gray-700 text-black"
                        : `text-sky-400 ${shadow3D}`
                    }`}
                  >
                    {link.icon && (
                      <img
                        src={isActive ? link.activeIcon : link.icon}
                        alt={`${link.name} icon`}
                        className={`w-8 h-8 mb-1 object-contain transition-transform duration-300 ${
                          !isActive && "hover:scale-110"
                        }`}
                      />
                    )}
                    <span>{link.name}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}