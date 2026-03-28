import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, MapPin, Home, Maximize, Trees, Car, Shield, Waves, Dumbbell, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const amenities = [
  { icon: Shield, label: '24/7 Security' },
  { icon: Car, label: 'Parking' },
  { icon: Trees, label: 'Parks' },
  { icon: Waves, label: 'Swimming Pool' },
  { icon: Dumbbell, label: 'Gym' },
  { icon: Maximize, label: 'Club House' },
]

const highlights = [
  '10 acres gated community with 225 houses & plots',
  '25, 30 & 35 ft Asphalt Roads',
  'Integrated Drainage System',
  'Borewell Water Supply',
  'East, West & North Facing Homes',
  'Underground Electrical Cabling',
  'Street Lighting',
  'Children Play Area',
]

const galleryImages = [
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80',
]

export default function ProjectDetail() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
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
              Spread across 10 acres, this gated community offers 225 meticulously designed houses and plots 
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
                Book Site Visit
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
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="text-2xl font-bold text-[#c89b3c]">₹85L</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90">
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
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Video coming soon</p>
              <p className="text-sm opacity-60">Contact us for a physical site visit</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
