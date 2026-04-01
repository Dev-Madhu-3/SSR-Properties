import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  X,
  MapPin,
  Home,
  Calendar,
  Check,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Share2,
  Wifi,
  Car,
  Dumbbell,
  Trees,
  Building,
  Users,
  Shield,
  Zap,
  Eye,
  ArrowRight,
  Play,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useModal } from "../../contexts/ModalContext";

const ProjectDetailModal = () => {
  const { modals, closeModal, openModal } = useModal();
  const project = modals.projectDetail.data;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const controls = useAnimation();

  // Generate additional images for the carousel
  const projectImages = project ? [
    project.image,
    `https://picsum.photos/seed/${project.name}1/1200/800.jpg`,
    `https://picsum.photos/seed/${project.name}2/1200/800.jpg`,
    `https://picsum.photos/seed/${project.name}3/1200/800.jpg`,
    `https://picsum.photos/seed/${project.name}4/1200/800.jpg`,
  ] : [];

  useEffect(() => {
    if (modals.projectDetail.isOpen) {
      controls.start("visible");
      setIsClosing(false);
    }
  }, [controls, modals.projectDetail.isOpen]);

  const nextImage = () => {
    if (!isClosing) {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }
  };

  const prevImage = () => {
    if (!isClosing) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + projectImages.length) % projectImages.length,
      );
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    closeModal("projectDetail");
  };

  const handleBookVisit = () => {
    if (!isClosing) {
      setIsClosing(true);
      closeModal("projectDetail");
      // Use a timeout to ensure the modal has time to close before opening a new one
      setTimeout(() => {
        openModal("bookVisit", project);
      }, 300);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Going":
        return "from-blue-500 to-blue-600";
      case "Ready to Move":
        return "from-green-500 to-green-600";
      case "New Launch":
        return "from-purple-500 to-purple-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const amenityIcons = {
    "High-Speed Internet": Wifi,
    Parking: Car,
    Garden: Trees,
    Security: Shield,
    "Power Backup": Zap,
    "Club House": Users,
    "Swimming Pool": Dumbbell,
  };

  const amenities = [
    "High-Speed Internet",
    "Parking",
    "Garden",
    "Security",
    "Power Backup",
    "Club House",
    "Swimming Pool",
  ];

  return (
    <AnimatePresence mode="wait">
      {modals.projectDetail.isOpen && project && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Fixed Header with Close Button */}
          <div className="relative z-10 bg-gradient-to-b from-slate-900/90 to-transparent p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Badge
                  className={`bg-gradient-to-r ${getStatusColor(project.status)} text-white border-0 shadow-lg px-4 py-2`}
                >
                  {project.status}
                </Badge>
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                  <span className="text-white text-sm font-medium">
                    4.8 (124)
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !isClosing && setIsFavorite(!isFavorite)}
                  className="bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/20 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/20 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseModal}
                  className="bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/20 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
            {/* Image Carousel */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={projectImages[currentImageIndex]}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {projectImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isClosing && setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Project Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-bold text-white mb-2 drop-shadow-lg"
                >
                  {project.name}
                </motion.h1>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center text-white/90 mb-2"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-sm">{project.location}</span>
                </motion.div>
                <motion.p
                  variants={itemVariants}
                  className="text-white font-bold text-2xl drop-shadow-lg"
                >
                  {project.price}
                </motion.p>
              </div>
            </motion.div>

            {/* Content Sections */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-md rounded-xl p-4 border border-amber-500/20">
                  <Building className="w-6 h-6 text-amber-500 mb-2" />
                  <p className="text-gray-400 text-xs">Total Units</p>
                  <p className="text-white font-bold text-xl">
                    {project.units}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-md rounded-xl p-4 border border-blue-500/20">
                  <Home className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-gray-400 text-xs">Type</p>
                  <p className="text-white font-bold text-sm">{project.type}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-md rounded-xl p-4 border border-green-500/20">
                  <Trees className="w-6 h-6 text-green-500 mb-2" />
                  <p className="text-gray-400 text-xs">Green Area</p>
                  <p className="text-white font-bold text-xl">70%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20">
                  <Calendar className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-gray-400 text-xs">Completion</p>
                  <p className="text-white font-bold text-sm">
                    {project.completion}
                  </p>
                </div>
              </motion.div>

              {/* Project Overview */}
              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-amber-500 mr-3 rounded-full"></span>
                  Project Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Configuration Details */}
              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-amber-500 mr-3 rounded-full"></span>
                  Available Configurations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.features.includes("2 BHK") && (
                    <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 hover:from-white/10 hover:to-white/15 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <Bed className="w-5 h-5 text-amber-500" />
                        <span className="text-amber-500 font-bold">
                          Popular
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-1">
                        2 BHK
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        1,250 - 1,450 sq.ft
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>2</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span>2</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>2</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.features.includes("3 BHK") && (
                    <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 hover:from-white/10 hover:to-white/15 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <Bed className="w-5 h-5 text-amber-500" />
                        <span className="text-green-500 font-bold">
                          Spacious
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-1">
                        3 BHK
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        1,650 - 1,850 sq.ft
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>3</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span>3</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>3</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 hover:from-white/10 hover:to-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <Building className="w-5 h-5 text-amber-500" />
                      <span className="text-purple-500 font-bold">Premium</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Individual Houses & Plots
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      800 - 1800 sq.ft
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>4</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>4</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>Private</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-amber-500 mr-3 rounded-full"></span>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <Check className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-amber-500 mr-3 rounded-full"></span>
                  Premium Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity];
                    return (
                      <motion.div
                        key={amenity}
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center hover:from-white/10 hover:to-white/15 transition-all duration-300"
                      >
                        <IconComponent className="w-8 h-8 text-amber-500 mb-2" />
                        <span className="text-white text-xs font-medium text-center">
                          {amenity}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Virtual Tour */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-500" />
                    Virtual Tour
                  </h3>
                </div>
                <div className="aspect-video bg-black/30 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-blue-500/80 backdrop-blur-sm rounded-full p-4 hover:bg-blue-500/90 transition-all duration-300"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Why Choose This Project */}
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-md p-6 rounded-2xl border border-amber-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-amber-500" />
                    Why Choose This Project?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Prime location with excellent connectivity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Modern amenities and infrastructure
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Trusted developer with proven track record
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        High appreciation potential
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Get In Touch */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-amber-500" />
                    Get In Touch
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-5 h-5 mr-3 text-amber-500" />
                      <span>+91 96326 16633</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-5 h-5 mr-3 text-amber-500" />
                      <span>sales@ssrproperties.in</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleBookVisit}
                      className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center"
                    >
                      Book Site Visit
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;