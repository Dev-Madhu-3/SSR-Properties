import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useModal } from "../contexts/ModalContext";
import { projects } from "../Assets/Data";

export default function Projects() {
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openModal } = useModal();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Going":
        return "bg-blue-500";
      case "Ready to Move":
        return "bg-green-500";
      case "New Launch":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

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
              Discover a wide range of individual houses, plots, and residential
              sites — trusted by hundreds of happy homeowners across Bangalore.
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full border-2 hover:bg-[#c89b3c] hover:text-white hover:border-[#c89b3c]"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
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
          Bangalore's rapid growth as an investment hub has surged demand for
          quality housing. Whether you envision a luxurious home, an elegant
          plot, or a well-planned development — SSR Propertie
           offers premium
          and affordable residential projects that blend comfort, convenience,
          and modern elegance. Your dream home is now within reach.
        </motion.p>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Gradient Masks */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" /> */}

          <motion.div
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                  onClick={() => openModal("projectDetail", project)}
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
                      <p className="text-white font-bold text-xl">
                        {project.price}
                      </p>
                        <p className="text-white font-bold text-xl">
                        {project.price2}
                      </p>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal("projectDetail", project);
                      }}
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
    </section>
  );
}