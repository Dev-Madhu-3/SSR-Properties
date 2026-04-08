import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, MapPin, Home, Maximize, Trees, Car, Shield,Activity, Waves, Dumbbell, Play,Baby, Download, Loader2, CheckCircle, AlertCircle, X, Building, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import emailjs from 'emailjs-com'

const amenities = [
  { icon: Shield, label: '24/7 Security' },
  { icon: Activity, label: 'Jogging Track' },
  { icon: Trees, label: 'Parks' },
  { icon: Waves, label: 'Swimming Pool' },
  { icon: Maximize, label: 'Club House' },
  { icon: Baby, label: "Children's Play Area" },
  
]

const highlights = [
  '11 acres gated community with 260 houses & plots',
  '25, 30, 35 & 40 ft Asphalt Roads',
  'Integrated Drainage System',
  'East, West & North , South Facing Homes',
  'Electrical Cabling',
  'Street Lighting',
  'Children Play Area',
]

const galleryImages = [
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774809635/SSR_img_f98wby.jpg',
  'https://res.cloudinary.com/djuoignk5/image/upload/v1775475350/enhanced_house_hirwtm.png',
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774809539/SSR_Signature_Gardenia_vf7jd4.jpg',
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774809091/Signature_Gardenia_SSR_uueh2e.jpg',
]

export default function ProjectDetail() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState(null)
  const [showVideo, setShowVideo] = useState(false)
  const [showBrochureModal, setShowBrochureModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectName: '',
    date: '',
    message: '',
  })

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Please select a project'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9\+\-\s\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain only digits and be at least 10 characters'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fill in all required fields correctly')
      return
    }

    setIsSubmitting(true)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT_FORM || 'YOUR_TEMPLATE_ID'
      const userId = import.meta.env.VITE_EMAILJS_USER_ID || 'YOUR_USER_ID'

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          project: formData.projectName,
          message: formData.message,
          to_email: 'sales@ssrproperties.in, info@ssrproperties.in',
        },
        userId
      )

      setIsSuccess(true)
      toast.success('Thank you! We will contact you within 24 hours.')
      
      // Open brochure in new tab
      window.open('SSR-SIGNATURE-GARDENIA-Broucher-AW.pdf', '_blank')
      
      setTimeout(() => {
        setShowBrochureModal(false)
        setIsSuccess(false)
        setFormData({
          name: '',
          phone: '',
          email: '',
          projectName: '',
          date: '',
          message: '',
        })
        setErrors({})
      }, 3000)
    } catch (error) {
      console.error('Email error:', error)
      toast.error('Failed to send request. Please try calling us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Flagship Project
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              SSR Signature Gardenia
            </h2>
            <p className="text-[#c89b3c] font-medium text-lg mb-4">
              Where Serenity Meets Sophistication
            </p>

            <div className="flex items-center text-gray-500 mb-6">
              <MapPin className="w-5 h-5 mr-2 text-[#c89b3c]" />
              <span>Kithaganuru, KR Puram, Bangalore</span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the perfect blend of modern lifestyle and natural tranquility at SSR Signature Gardenia.
              Spread across 11 acres, this gated community offers 260 meticulously designed houses and plots
              with world-class amenities that cater to every aspect of contemporary living.
            </p>

            {/* Amenities */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={amenity.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <amenity.icon className="w-6 h-6 text-[#c89b3c] mb-2" />
                  <span className="text-xs text-gray-600 text-center">{amenity.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#c89b3c]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#c89b3c]" />
                  </div>
                  <span className="text-sm text-gray-700">{highlight}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToContact}
                className="h-12 px-8 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] hover:from-[#b88a2d] hover:to-[#d5b559] text-white font-semibold rounded-full"
              >
                <Home className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                onClick={() => setShowBrochureModal(true)}
                variant="outline"
                className="h-12 px-8 border-2 border-[#c89b3c] text-[#c89b3c] hover:bg-[#c89b3c] hover:text-white font-semibold rounded-full"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
              <Button
                onClick={() => setShowVideo(true)}
                variant="outline"
                className="h-12 px-8 border-2 border-[#c89b3c] text-[#c89b3c] hover:bg-[#c89b3c] hover:text-white font-semibold rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </Button>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl overflow-hidden shadow-2xl mb-4 cursor-pointer"
                onClick={() => setSelectedImage(galleryImages[0])}
              >
                <img
                  src={galleryImages[0]}
                  alt="SSR Signature Gardenia"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 2}`}
                      className="w-full h-24 object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Price Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <p className="text-xs text-gray-500">Plots Starting from</p>
                <p className="text-2xl font-bold text-[#c89b3c]">₹45L</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90">
          <DialogTitle className="sr-only">Property image</DialogTitle>
          <DialogDescription className="sr-only">Full size property image view</DialogDescription>
          <img
            src={selectedImage}
            alt="Property view"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Project video</DialogTitle>
          <DialogDescription className="sr-only">SSR Properties project video</DialogDescription>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/zC19kcLxxJU?autoplay=1&start=6"
              title="SSR Properties"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Brochure Modal */}
      <Dialog open={showBrochureModal} onOpenChange={setShowBrochureModal}>
        <DialogContent className="p-0 overflow-hidden border-0 bg-transparent shadow-none w-auto">
          <DialogTitle className="sr-only">Download Brochure</DialogTitle>
          <DialogDescription className="sr-only">Fill out the form to download the project brochure</DialogDescription>
          
          <motion.div 
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto max-h-[85vh] flex flex-col"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 pointer-events-none"></div>
            
            {/* Header */}
            <motion.div 
              className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white"
              initial={{ height: "auto" }}
              animate={{ height: "auto" }}
            >
              <button
                onClick={() => setShowBrochureModal(false)}
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/30 transition-all duration-300 z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Building className="w-6 h-6 mr-2" />
                  <h2 className="text-2xl font-bold">Book Your Site Visit</h2>
                </motion.div>
                <motion.p 
                  className="text-white/90 text-sm ml-8"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Schedule a personalized tour of your dream property
                </motion.p>
              </div>
            </motion.div>
        
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="relative inline-flex justify-center items-center w-16 h-16 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                      <div className="relative bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 text-sm max-w-sm">
                      We've received your booking request. We'll contact you within 24 hours to confirm your site visit.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Full Name Field */}
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium text-sm block mb-2">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <motion.p 
                          className="text-red-500 text-xs mt-1.5 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Project Name Field */}
                    <div>
                      <Label htmlFor="projectName" className="text-gray-700 font-medium text-sm block mb-2">
                        Select Project *
                      </Label>
                      <select
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className={`h-10 w-full border border-gray-300 rounded-lg px-3 focus:border-amber-500 focus:ring-amber-500 focus:outline-none transition-all duration-300 text-sm ${errors.projectName ? 'border-red-500' : ''}`}
                      >
                        <option value="">Choose a project</option>
                        <option value="SSR Signature Gardenia">SSR Signature Gardenia</option>
                        <option value="SSR Green Farms">SSR Green Farms</option>
                        <option value="SSR SK Signature">SSR SK Signature</option>
                      </select>
                      {errors.projectName && (
                        <motion.p 
                          className="text-red-500 text-xs mt-1.5 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.projectName}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone Number Field */}
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium text-sm block mb-2">
                        Phone Number * <span className="text-gray-400 text-xs">(digits only)</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="10 digits minimum"
                      />
                      {errors.phone && (
                        <motion.p 
                          className="text-red-500 text-xs mt-1.5 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium text-sm block mb-2">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <motion.p 
                          className="text-red-500 text-xs mt-1.5 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Date Field */}
                    <div>
                      <Label htmlFor="date" className="text-gray-700 font-medium text-sm block mb-2">
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium text-sm block mb-2">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="min-h-20 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 resize-none transition-all duration-300 text-sm"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      className="flex justify-end pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-10 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50 text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </section>
  )
}