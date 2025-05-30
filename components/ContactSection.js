"use client";

import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Check,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Avatar from "@/assets/SVGs/Avatar2.svg";
import WIFI from "@/assets/SVGs/wifi.svg";

const SocialLink = ({ href, icon: Icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${color} transition-colors duration-300 hover:opacity-80`}
  >
    <Icon size={24} />
  </a>
);

const Toast = ({ message, type = "success" }) => (
  <motion.div
    initial={{ opacity: 0, y: -100, scale: 0.6 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -100, scale: 0.6 }}
    className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div className="flex items-center space-x-2 p-4 pr-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className={`flex items-center justify-center w-6 h-6 rounded-full ${
          type === "success" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <Check
          className={`w-4 h-4 ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        />
      </motion.div>
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 3 }}
      className={`h-1 origin-left ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    />
  </motion.div>
);

const InputWrapper = ({ children }) => (
  <div className="relative">
    {children}
    <div className="absolute inset-0 rounded-xl border border-gray-200 pointer-events-none transition-all peer-focus:border-blue-500 peer-focus:ring-4 peer-focus:ring-blue-100" />
  </div>
);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function ContactSection() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "unread",
      });

      console.log("Document written with ID: ", docRef.id);
      showToastMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      showToastMessage("Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      href: "https://linkedin.com/in/kamran1819g",
      icon: Linkedin,
      color: "text-blue-600",
    },
    {
      href: "https://github.com/kamran1819g",
      icon: Github,
      color: "text-gray-800",
    },
    {
      href: "https://facebook.com/kamran1819g",
      icon: Facebook,
      color: "text-blue-800",
    },
    {
      href: "https://instagram.com/kamran1819g",
      icon: Instagram,
      color: "text-pink-600",
    },
    {
      href: "mailto:kamrankhan.sde@gmail.com",
      icon: Mail,
      color: "text-red-600",
    },
  ];

  return (
    <section className="py-10 bg-gray-50 relative" id="contact">
      <AnimatePresence>
        {showToast && <Toast message={toastMessage} type={toastType} />}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
            Say hello 👋
          </span>

          <h2 className="text-4xl font-bold mb-12">Contact Me</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <InputWrapper>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`peer w-full px-4 py-3 bg-gray-50/50 rounded-xl focus:outline-none focus:bg-white transition-colors ${
                            errors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your name"
                        />
                      </InputWrapper>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <InputWrapper>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`peer w-full px-4 py-3 bg-gray-50/50 rounded-xl focus:outline-none focus:bg-white transition-colors ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your email"
                        />
                      </InputWrapper>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <InputWrapper>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`peer w-full px-4 py-3 bg-gray-50/50 rounded-xl focus:outline-none focus:bg-white transition-colors resize-none ${
                            errors.message ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your message"
                          rows={4}
                        />
                      </InputWrapper>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex gap-4">
                        {socialLinks.map((link, index) => (
                          <SocialLink key={index} {...link} />
                        ))}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative overflow-hidden group hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </span>
                        <div className="absolute inset-0 bg-blue-600 transform translate-y-full transition-transform group-hover:translate-y-0" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src={Avatar}
                  alt="Contact illustration"
                  className="w-full h-auto rounded-2xl"
                  priority
                />
                <Image
                  src={WIFI}
                  alt="WiFi icon"
                  className="absolute -top-4 -right-4 w-1/5 transform rotate-12"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
