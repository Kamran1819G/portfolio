"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import ContributionGraph from "@/components/ContributionGraph";
import Scroll from "@/assets/SVGs/scroll.svg";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Phone, Instagram, Linkedin, Twitter } from "lucide-react";
import SocialFeedSection from "@/components/SocialFeedSection";

const TechnologiesSection = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const techCollection = collection(db, "technologies");
        const techSnapshot = await getDocs(techCollection);
        const techList = techSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTechnologies(techList);
        setError(null);
      } catch (error) {
        console.error("Error fetching technologies:", error);
        setError("Failed to load technologies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">
            Design, Develop, Maintain, Scale?
          </h2>
          <h3 className="text-2xl font-bold">
            Your Partner in Full Stack Development
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I help turn your ideas into reality - I have a proven track record
            of delivering high-quality software solutions that meet your unique
            needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <img
                src={tech.iconUrl}
                alt={`${tech.name} icon`}
                className="w-5 h-5 object-contain"
              />
              <span className="text-gray-700 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  /*

  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const techCollection = collection(db, 'technologies');
        const techSnapshot = await getDocs(techCollection);
        const techList = techSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTechnologies(techList);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);
  */

  return (
    <main className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between container mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-full md:w-1/2 space-y-6">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
            Introduction 👋
          </span>

          <h1 className="text-4xl md:text-6xl font-bold space-y-2">
            <span className="block">Hello,</span>
            <span className="block">I&apos;m Kamran Khan.</span>
            <span className="block">a Software</span>
            <span className="block">Engineer.</span>
          </h1>

          <a
            href="#projects-section"
            className="inline-flex items-center gap-6 mt-8 group"
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src={Scroll}
                alt="scroll"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-lg font-medium">Scroll down</span>
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="py-20">
        <div className="container mx-auto px-4">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
            Projects 👨🏻‍💻
          </span>
          <h2 className="text-4xl font-bold mb-12">
            <span className="block">Some things</span>
            <span className="block">I&apos;ve worked on.</span>
          </h2>
          <div className="mt-12">
            <ProjectCarousel />
          </div>
        </div>
      </section>

      {/* Contributions Section */}
      <section id="contribution-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
            Open Source 👨🏻‍💻
          </span>
          <h2 className="text-4xl font-bold mb-12">
            <span>My Contributions</span>
          </h2>
          <div className="mt-12">
            <ContributionGraph />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Social Feed Section */}
      <SocialFeedSection
        twitterHandle="kamran1819g"
        linkedinProfileUrl="https://linkedin.com/in/kamran1819g"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  Want a custom software tailored to your needs? Let&apos;s talk
                </h2>
                <p className="text-gray-600 text-lg">
                  I have helped hundreds of clients with their software needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
                    Connect
                  </button>
                  <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-gray-300">
                    <div className="flex gap-4 text-gray-500">
                      <Phone
                        size={20}
                        className="hover:text-gray-700 cursor-pointer transition-colors"
                      />
                      <Instagram
                        size={20}
                        className="hover:text-gray-700 cursor-pointer transition-colors"
                      />
                      <Linkedin
                        size={20}
                        className="hover:text-gray-700 cursor-pointer transition-colors"
                      />
                      <Twitter
                        size={20}
                        className="hover:text-gray-700 cursor-pointer transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/api/placeholder/600/400"
                  alt="Computer classroom with students"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
