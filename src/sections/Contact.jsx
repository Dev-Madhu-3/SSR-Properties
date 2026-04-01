import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 96326 16633", "+91 99002 28668"],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["sales@ssrproperties.in", "info@ssrproperties.in"],
    color: "from-red-500 to-red-600",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["3rd floor, RNX Complex, Tc Palya main road, Anadapura circle, opp. Bharat petrol pump , Kithaganuru, KR Puram",  "Bangalore - 560036"],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9AM - 7PM", "Sunday: 10AM - 7PM"],
    color: "from-purple-500 to-purple-600",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9\+\-\s\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain only digits and be at least 10 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
      const serviceId =
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId =
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SEND_MESSAGE ||
        "template_contact_2";
      const userId = import.meta.env.VITE_EMAILJS_USER_ID || "YOUR_USER_ID";

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          time: new Date().toLocaleString("en-IN"),
          to_email: "sales@ssrproperties.in, info@ssrproperties.in",
        },
        userId,
      );

      setIsSuccess(true);
      toast.success("Thank you! We'll get back to you soon.");
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        setErrors({});
      }, 3000);
    } catch (error) {
      console.error("Email error:", error);
      toast.error(
        "Failed to send message. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
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
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Have a Property Inquiry?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you're looking to buy, sell, or invest — our team is ready
            to guide you.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form & Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get In Touch
              </h3>
              <p className="text-gray-600 mb-6">
                Ready to find your dream property? Let's discuss your
                requirements.
              </p>

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
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                      <div className="relative bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-gray-700 font-medium text-sm block mb-2"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.name ? "border-red-500" : ""}`}
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
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-gray-700 font-medium text-sm block mb-2"
                        >
                          Phone Number *{" "}
                          <span className="text-gray-400 text-xs">
                            (digits only)
                          </span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.phone ? "border-red-500" : ""}`}
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
                    </div>

                    {/* Email */}
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium text-sm block mb-2"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`h-10 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300 ${errors.email ? "border-red-500" : ""}`}
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

                    {/* Message */}
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-gray-700 font-medium text-sm block mb-2"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`min-h-24 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 resize-none transition-all duration-300 ${errors.message ? "border-red-500" : ""}`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <motion.p
                          className="text-red-500 text-xs mt-1.5 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-3xl overflow-hidden h-80 relative">
              <iframe
                src="https://www.google.com/maps?q=13.0237687,77.6951378&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SSR Properties Location"
              />
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-gradient-to-br from-[#c89b3c] to-[#e6c66a] rounded-3xl p-8 text-white">
              <h4 className="text-xl font-bold mb-2">Prefer to Call?</h4>
              <p className="text-white/80 mb-4">
                Our sales team is available to answer your queries immediately.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+919900228668"
                  className="inline-flex items-center gap-2 bg-white text-[#c89b3c] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919900228668"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
