"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, EffectCreative } from "swiper/modules";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase";
import { Clock, ExternalLink, Github, Code } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import { LinkPreview } from "./ui/link-preview";

const ProjectCard = ({ project }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [techIcons, setTechIcons] = useState({});

  useEffect(() => {
    const storage = getStorage();

    // Fetch main project image
    const fetchMainImage = async () => {
      if (project.imagePath) {
        try {
          const url = await getDownloadURL(ref(storage, project.imagePath));
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching main image:", error);
        }
      }
    };

    // Fetch technology icons
    const fetchTechIcons = async () => {
      const icons = {};
      if (project.technologies) {
        for (const tech of project.technologies) {
          if (tech.iconPath) {
            try {
              const url = await getDownloadURL(ref(storage, tech.iconPath));
              icons[tech.iconPath] = url;
            } catch (error) {
              console.error(`Error fetching icon for ${tech.name}:`, error);
            }
          }
        }
        setTechIcons(icons);
      }
    };

    fetchMainImage();
    fetchTechIcons();
  }, [project]);

  if (!project) return null;

  const {
    title,
    description,
    technologies,
    sourceCodeLink,
    deployLink,
    status,
  } = project;

  return (
    <Card className="w-full max-w-sm mx-auto h-full bg-white overflow-hidden">
      <div className="h-48 w-full bg-gray-100">
        {imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <CardHeader>
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
          {title}
        </h2>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 overflow-hidden max-h-16">
          {technologies?.map((tech, i) => (
            <Badge
              key={i}
              variant="secondary"
              style={{
                backgroundColor: tech.color || "#c9fd74",
                color: tech.color ? "#fff" : "#000",
              }}
              className="text-white rounded-full px-2 flex items-center gap-1"
            >
              {tech.iconPath && techIcons[tech.iconPath] && (
                <img
                  src={techIcons[tech.iconPath]}
                  alt={tech.name}
                  className="w-3 h-3 mr-1 object-contain"
                />
              )}
              {tech.name}
            </Badge>
          ))}
        </div>

        <p className="text-gray-600 line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
        {sourceCodeLink && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <a href={sourceCodeLink} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              Source
            </a>
          </Button>
        )}

        {deployLink && (
          <Button size="sm" className="flex items-center gap-1" asChild>
            <LinkPreview url={deployLink}>
              <ExternalLink className="h-4 w-4" />
              Live
            </LinkPreview>
          </Button>
        )}

        {status !== "completed" && (
          <Badge variant="warning" className="flex items-center gap-1 p-2">
            <Clock className="h-4 w-4" />
            In Progress
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <Code className="h-12 w-12 text-primary animate-pulse" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-1 w-1 bg-primary rounded-full absolute top-0 left-1/2" />
      </motion.div>
    </div>
    <p className="text-lg text-gray-600">Loading awesome projects...</p>
  </div>
);

const ProjectCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects...");
        const projectsRef = collection(db, "projects");
        const querySnapshot = await getDocs(projectsRef);

        const processedProjects = querySnapshot.docs.map((doc) => {
          const projectData = doc.data();
          return {
            id: doc.id,
            ...projectData,
          };
        });

        console.log("Fetched projects:", processedProjects);
        setProjects(processedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (projects.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative px-4">
      <Swiper
        modules={[Autoplay, Keyboard, EffectCreative]}
        autoplay={{ delay: 5000 }}
        keyboard
        grabCursor={true}
        spaceBetween={24}
        className="w-full"
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            effect: "creative",
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectCarousel;
