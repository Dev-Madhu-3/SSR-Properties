import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
    title: 'Modern Villa',
    location: 'Whitefield, Bangalore',
    price: '₹2.5 Cr',
    beds: 4,
    baths: 3,
    sqft: '3,500',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
    title: 'Luxury Apartment',
    location: 'Gachibowli, Hyderabad',
    price: '₹1.8 Cr',
    beds: 3,
    baths: 2,
    sqft: '2,200',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    title: 'Penthouse Suite',
    location: 'Bandra, Mumbai',
    price: '₹5.2 Cr',
    beds: 5,
    baths: 4,
    sqft: '4,500',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    title: 'Garden Villa',
    location: 'Sarjapur, Bangalore',
    price: '₹3.1 Cr',
    beds: 4,
    baths: 3,
    sqft: '3,800',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    title: 'Premium Duplex',
    location: 'Hitech City, Hyderabad',
    price: '₹2.2 Cr',
    beds: 3,
    baths: 3,
    sqft: '2,800',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    title: 'Sea View Apartment',
    location: 'Juhu, Mumbai',
    price: '₹4.5 Cr',
    beds: 4,
    baths: 3,
    sqft: '3,200',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=600&q=80',
    title: 'Smart Home Villa',
    location: 'Electronic City, Bangalore',
    price: '₹1.9 Cr',
    beds: 3,
    baths: 2,
    sqft: '2,400',
  },
]

// Duplicate for infinite scroll
const allProperties = [...properties, ...properties]

export default function FeaturedSlider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Featured Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties across India's top cities
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Slider */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-6 animate-scroll hover:pause-animation"
          style={{
            width: 'fit-content',
            animation: 'scroll 40s linear infinite',
          }}
        >
          {allProperties.map((property, index) => (
            <motion.div
              key={`${property.id}-${index}`}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-[350px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#c89b3c] text-white text-xs font-medium px-3 py-1 rounded-full">
                  Featured
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold text-lg">{property.price}</p>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-[#c89b3c] transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-[#c89b3c]" />
                  {property.location}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      {property.sqft}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover,
        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
