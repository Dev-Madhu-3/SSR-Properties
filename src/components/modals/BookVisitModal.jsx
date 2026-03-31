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
  Clock,
  User,
  Building,
  Sparkles,
  Star,
  ArrowRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "../../contexts/ModalContext";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const BookVisitModal = () => {
  const { modals, closeModal } = useModal();
  const project = modals.bookVisit.data;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email:"",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        project: project?.name || "General Inquiry",
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message,
        to_email: "sales@ssrproperties.in",
      };

      await emailjs.send(
        "service_ssrproperties",
        "template_book_visit",
        templateParams,
        "your_public_key",
      );

      setIsSuccess(true);
      toast.success(
        "Site visit request sent successfully! We'll contact you soon.",
      );
      setTimeout(() => {
        closeModal("bookVisit");
        setIsSuccess(false);
        setFormStep(0);
        setFormData({
          name: "",
          phone: "",
          email:"",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        "Failed to send request. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto max-h-[85vh] flex flex-col">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 pointer-events-none"></div>
      
      {/* Header */}
      <motion.div 
        className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white"
        initial={{ height: "auto" }}
        animate={{ height: "auto" }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-white/10"></div>
        </div>
        
        <motion.button
          onClick={() => closeModal("bookVisit")}
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/30 transition-all duration-300 z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
        
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
          
          {project && (
            <motion.div 
              className="mt-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                <div>
                  <h3 className="font-semibold text-sm">{project.name}</h3>
                  <p className="text-xs text-white/80 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1" />
                    {project.location}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Compact Progress indicator */}
      <div className="relative z-10 px-6 pt-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${formStep >= 0 ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'} transition-all duration-300`}>
              <User className="w-3 h-3" />
            </div>
            <div className={`h-0.5 w-10 mx-1 ${formStep >= 1 ? 'bg-amber-500' : 'bg-gray-300'} transition-all duration-300`}></div>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${formStep >= 1 ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'} transition-all duration-300`}>
              <Calendar className="w-3 h-3" />
            </div>
            <div className={`h-0.5 w-10 mx-1 ${formStep >= 2 ? 'bg-amber-500' : 'bg-gray-300'} transition-all duration-300`}></div>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${formStep >= 2 ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-600'} transition-all duration-300`}>
              <Send className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mb-2">
          Step {formStep + 1} of 3
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 relative z-10">
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
                Request Sent Successfully!
              </h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto">
                We'll contact you within 24 hours to confirm your appointment.
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  +91 98765 43210
                </div>
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  sales@ssrproperties.in
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Step 1: Personal Information */}
              {formStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <motion.div
                    custom={0}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="name" className="text-gray-700 font-medium text-sm flex items-center">
                      <User className="w-3 h-3 mr-1.5 text-amber-500" />
                      Full Name *
                    </Label>
                    <motion.div
                      className="relative mt-1.5"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        className={`h-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${focusedField === "name" ? "shadow-md" : ""}`}
                        placeholder="Enter your full name"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="phone" className="text-gray-700 font-medium text-sm flex items-center">
                      <Phone className="w-3 h-3 mr-1.5 text-amber-500" />
                      Phone Number *
                    </Label>
                    <motion.div
                      className="relative mt-1.5"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        className={`h-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${focusedField === "phone" ? "shadow-md" : ""}`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="email" className="text-gray-700 font-medium text-sm flex items-center">
                      <Mail className="w-3 h-3 mr-1.5 text-amber-500" />
                      Email Address *
                    </Label>
                    <motion.div
                      className="relative mt-1.5"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        className={`h-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${focusedField === "email" ? "shadow-md" : ""}`}
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex justify-end mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="h-10 px-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Next
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Visit Details */}
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <motion.div
                    custom={0}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="preferredDate" className="text-gray-700 font-medium text-sm flex items-center">
                      <Calendar className="w-3 h-3 mr-1.5 text-amber-500" />
                      Preferred Date *
                    </Label>
                    <motion.div
                      className="relative mt-1.5"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("preferredDate")}
                        onBlur={handleBlur}
                        className={`h-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${focusedField === "preferredDate" ? "shadow-md" : ""}`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="preferredTime" className="text-gray-700 font-medium text-sm flex items-center">
                      <Clock className="w-3 h-3 mr-1.5 text-amber-500" />
                      Preferred Time *
                    </Label>
                    <motion.div
                      className="relative mt-1.5"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("preferredTime")}
                        onBlur={handleBlur}
                        className={`h-10 w-full border border-gray-300 rounded-lg px-3 focus:border-amber-500 focus:ring-amber-500 focus:outline-none transition-all duration-300 text-sm ${focusedField === "preferredTime" ? "shadow-md" : ""}`}
                      >
                        <option value="">Select time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="message" className="text-gray-700 font-medium text-sm">
                      Additional Message
                    </Label>
                    <motion.div
                      className="relative mt-1.5"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        className="min-h-20 border-gray-300 focus:border-amber-500 focus:ring-amber-500 resize-none transition-all duration-300 text-sm"
                        placeholder="Tell us about your requirements..."
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="bg-amber-50 p-3 rounded-lg border border-amber-200"
                    custom={3}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900 text-sm mb-1">
                          Visit Location
                        </h4>
                        <p className="text-amber-700 text-xs">
                          {project
                            ? `${project.name}, ${project.location}`
                            : "SSR Properties Office, Kithaganuru, KR Puram, Bangalore - 560035"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-between mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="button"
                      onClick={() => setFormStep(0)}
                      variant="outline"
                      className="h-10 px-4 border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="h-10 px-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Review
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Review & Submit */}
              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <motion.div
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-1.5 text-amber-500" />
                      Review Your Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Name:</span>
                        <span className="font-medium text-sm">{formData.name}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Phone:</span>
                        <span className="font-medium text-sm">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Email:</span>
                        <span className="font-medium text-sm">{formData.email}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Date:</span>
                        <span className="font-medium text-sm">{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-600 text-sm">Time:</span>
                        <span className="font-medium text-sm">{formData.preferredTime}</span>
                      </div>
                      {formData.message && (
                        <div className="pt-1.5">
                          <span className="text-gray-600 text-sm">Message:</span>
                          <p className="mt-1 text-gray-800 text-sm">{formData.message}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-amber-50 p-3 rounded-lg border border-amber-200"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-amber-100 rounded-full p-1.5 mr-2">
                        <MapPin className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900 text-sm mb-1">
                          Visit Location
                        </h4>
                        <p className="text-amber-700 text-xs">
                          {project
                            ? `${project.name}, ${project.location}`
                            : "SSR Properties Office, Kithaganuru, KR Puram, Bangalore - 560035"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-between mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="button"
                      onClick={() => setFormStep(1)}
                      variant="outline"
                      className="h-10 px-4 border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-10 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50 text-sm"
                      whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
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
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookVisitModal;