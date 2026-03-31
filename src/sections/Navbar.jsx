import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import emailjs from 'emailjs-com'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact Us' },
]

const projects = [
  { value: 'SSR Silicon Shine', label: 'SSR Silicon Shine - Bangalore' },
  { value: 'SSR Tranquila', label: 'SSR Tranquila - Hyderabad' },
  { value: 'SSR Natura', label: 'SSR Natura - Mumbai' },
  { value: 'SSR Signature Gardenia', label: 'SSR Signature Gardenia - Bangalore' },
]

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    date: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

    setIsMobileMenuOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration - Replace with your actual credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const userId = import.meta.env.VITE_EMAILJS_USER_ID || 'YOUR_USER_ID'

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project: formData.project,
          date: formData.date,
          to_email: 'yanamalaveera01@gmail.com, surendraoffline@gmail.com'
        },
        userId
      )

      toast.success('Visit request submitted successfully! We will contact you within 24 hours.')
      setIsModalOpen(false)
      setFormData({ name: '', email: '', phone: '', project: '', date: '' })
    } catch (error) {
      console.error('Email error:', error)
      toast.error('Failed to submit request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home') }}
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
              <span href="#home" className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                SSR Properties
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                  className={`relative text-sm font-medium transition-colors duration-300 ${activeSection === link.href.replace('#', '')
                    ? 'text-[#c89b3c]'
                    : isScrolled
                      ? 'text-gray-700 hover:text-[#c89b3c]'
                      : 'text-white/90 hover:text-white'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c89b3c]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="tel:+919900228668"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" />
                <span>+91 9632616633</span>
              </motion.a>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-[#c89b3c]/30"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(200, 155, 60, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book Visit
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block text-lg font-medium ${activeSection === link.href.replace('#', '')
                      ? 'text-[#c89b3c]'
                      : 'text-gray-700'
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
                      setIsMobileMenuOpen(false)
                      setIsModalOpen(true)
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

      {/* Book Visit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Book a Site Visit</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <p className="text-gray-600 mb-6">
              Fill out the form below and our team will contact you within 24 hours to schedule your visit.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 90715 58855"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Select Project *</Label>
                <Select
                  value={formData.project}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, project: value }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.value} value={project.value}>
                        {project.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Preferred Visit Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] hover:from-[#b88a2d] hover:to-[#d5b559] text-white font-medium rounded-full"
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Submitting...
                  </motion.span>
                ) : (
                  'Request Visit'
                )}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
