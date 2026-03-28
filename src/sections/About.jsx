import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Award, Users, Building2, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  '24/7 Security & Gated Community',
  '25, 30 & 35 ft Asphalt Roads',
  'Integrated Drainage System',
  'Borewell Water Supply',
  'East, West & North Facing Homes',
  'Rainwater Harvesting',
]

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on construction quality and materials.',
  },
  {
    icon: Users,
    title: 'Customer Centric',
    description: 'Your satisfaction is our top priority at every step.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Clear documentation and honest pricing always.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Modern designs with smart home technology.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Building Dreams, Delivering Trust
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            SSR Properties is a leading real estate developer with projects across top Indian cities, 
            focusing on sustainability, luxury, and community living.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="SSR Properties"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-2xl p-6 shadow-xl"
            >
              <div className="text-white text-center">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-[#c89b3c]/10 rounded-3xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              SSR Properties
            </h3>
            <p className="text-[#c89b3c] font-medium mb-4">
              "Innovation in Every Brick"
            </p>
            <p className="text-gray-500 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#c89b3c]" />
              Kithaganuru, KR Puram, Bangalore
            </p>

            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                Since our inception in 2021, SSR Properties has been shaping modern living through 
                quality developments and customer-centric service. We believe that every home is more 
                than just a structure — it's the foundation of dreams, comfort, and a better future.
              </p>
              <p>
                We specialize in residential plots, individual houses, and housing developments with 
                a strong focus on quality, transparency, and customer satisfaction. Our projects are 
                designed to provide the perfect blend of luxury, comfort, and sustainability.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-[#c89b3c] flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={scrollToProjects}
              className="h-12 px-8 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] hover:from-[#b88a2d] hover:to-[#d5b559] text-white font-semibold rounded-full"
            >
              Explore Projects
            </Button>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-sm text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
