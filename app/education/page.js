"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  Loader2,
  ExternalLink,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ScrollText,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import ProfessionalImage from "@/assets/images/young-professional-smiling-with-laptop.jpeg";
import Link from "next/link";

// Helper function to fetch image from Firebase Storage
const fetchImageFromPath = async (imagePath) => {
  try {
    if (!imagePath) return null;
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <GraduationCap className="h-12 w-12 text-primary animate-pulse" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-1 w-1 bg-primary rounded-full absolute top-0 left-1/2" />
      </motion.div>
    </div>
    <p className="text-lg text-gray-600">Loading my academic journey...</p>
  </div>
);

const SectionTitle = ({ badge, title, subtitle }) => (
  <div className="text-center space-y-4 mb-16">
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
    >
      {badge}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl font-bold"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ImageComponent = ({ imagePath, alt, className }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      try {
        const url = await fetchImageFromPath(imagePath);
        if (url) {
          setImageUrl(url);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (imagePath) {
      loadImage();
    }
  }, [imagePath]);

  if (loading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100`}
      >
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100`}
      >
        <GraduationCap className="h-8 w-8 text-gray-400" />
      </div>
    );
  }

  return (
    <motion.img src={imageUrl} alt={alt} className={className} loading="lazy" />
  );
};

const EducationCard = ({
  imagePath,
  imgAlt,
  CollegeName,
  education,
  year,
  description,
  location,
  achievements = [],
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group"
    >
      <Card className="bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <div className="md:flex">
          <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
            <ImageComponent
              imagePath={imagePath}
              alt={imgAlt}
              className="w-full h-full object-contain object-center transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="md:w-3/5 p-6 md:p-8 relative">
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white shadow-lg rounded-full whitespace-nowrap">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-primary font-semibold">{year}</span>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {CollegeName}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="h-4 w-4" />
                  <h3 className="font-medium">{education}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{description}</p>

              {achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2 text-primary font-medium group/link cursor-pointer">
              <span>Learn More</span>
              <ExternalLink className="h-4 w-4 transform transition-transform duration-300 group-hover/link:translate-x-1" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const CertificateCard = ({ certLink, imagePath, certName, from, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300">
        <a
          href={certLink}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            <ImageComponent
              imagePath={imagePath}
              alt={certName}
              className="absolute w-full h-full object-fit object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {certName}
                </h2>
                <p className="text-gray-600 mt-1">{from}</p>
              </div>
              <ExternalLink className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CardContent>
        </a>
      </Card>
    </motion.div>
  );
};

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const [educationSnapshot, certificateSnapshot] = await Promise.all([
          getDocs(collection(db, "educations")),
          getDocs(collection(db, "certifications")),
        ]);

        const sortedEducations = educationSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => {
            const startYearA = parseInt(a.startDate.split("-")[0]);
            const startYearB = parseInt(b.startDate.split("-")[0]);
            return startYearB - startYearA;
          });

        setEducations(sortedEducations);

        setCertificates(
          certificateSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertDescription>
            Unable to load education data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <AnimatePresence>
      <main className="min-h-screen w-full">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              badge="Education 👨‍🎓"
              title="Academic Journey"
              subtitle="Building a strong foundation through continuous learning and academic excellence"
            />

            <div className="space-y-8 max-w-7xl mx-auto">
              {educations.map((edu, index) => (
                <EducationCard
                  key={edu.id}
                  imagePath={edu.institutionLogoPath}
                  imgAlt={edu.institution}
                  CollegeName={edu.institution}
                  education={edu.degree}
                  year={`${edu.startDate} - ${edu.endDate || "Present"}`}
                  description={edu.description}
                  location={edu.location}
                  achievements={edu.achievements}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              badge="Certifications 🏆"
              title="Professional Growth"
              subtitle="Expanding expertise through industry-recognized certifications"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {certificates.map((cert, index) => (
                <CertificateCard
                  key={cert.id}
                  certLink={cert.certLink}
                  imagePath={cert.certImagePath}
                  certName={cert.certName}
                  from={cert.from}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row">
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Looking to collaborate on educational projects?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Let&apos;s discuss how we can work together to create
                    impactful learning experiences.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/contact"
                      className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Image
                    src={ProfessionalImage}
                    alt="Professional Image"
                    layout="responsive"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimatePresence>
  );
}
