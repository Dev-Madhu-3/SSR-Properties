import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../contexts/ModalContext";
import ProjectDetailModal from "./modals/ProjectDetailModal";
import BlogDetailModal from "./modals/BlogDetailModal";
import BookVisitModal from "./modals/BookVisitModal";

const ModalOverlay = () => {
  const { modals, closeAllModals } = useModal();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllModals();
    }
  };

  return (
    <AnimatePresence>
      {(modals.projectDetail.isOpen ||
        modals.blogDetail.isOpen ||
        modals.bookVisit.isOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {modals.projectDetail.isOpen && <ProjectDetailModal />}
            {modals.blogDetail.isOpen && <BlogDetailModal />}
            {modals.bookVisit.isOpen && <BookVisitModal />}
            {modals.contactForm.isOpen && <ContactFormModal />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalOverlay;
