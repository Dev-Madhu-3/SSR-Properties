import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Home, Award, MapPin, Users, TrendingUp, Shield, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const featuredProjects = [
  {
    name: 'SSR Signature Gardenia',
    location: 'Kithaganuru, Bangalore',
    price: '₹99 L onwards',
    rating: 4.9,
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774809091/Signature_Gardenia_SSR_uueh2e.jpg',
    status: 'On going',
    description: 'Luxury premium residential project with world-class amenities',
  },
  {
    name: 'SSR Advam Residency',
    location: 'KR Puram, Bangalore',
    price: '₹75L onwards',
    rating: 4.8,
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846012/SSR_Advam_Residency_rqkyxk.png',
    status: 'Available',
    description: 'Modern township with integrated community features',
  },
  {
    name: 'SSR FarmLands',
    location: 'Outer Ring Road, Bangalore',
    price: '₹35L onwards',
    rating: 4.7,
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_FarmLands_ne05hu.png',
    status: 'Available',
    description: 'Plotted farmland investment opportunity with high appreciation',
  },
]

const achievements = [
  { value: '20+', label: 'Projects Completed', icon: Home },
  { value: '1000+', label: 'Happy Families', icon: Users },
  { value: '5+', label: 'Years Experience', icon: Award },
  { value: '100%', label: 'Customer Satisfaction', icon: Star },
]

const highlights = [
  { title: 'Premium Location', description: 'Strategic locations in high-growth corridors' },
  { title: 'Quality Construction', description: 'International standards in every project' },
  { title: 'Transparent Pricing', description: 'No hidden charges, clear documentation' },
  { title: 'Expert Team', description: 'Experienced professionals dedicated to excellence' },
]

export default function HeroDetail({ onBack }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleViewProject = (projectName) => {
    window.alert(`View project: ${projectName}`)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[#c89b3c] hover:text-[#b8891e] font-semibold mb-12 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Premium Real Estate Developer
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Experience Luxury Living
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium portfolio of residential and investment properties across India's top cities.
            Building trust since 2021.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-6 h-6" />
              </div>
              <div className="text-4xl font-bold mb-2">{achievement.value}</div>
              <div className="text-sm opacity-90">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-[#c89b3c] text-white">
                    {project.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 text-[#c89b3c]" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6 pb-6 border-b">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(project.rating) ? 'fill-[#c89b3c] text-[#c89b3c]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{project.rating}</span>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{project.price}</div>
                    </div>
                    {/* <Button
                      onClick={() => handleViewProject(project.name)}
                      className="bg-[#c89b3c] text-white hover:bg-[#b8891e] rounded-full px-6 py-2"
                    >
                      View
                    </Button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose SSR Properties</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust & Transparency Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] rounded-3xl p-12 text-white text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Building Trust Since 2021</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Every project is backed by legal approval, clear documentation, and 100% customer satisfaction.
            Your investment is our responsibility.
          </p>
          <Button
            onClick={onBack}
            className="bg-white text-[#c89b3c] hover:bg-gray-100 px-8 py-3 font-semibold rounded-full"
          >
            Explore More Projects
          </Button>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-[#c89b3c] hover:text-[#b8891e] font-semibold transition-colors mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </section>
  )
}
