import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "../contexts/ModalContext";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact Us" },
];

const projects = [
  { value: "SSR Silicon Shine", label: "SSR Silicon Shine - Bangalore" },
  { value: "SSR Tranquila", label: "SSR Tranquila - Hyderabad" },
  { value: "SSR Natura", label: "SSR Natura - Mumbai" },
  {
    value: "SSR Signature Gardenia",
    label: "SSR Signature Gardenia - Bangalore",
  },
];

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useModal({
    date: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-15 h-10 bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/djuoignk5/image/upload/v1774806708/LogoSSR_gd8thm.png"
                  alt="SSR Properties Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                href="#home"
                className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                SSR Properties
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[#c89b3c]"
                      : isScrolled
                        ? "text-gray-700 hover:text-[#c89b3c]"
                        : "text-white/90 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  {activeSection === link.href.replace("#", "") && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c89b3c]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="tel:+919900228668"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" />
                <span>+91 9632616633</span>
              </motion.a>
              <motion.button
                onClick={() => openModal("bookVisit")}
                className="bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-[#c89b3c]/30"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(200, 155, 60, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book Visit
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block text-lg font-medium ${
                      activeSection === link.href.replace("#", "")
                        ? "text-[#c89b3c]"
                        : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t"
                >
                  <a
                    href="tel:+919632616633"
                    className="flex items-center gap-2 text-gray-700 mb-4"
                  >
                    <Phone className="w-5 h-5 text-[#c89b3c]" />
                    +91 9632616633
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openModal("bookVisit");
                    }}
                    className="w-full bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white py-3 rounded-full font-medium"
                  >
                    Book Visit
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
