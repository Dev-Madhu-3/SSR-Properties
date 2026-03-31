import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  X,
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  TrendingUp,
  Eye,
  Sparkles,
  Quote,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useModal } from "../../contexts/ModalContext";

const BlogDetailModal = () => {
  const { modals, closeModal } = useModal();
  const post = modals.blogDetail.data;
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: contentRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollTop(contentRef.current.scrollTop > 300);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      return () => contentElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!post) return null;

  // Split content into paragraphs for animation
  const paragraphs = post.content.split("\n\n");

  // Related posts data
  const relatedPosts = [
    {
      id: 1,
      title: "Investment Strategies for 2026",
      excerpt: "Learn about emerging trends in property investment...",
      image: "https://picsum.photos/seed/investment/800/600.jpg",
      category: "Investment",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Bangalore Real Estate Market Analysis",
      excerpt: "Comprehensive analysis of current market conditions...",
      image: "https://picsum.photos/seed/bangalore/800/600.jpg",
      category: "Market Analysis",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Luxury Living Spaces: The Future",
      excerpt: "Exploring innovative designs in premium real estate...",
      image: "https://picsum.photos/seed/luxury/800/600.jpg",
      category: "Design",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Floating close button */}
        <motion.button
          onClick={() => closeModal("blogDetail")}
          className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md rounded-full p-2.5 hover:bg-white transition-all duration-300 shadow-xl border border-white/20"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-gray-700" />
        </motion.button>

        {/* Progress bar */}
        <motion.div
          className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 origin-left z-10"
          style={{ scaleX }}
        />

        {/* Scrollable content area */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          {/* Hero Image Section - Now scrollable */}
          <div className="relative">
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.8 }}
              />

              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-10 left-10 w-20 h-20 rounded-full bg-amber-400/20 blur-xl"
                animate={{
                  x: [0, 15, 0],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-blue-400/20 blur-xl"
                animate={{
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Content overlay on image */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 mb-3 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {post.title}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center text-white/90 text-sm md:text-base gap-x-4 gap-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-6 h-6 rounded-full bg-white/20 mr-2 flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    {post.author}
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {post.date}
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <Eye className="w-3 h-3 mr-1.5" />
                    {post.views || "1.2k"} views
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto p-6 md:p-8">
            {/* Engagement Bar */}
            <motion.div
              className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isLiked
                      ? "bg-red-50 text-red-500 border border-red-200 shadow-sm"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span className="text-sm font-medium">
                    {isLiked ? "Liked" : "Like"}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">24</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isSaved
                      ? "bg-amber-50 text-amber-600 border border-amber-200 shadow-sm"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  <span className="text-sm font-medium">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Article Body */}
            <div className="py-8">
              <motion.p
                className="text-xl text-gray-600 leading-relaxed mb-8 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {post.excerpt}
              </motion.p>

              <div className="prose prose-lg max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Featured Quote */}
              <motion.div
                className="my-12 p-6 md:p-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-l-4 border-amber-500 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-start">
                  <Quote className="w-8 h-8 text-amber-500 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 italic text-lg mb-2">
                      "The best investment on Earth is earth itself. Real estate
                      cannot be lost or stolen, nor can it be carried away.
                      Purchased with common sense, paid for in full, and managed
                      with reasonable care, it is about the safest investment in
                      the world."
                    </p>
                    <p className="text-gray-600 font-medium">
                      — Franklin D. Roosevelt
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Article Tags */}
              <motion.div
                className="flex flex-wrap gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                {[
                  "Real Estate",
                  "Investment",
                  "Bangalore",
                  "Luxury",
                  "Property",
                ].map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-xs rounded-full hover:bg-amber-50 hover:border-amber-300 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Author Bio */}
            <motion.div
              className="py-8 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 p-0.5"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <User className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                </motion.div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {post.author}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Senior Real Estate Analyst
                  </p>
                  <p className="text-gray-600 text-sm max-w-2xl">
                    With over 15 years of experience in the real estate market,{" "}
                    {post.author.split(" ")[0]} provides expert insights on
                    property investment trends and market analysis.
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="mt-4 md:mt-0 border-amber-500 text-amber-600 hover:bg-amber-50 rounded-full"
                  >
                    Follow
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              className="py-8 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Related Articles
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute bottom-3 left-3 bg-white/90 text-gray-800 text-xs backdrop-blur-sm">
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {relatedPost.readTime}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-amber-600 text-sm font-medium flex items-center hover:text-amber-700"
                        >
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div
              className="my-12 p-8 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-2xl text-white relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Stay Updated
                  </h3>
                  <p className="text-white/90">
                    Get the latest real estate insights delivered to your inbox
                  </p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                  <motion.input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2.5 rounded-lg text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 backdrop-blur-sm"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-white text-amber-600 hover:bg-gray-100 rounded-lg font-medium px-6">
                      Subscribe
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-xl flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BlogDetailModal;
