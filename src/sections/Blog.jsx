import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, Bookmark, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const blogPosts = [
  {
    id: 1,
    title: 'How Location Impacts Property Value',
    excerpt: 'Strategic location boosts connectivity, amenities & long-term value. Learn why location is the most crucial factor in real estate investment.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    author: 'Mrs. Prathyusha',
    date: 'Feb 27, 2026',
    readTime: '5 min read',
    category: 'Investment',
    featured: true,
  },
  {
    id: 2,
    title: 'Future of Plotted Developments',
    excerpt: 'Why investors prefer land over apartments. Discover the benefits of investing in plotted developments.',
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=600&q=80',
    author: 'Mrs. Prathyusha',
    date: 'Feb 27, 2026',
    readTime: '4 min read',
    category: 'Trends',
    featured: false,
  },
  {
    id: 3,
    title: 'Infrastructure & Property Prices',
    excerpt: 'Infrastructure drives property value across India. Understand the correlation between development and pricing.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    author: 'Mrs. Prathyusha',
    date: 'Feb 21, 2026',
    readTime: '6 min read',
    category: 'Analysis',
    featured: false,
  },
  {
    id: 4,
    title: 'Real Estate Trends 2026',
    excerpt: 'Market insights & growth areas. Stay ahead with the latest trends shaping the real estate industry.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Mar 15, 2026',
    readTime: '7 min read',
    category: 'Trends',
    featured: false,
  },
  {
    id: 5,
    title: 'Best Investment Locations',
    excerpt: 'Top cities to invest in India. A comprehensive guide to the most promising real estate markets.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Mar 10, 2026',
    readTime: '5 min read',
    category: 'Investment',
    featured: false,
  },
  {
    id: 6,
    title: 'Villa vs Apartment: Which is Better?',
    excerpt: 'Compare the pros and cons of villas and apartments for long-term investment and living.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Mar 5, 2026',
    readTime: '6 min read',
    category: 'Guide',
    featured: false,
  },
  {
    id: 7,
    title: 'Gated Community Benefits',
    excerpt: 'Security, lifestyle & value. Discover why gated communities are becoming the preferred choice.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Feb 28, 2026',
    readTime: '4 min read',
    category: 'Lifestyle',
    featured: false,
  },
  {
    id: 8,
    title: 'Plot Investment Guide',
    excerpt: 'Why land is the best investment. Learn the fundamentals of profitable plot investments.',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
    category: 'Investment',
    featured: false,
  },
  {
    id: 9,
    title: 'Smart Home Trends',
    excerpt: 'Future-ready homes. Explore the latest smart home technologies transforming modern living.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Feb 15, 2026',
    readTime: '5 min read',
    category: 'Technology',
    featured: false,
  },
  {
    id: 10,
    title: 'Affordable Housing Options',
    excerpt: 'Budget-friendly homes without compromising on quality. Find your dream home within budget.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Feb 10, 2026',
    readTime: '4 min read',
    category: 'Guide',
    featured: false,
  },
  {
    id: 11,
    title: 'Rental Income Strategies',
    excerpt: 'Passive income through real estate. Maximize your rental returns with expert strategies.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Feb 5, 2026',
    readTime: '6 min read',
    category: 'Investment',
    featured: false,
  },
  {
    id: 12,
    title: 'Commercial vs Residential',
    excerpt: 'Investment comparison. Understand the differences and make informed decisions.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    author: 'SSR Team',
    date: 'Feb 1, 2026',
    readTime: '7 min read',
    category: 'Analysis',
    featured: false,
  },
]

const POSTS_PER_PAGE = 6

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE)
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set())

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)
  const displayedPosts = regularPosts.slice(0, visiblePosts)
  const hasMore = visiblePosts < regularPosts.length

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, regularPosts.length))
  }

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        toast.success('Removed from bookmarks')
      } else {
        newSet.add(postId)
        toast.success('Added to bookmarks')
      }
      return newSet
    })
  }

  const sharePost = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Real Estate Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with trends in real estate, property investment advice, and SSR project news.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#c89b3c] text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button variant="ghost" className="text-[#c89b3c]">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Bookmark 
                        className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-[#c89b3c] text-[#c89b3c]' : 'text-gray-600'}`} 
                      />
                    </button>
                    <button
                      onClick={() => sharePost(post)}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                  
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#c89b3c] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              onClick={loadMore}
              variant="outline"
              className="h-12 px-8 border-2 border-[#c89b3c] text-[#c89b3c] hover:bg-[#c89b3c] hover:text-white font-semibold rounded-full"
            >
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
