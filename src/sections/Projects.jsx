import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Home, Calendar, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const projects = [
  {
    id: 1,
    name: 'SSR signature Gardenia',
    location: 'Near East Point College (Back Gate), Kithaganur - Bidarahalli Main Road, Bangalore - 560049',
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774809091/Signature_Gardenia_SSR_uueh2e.jpg',
    status: 'On Going',
    price: '₹1Cr-₹1.5Cr',
    type: 'Villas & Plots',
    units: '120 Units',
    completion: 'Dec 2025',
    description: 'Modern apartments with smart home features in the heart of Bangalore IT corridor.',
    features: ['2 & 3 BHK', 'Smart Home', 'Club House', 'Swimming Pool'],
  },
  {
    id: 2,
    name: 'SSR Green Farms',
    location: 'NH75, Mulbagal, Kolar',
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_FarmLands_ne05hu.png',
    status: 'On Going',
    price: 'Starting from ₹45L onwards',
    type: 'FarmLands with amenities',
    units: '80 Units',
    completion: 'Mar 2026',
    description: 'Peaceful FarmLands with lush green surroundings and premium amenities.',
    features: ['3 & 4 BHK', 'Private Garden', 'Gated Community', '24/7 Security'],
  },
  {
    id: 3,
    name: 'SSR Advam Residency',
    location: 'Bangalore',
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871826/24.jpg_2_ks6ipn.jpg',
    status: 'On Going',
    price: 'starting from ₹ 1Cr',
    type: 'Luxury Apartments',
    units: '200 Units',
    completion: 'Jun 2026',
    description: 'Premium sea-facing apartments with world-class amenities in Mumbai.',
    features: ['3 & 4 BHK', 'Sea View', 'Sky Lounge', 'Fitness Center'],
  },
  {
    id: 4,
    name: 'SSR Signature Gardenia',
    location: 'Bangalore',
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_Villa_zay5vn.png',
    status: 'Ready to Move',
    price: 'starting from ₹ 1Cr',
    type: 'Plots & Villas',
    units: '225 Units',
    completion: 'Ready',
    description: '10-acre gated community with plots and ready-to-move villas.',
    features: ['Plots & Villas', '10 Acres', 'Club House', 'Swimming Pool'],
  },
  {
    id: 5,
    name: 'SSR Advam Residency',
    location: 'Bangalore',
    image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871826/2.jpg_o6e9rf.jpg',
    status: 'New Launch',
    price: 'starting from ₹ 1Cr',
    type: 'Apartments',
    units: '150 Units',
    completion: 'Dec 2027',
    description: 'Eco-friendly apartments with sustainable living features.',
    features: ['2 & 3 BHK', 'Eco-Friendly', 'Solar Power', 'Rainwater Harvesting'],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const scrollContainerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Going':
        return 'bg-blue-500'
      case 'Ready to Move':
        return 'bg-green-500'
      case 'New Launch':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
        >
          <div>
            <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Top Affordable & Luxury Projects in Bangalore
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl text-base">
              Discover a wide range of individual houses, plots, and residential sites — trusted by
              hundreds of happy homeowners across Bangalore.
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-2 hover:bg-[#c89b3c] hover:text-white hover:border-[#c89b3c]"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-2 hover:bg-[#c89b3c] hover:text-white hover:border-[#c89b3c]"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-sm max-w-3xl mb-10 leading-relaxed"
        >
          Bangalore's rapid growth as an investment hub has surged demand for quality housing. Whether
          you envision a luxurious home, an elegant plot, or a well-planned development — SSR Properties
          offers premium and affordable residential projects that blend comfort, convenience, and modern
          elegance. Your dream home is now within reach.
        </motion.p>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="min-w-[350px] sm:min-w-[400px] snap-start"
              >
                <div
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <Badge
                      className={`absolute top-4 left-4 ${getStatusColor(project.status)} text-white border-0`}
                    >
                      {project.status}
                    </Badge>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-bold text-xl">{project.price}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#c89b3c] transition-colors">
                      {project.name}
                    </h3>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1 text-[#c89b3c]" />
                      {project.location}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        {project.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.completion}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full text-[#c89b3c] hover:bg-[#c89b3c]/10 group/btn"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.name}</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                  <Badge variant="outline">{selectedProject.type}</Badge>
                  <Badge variant="outline">{selectedProject.units}</Badge>
                </div>

                <p className="text-gray-600 mb-6">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Price Range</p>
                    <p className="text-lg font-semibold text-[#c89b3c]">{selectedProject.price}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Completion</p>
                    <p className="text-lg font-semibold">{selectedProject.completion}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.features.map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center gap-1 bg-[#c89b3c]/10 text-[#c89b3c] px-3 py-1 rounded-full text-sm"
                      >
                        <Check className="w-4 h-4" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedProject(null)
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full h-12 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white font-semibold rounded-full"
                >
                  Book Site Visit
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
