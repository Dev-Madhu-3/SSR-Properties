import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Shield, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '50+', label: 'Projects Completed', icon: Home },
  { value: '2000+', label: 'Happy Families', icon: TrendingUp },
  { value: '10+', label: 'Years Experience', icon: Shield },
]

const heroImages = [
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774871830/Farmlands.jpg_un2jpy.jpg',
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774871827/GreenFarms_cjsuwq.png',
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774843910/SSR_Villa_q25pqw.png',
  'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_FarmLands_ne05hu.png'
]

export default function Hero({ onViewHero }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroImages.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentImage === index ? 1 : 0,
            scale: currentImage === index ? 1 : 1.1
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </motion.div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#c89b3c]/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-[#c89b3c] rounded-full animate-pulse" />
              <span className="text-sm font-medium">Premium Real Estate Developer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89b3c] to-[#e6c66a]">
                Dream Property
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl"
            >
              Luxury Villas • Premium Apartments • Smart Investments
              <br />
              <span className="text-white/60">Building trust since 2021 across India's top cities</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="h-14 px-8 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] hover:from-[#b88a2d] hover:to-[#d5b559] text-white font-semibold rounded-full text-base shadow-lg shadow-[#c89b3c]/30"
              >
                Explore Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="h-14 px-8 border-2 border-white/30 bg-transparent text-white hover:bg-white/10 font-semibold rounded-full text-base"
              >
                Contact Us
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-[#c89b3c]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Featured Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
              >
                <img
                  src="https://res.cloudinary.com/djuoignk5/image/upload/v1774809091/Signature_Gardenia_SSR_uueh2e.jpg"
                  alt="Featured Property"
                  className="w-full h-64 object-cover rounded-2xl mb-4"
                />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">SSR Signature Gardenia</h3>
                    <p className="text-white/60 text-sm">Kithaganuru, Bangalore</p>
                  </div>
                  <span className="bg-[#c89b3c] text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white">
                    <span className="text-2xl font-bold">₹85L</span>
                    <span className="text-white/60 text-sm"> onwards</span>
                  </div>
                  <Button
                    onClick={() => onViewHero && onViewHero()}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] rounded-2xl p-4 shadow-xl"
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-xs opacity-90">Customer Rating</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-[#c89b3c]' : 'bg-white/30'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
