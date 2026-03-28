import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { toast } from 'sonner'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const projects = [
  { label: 'SSR Silicon Shine', href: '#projects' },
  { label: 'SSR Tranquila', href: '#projects' },
  { label: 'SSR Natura', href: '#projects' },
  { label: 'SSR Signature Gardenia', href: '#projects' },
]

const services = [
  { label: 'Buy Property', href: '#contact' },
  { label: 'Sell Property', href: '#contact' },
  { label: 'Rent Property', href: '#contact' },
  { label: 'Investment Advisory', href: '#contact' },
  { label: 'Property Management', href: '#contact' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/ssrproperties', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/ssrproperties', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ssrproperties', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ssrproperties', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/ssrproperties', label: 'YouTube' },
]

export default function Footer() {
  const scrollToSection = (href) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    if (email) {
      toast.success('Thank you for subscribing!')
      e.target.reset()
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">SSR Properties</h3>
                <p className="text-gray-400 text-sm">Building Dreams Since 2021</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading real estate developer in India, offering luxury villas, premium apartments, 
              and smart investment opportunities across top cities.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#c89b3c]" />
                <span>+91 99002 28668</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#c89b3c]" />
                <span>sales@ssrproperties.in</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#c89b3c]" />
                <span>Kithaganuru, KR Puram, Bangalore</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#c89b3c] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                    className="text-gray-400 hover:text-[#c89b3c] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Projects</h4>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.label}>
                  <a
                    href={project.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(project.href) }}
                    className="text-gray-400 hover:text-[#c89b3c] transition-colors"
                  >
                    {project.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(service.href) }}
                    className="text-gray-400 hover:text-[#c89b3c] transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400">
                Get the latest property updates and investment insights delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 h-12 px-4 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#c89b3c]"
              />
              <button
                type="submit"
                className="h-12 px-6 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white font-semibold rounded-full hover:from-[#b88a2d] hover:to-[#d5b559] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} SSR Properties. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#c89b3c] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#c89b3c] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#c89b3c] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white rounded-full shadow-lg flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
