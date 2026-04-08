import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Award, Users, Shield, TrendingUp, Building2, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on construction quality, materials, or finish. Every project undergoes rigorous quality checks to ensure excellence in design and execution.',
    details: 'Our commitment to quality extends beyond aesthetics. We source premium materials, employ skilled professionals, and implement international best practices in construction methodology.'
  },
  {
    icon: Users,
    title: 'Customer Centric',
    description: 'Creating spaces where families can live, grow, and build their future.',
    details: 'Customer satisfaction is at the heart of everything we do. We focus on understanding client needs and delivering solutions that exceed expectations. Our 24/7 customer support ensures assistance whenever needed.'
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Legally approved properties with clear documentation and honest pricing.',
    details: 'Transparency means clear communication and ethical practices. All our projects are legally registered, documentation is readily available, and pricing has no hidden charges. We believe in building long-term relationships through trust.'
  },
  {
    icon: TrendingUp,
    title: 'Long-Term Value',
    description: 'Sustainable developments that enhance quality of life and investment potential.',
    details: 'We design projects with appreciation potential in mind. Strategic locations, sustainable practices, and modern amenities ensure your investment grows while you enjoy the lifestyle improvements.'
  },
]

const highlights = [
  { label: 'Projects Delivered', value: '5+' },
  { label: 'Customers Satisfied', value: '500+' },
  { label: 'Years Experience', value: '3+' },
  { label: 'Total Area', value: '100+ Acres' },
]

const features = [
  '24/7 Security & Gated Community',
  '25, 30, 35 & 40 ft Asphalt Roads',
  'Integrated Drainage System',
  'East, West & North Facing Homes',
  'Rainwater Harvesting',
  'Green Spaces & Parks',
  'Community Centers',
  'Modern Infrastructure',
]

export default function AboutDetail({ onBack }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[#c89b3c] hover:text-[#b8891e] font-semibold mb-12 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            About SSR Properties
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Building Trust, Creating Value, Shaping Your Future
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            SSR Properties is committed to shaping modern lifestyles through thoughtfully developed
            residential layouts and farmland projects — focused on quality, transparency, and
            lasting customer satisfaction.
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          <img
            src="https://res.cloudinary.com/djuoignk5/image/upload/v1774843910/SSR_Villa_q25pqw.png"
            alt="SSR Properties"
            className="w-full h-[500px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Badge className="absolute top-6 left-6 bg-[#c89b3c] text-white text-base px-4 py-2">
            Est. 2018
          </Badge>
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="flex items-start gap-4 mb-6">
            <Building2 className="w-8 h-8 text-[#c89b3c] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">SSR Properties</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-[#c89b3c]" />
                <span>3rd floor, RNX Complex, Tc Palya main road, Anadapura circle, opp. Bharat petrol pump, Bengaluru, Karnataka - 560036</span>
              </div>
              <p className="text-lg text-[#c89b3c] font-semibold mb-4 italic">
                "A home is more than a structure — it's the foundation of dreams, comfort, and lasting memories."
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Established in 2018, SSR Properties has been committed to shaping modern lifestyles
              through well-planned residential layouts and farmland projects. We focus on delivering
              legally approved properties and affordable investment opportunities — with c
              
              documentation and peace of mind for every buyer.
            </p>
            <p>
              With trusted experience in the real estate industry, we have built a reputation as a
              reliable, customer-focused developer. Our projects offer modern infrastructure,
              long-term value, and vibrant communities — dedicated to enhancing the quality of life
              while providing excellent investment potential.
            </p>
            <p>
              We believe in sustainable development that balances growth with environmental responsibility.
              Every project is meticulously planned with attention to infrastructure, community spaces,
              and the unique needs of modern families seeking their dream homes.
            </p>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl font-bold mb-2">{highlight.value}</div>
              <div className="text-sm opacity-90">{highlight.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{value.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{value.description}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{value.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Project Features & Amenities</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#c89b3c] flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Invest in Your Future?</h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore our premium residential and farmland projects designed with quality, transparency, and your long-term value in mind.
          </p>
          <Button 
            onClick={onBack}
            className="bg-white text-[#c89b3c] hover:bg-gray-100 px-8 py-3 font-semibold rounded-full"
          >
            Explore Our Projects
          </Button>
        </motion.div>

        {/* Back to Main */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center mt-12"
        >
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-[#c89b3c] hover:text-[#b8891e] font-semibold transition-colors mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Main
          </button>
        </motion.div>
      </div>
    </section>
  )
}
