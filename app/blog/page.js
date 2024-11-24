"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Tag,
  User,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Helper functions remain the same
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(timestamp) {
  if (!timestamp) return "No date";
  try {
    if (timestamp?.toDate) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(timestamp.toDate());
    }
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "No date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "No date";
  }
}

function calculateReadTime(content) {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime);
}

const MotionCard = motion(Card);

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, "blogs");
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            slug: data.slug || createSlug(data.title),
            createdAt: data.createdAt,
            readTime: calculateReadTime(data.content),
            imageUrl: data.imageUrl || "/api/placeholder/800/400",
            author: data.author || "Anonymous",
            category: data.category || "Uncategorized",
            excerpt:
              data.excerpt ||
              (data.content
                ? data.content.substring(0, 150) + "..."
                : "No content available"),
          };
        });

        const uniqueCategories = [
          ...new Set(fetchedPosts.map((post) => post.category)),
        ];
        setCategories(["all", ...uniqueCategories]);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Newspaper className="h-12 w-12 text-primary" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-1 w-1 bg-primary rounded-full absolute top-0 left-1/2" />
          </motion.div>
        </motion.div>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading my blog posts...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-4">
            Blog Posts 📝
          </motion.span>
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Latest Articles & Insights
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore the latest trends, tutorials, and insights in software
            development, technology, and digital innovation.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <MotionCard
                    className="overflow-hidden h-full cursor-pointer"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="relative h-48 w-full overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </motion.div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {post.readTime} min read
                        </span>
                      </div>
                      <h2 className="text-xl font-bold hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-600" />
                          <span className="text-sm text-gray-600">
                            {post.author}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Tag size={14} />
                          {post.category}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <motion.div
                        className="flex items-center text-blue-600 gap-1 group"
                        whileHover={{ x: 5 }}
                      >
                        <span>Read More</span>
                        <ChevronRight
                          size={16}
                          className="transition-transform group-hover:translate-x-2"
                        />
                      </motion.div>
                    </CardFooter>
                  </MotionCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center">
              <p className="text-gray-600">No posts found in this category.</p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
