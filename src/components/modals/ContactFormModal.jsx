import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "../../contexts/ModalContext";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const ContactFormModal = () => {
  const { closeModal } = useModal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: "info@ssrproperties.in",
      };

      await emailjs.send(
        "service_ssrproperties", // Replace with your EmailJS service ID
        "template_contact", // Replace with your EmailJS template ID
        templateParams,
        "your_public_key", // Replace with your EmailJS public key
      );

      setIsSuccess(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setTimeout(() => {
        closeModal("contactForm");
        setIsSuccess(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        "Failed to send message. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] p-8 text-white">
        <button
          onClick={() => closeModal("contactForm")}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
        <p className="text-white/90">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16 px-8"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-600 text-lg">
              Thank you for contacting us. We'll get back to you within 24
              hours.
            </p>
          </motion.div>
        ) : (
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2 h-12 border-gray-300 focus:border-[#c89b3c] focus:ring-[#c89b3c]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2 h-12 border-gray-300 focus:border-[#c89b3c] focus:ring-[#c89b3c]"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 h-12 border-gray-300 focus:border-[#c89b3c] focus:ring-[#c89b3c]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-gray-700 font-medium">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="mt-2 h-12 border-gray-300 focus:border-[#c89b3c] focus:ring-[#c89b3c]"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-2 min-h-32 border-gray-300 focus:border-[#c89b3c] focus:ring-[#c89b3c] resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-[#c89b3c] to-[#e6c66a] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#c89b3c]/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[#c89b3c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91 96326 16633</p>
                    <p className="text-gray-600">+91 99002 28668</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#c89b3c]/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-[#c89b3c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">sales@ssrproperties.in</p>
                    <p className="text-gray-600">info@ssrproperties.in</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#c89b3c]/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#c89b3c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">Kithaganuru, KR Puram</p>
                    <p className="text-gray-600">Bangalore - 560035</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#c89b3c]/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-[#c89b3c]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Working Hours
                    </h4>
                    <p className="text-gray-600">Mon - Sat: 9AM - 7PM</p>
                    <p className="text-gray-600">Sunday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactFormModal;
