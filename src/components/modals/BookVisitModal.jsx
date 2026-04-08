import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  Building,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "../../contexts/ModalContext";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const projectVariants = {
  "SSR SIGNATURE GARDENIA": ["Plots", "Individual Houses"],
  "SSR GREEN FARMS": ["FarmLand Plots"],
  "SSR SK SIGNATURE": ["2BHK", "3BHK"],
};

const BookVisitModal = () => {
  const { modals, closeModal } = useModal();
  const project = modals.bookVisit.data;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    projectName: "",
    projectVariant: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Project Name validation
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Please select a project";
    }

    // Project Variant validation (required for SSR SIGNATURE GARDENIA and SSR GREEN FARMS)
    if ((formData.projectName === "SSR SIGNATURE GARDENIA" || formData.projectName === "SSR GREEN FARMS" || formData.projectName === "SSR SK SIGNATURE") && !formData.projectVariant.trim()) {
      newErrors.projectVariant = "Please select a variant";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9\+\-\s\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits and be at least 10 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Reset projectVariant when project changes
    if (name === "projectName") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        projectVariant: "", // Reset variant when project changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    
    // Also clear projectVariant error when clearing the field
    if (name === "projectName") {
      setErrors((prev) => ({
        ...prev,
        projectVariant: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const userId = import.meta.env.VITE_EMAILJS_USER_ID || "YOUR_USER_ID";

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          project: formData.projectName,
          variant: formData.projectVariant,
          message: formData.message,
          to_email: "yanamalaveera01@gmail.com, surendraoffline@gmail.com, sales@ssrproperties.in, info@ssrproperties.in",
        },
        userId
      );

      setIsSuccess(true);
      toast.success("Thank you! We will contact you within 24 hours.");
      
      setTimeout(() => {
        closeModal("bookVisit");
        setIsSuccess(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          projectName: "",
          projectVariant: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to send request. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto max-h-[85vh] flex flex-col">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 pointer-events-none"></div>
      
      {/* Header */}
      <motion.div 
        className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white"
        initial={{ height: "auto" }}
        animate={{ height: "auto" }}
      >
        <button
          onClick={() => closeModal("bookVisit")}
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/30 transition-all duration-300 z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="relative z-10">
          <motion.div 
            className="flex items-center mb-1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Building className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">Book Your Site Visit</h2>
          </motion.div>
          <motion.p 
            className="text-white/90 text-sm ml-8"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Schedule a personalized tour of your dream property
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                className="relative inline-flex justify-center items-center w-16 h-16 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                <div className="relative bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 text-sm max-w-sm">
                We've received your booking request. We'll contact you within 24 hours to confirm your site visit.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Full Name Field */}
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium text-sm block mb-2">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <motion.p 
                    className="text-red-500 text-xs mt-1.5 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Project Name Field */}
              <div>
                <Label htmlFor="projectName" className="text-gray-700 font-medium text-sm block mb-2">
                  Select Project *
                </Label>
                <select
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className={`h-10 w-full border border-gray-300 rounded-lg px-3 focus:border-amber-500 focus:ring-amber-500 focus:outline-none transition-all duration-300 text-sm ${errors.projectName ? 'border-red-500' : ''}`}
                >
                  <option value="">Choose a project</option>
                  <option value="SSR SIGNATURE GARDENIA">SSR SIGNATURE GARDENIA</option>
                  <option value="SSR GREEN FARMS">SSR GREEN FARMS</option>
                  <option value="SSR SK SIGNATURE">SSR SK SIGNATURE</option>
                </select>
                {errors.projectName && (
                  <motion.p 
                    className="text-red-500 text-xs mt-1.5 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.projectName}
                  </motion.p>
                )}
              </div>

              {/* Project Variant Field - Appears only for SSR SIGNATURE GARDENIA and SSR GREEN FARMS */}
              {(formData.projectName === "SSR SIGNATURE GARDENIA" || formData.projectName === "SSR GREEN FARMS" || formData.projectName === "SSR SK SIGNATURE") && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="projectVariant" className="text-gray-700 font-medium text-sm block mb-2">
                    Select Variant *
                  </Label>
                  <select
                    id="projectVariant"
                    name="projectVariant"
                    value={formData.projectVariant}
                    onChange={handleInputChange}
                    className={`h-10 w-full border border-gray-300 rounded-lg px-3 focus:border-amber-500 focus:ring-amber-500 focus:outline-none transition-all duration-300 text-sm ${errors.projectVariant ? 'border-red-500' : ''}`}
                  >
                    <option value="">Choose a variant</option>
                    {projectVariants[formData.projectName]?.map((variant) => (
                      <option key={variant} value={variant}>
                        {variant}
                      </option>
                    ))}
                  </select>
                  {errors.projectVariant && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1.5 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.projectVariant}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium text-sm block mb-2">
                  Phone Number * <span className="text-gray-400 text-xs">(digits only)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="10 digits minimum"
                />
                {errors.phone && (
                  <motion.p 
                    className="text-red-500 text-xs mt-1.5 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm block mb-2">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <motion.p 
                    className="text-red-500 text-xs mt-1.5 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Date Field */}
              <div>
                <Label htmlFor="date" className="text-gray-700 font-medium text-sm block mb-2">
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium text-sm block mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-20 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 resize-none transition-all duration-300 text-sm"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              {/* Submit Button */}
              <motion.div
                className="flex justify-end pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookVisitModal;