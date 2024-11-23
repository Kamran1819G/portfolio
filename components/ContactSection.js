"use client";

import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Check,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

const Toast = ({ message }) => (
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
        className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100"
      >
        <Check className="w-4 h-4 text-green-600" />
      </motion.div>
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 3 }}
      className="h-1 bg-green-500 origin-left"
    />
  </motion.div>
);

const InputWrapper = ({ children }) => (
  <div className="relative">
    {children}
    <div className="absolute inset-0 rounded-xl border border-gray-200 pointer-events-none transition-all peer-focus:border-blue-500 peer-focus:ring-4 peer-focus:ring-blue-100" />
  </div>
);

export default function ContactSection() {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted", formData);
      setShowToast(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
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
        {showToast && <Toast message="Message sent successfully!" />}
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
                          className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl focus:outline-none focus:bg-white transition-colors"
                          placeholder="Enter your name"
                          required
                        />
                      </InputWrapper>
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
                          className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl focus:outline-none focus:bg-white transition-colors"
                          placeholder="Enter your email"
                          required
                        />
                      </InputWrapper>
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
                          className="peer w-full px-4 py-3 bg-gray-50/50 rounded-xl focus:outline-none focus:bg-white transition-colors resize-none"
                          placeholder="Enter your message"
                          rows={4}
                          required
                        />
                      </InputWrapper>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex gap-4">
                        {socialLinks.map((link, index) => (
                          <SocialLink key={index} {...link} />
                        ))}
                      </div>

                      <Button
                        type="submit"
                        className="relative overflow-hidden group hover:text-white"
                      >
                        <span className="relative z-10">Send Message</span>
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
