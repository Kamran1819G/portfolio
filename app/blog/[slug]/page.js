"use client";

import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { ref, getBlob } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import MarkdownComponents from "@/components/MarkdownComponents";
import remarkGfm from "remark-gfm";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ShareButton from "@/components/ShareButton";
import TableOfContents from "@/app/blog/TableOfContents";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const stripMarkdown = (markdown) => {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove image links
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove regular links
    .replace(/[*_~`>#-]+/g, "") // Remove Markdown syntax
    .replace(/\n{2,}/g, "\n") // Replace multiple newlines with a single newline
    .trim();
};

const formatDate = (timestamp) => {
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
    return "No date";
  }
};

const calculateReadTime = (content) => {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const fetchMarkdownContent = async (storagePath) => {
  if (!storagePath) return null;

  try {
    const storageRef = ref(storage, storagePath);

    // Use getBlob instead of direct fetch
    const blob = await getBlob(storageRef);
    const text = await blob.text();
    return text;
  } catch (error) {
    console.error("Error fetching markdown from storage:", error);
    return null;
  }
};

const BlogSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 px-4">
    <div className="h-[500px] w-full bg-gray-200 rounded-2xl animate-pulse" />
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-12 w-3/4" />
      <div className="flex gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  </div>
);

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full transition-all duration-200"
        style={{
          width: `${progress}%`,
          background: `var(--primary-color)`,
          transition: "width 0.3s ease-out",
        }}
      />
    </div>
  );
};

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  // Create refs to store speech synthesis instances
  const speechSynthesisRef = useRef(null);
  const utteranceRef = useRef(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    // Enhanced cleanup function
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
        setIsPlaying(false);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchPost() {
      if (!params?.slug) {
        setError("Post slug not found");
        setLoading(false);
        return;
      }

      try {
        const blogsRef = collection(db, "blogs");
        const querySnapshot = await getDocs(query(blogsRef));
        let foundPost = null;
        const allPosts = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const postData = {
            id: doc.id,
            ...data,
            slug: data.slug || createSlug(data.title),
            readTime: calculateReadTime(data.content),
            imageUrl: data.imageUrl || "/api/placeholder/1200/600",
            author: data.author || "Anonymous",
            category: data.category || "Uncategorized",
            shareCount: data.shareCount || 0,
          };

          allPosts.push(postData);

          if (postData.slug === params.slug) {
            foundPost = postData;
          }
        });

        if (foundPost) {
          setPost(foundPost);
          setShareCount(foundPost.shareCount);

          // Handle content with better error handling
          let content = foundPost.content || "";

          if (foundPost.storagePath) {
            // Now using storagePath instead of contentLink
            try {
              const markdownContent = await fetchMarkdownContent(
                foundPost.storagePath
              );
              if (markdownContent) {
                content = markdownContent;
              } else {
                console.warn(
                  "Failed to fetch markdown content, falling back to default content"
                );
              }
            } catch (contentError) {
              console.error("Error fetching markdown content:", contentError);
              setError(
                "Failed to load article content. Falling back to default content."
              );
            }
          }

          setMarkdownContent(content);

          // Handle related posts
          const related = allPosts
            .filter(
              (p) => p.category === foundPost.category && p.id !== foundPost.id
            )
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params?.slug, router]);

  const incrementShareCount = async (postId) => {
    try {
      const postRef = doc(db, "blogs", postId);
      await updateDoc(postRef, {
        shareCount: increment(1),
      });
      setShareCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating share count:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || "",
          text: post?.excerpt || "",
          url: window.location.href,
        });
        // Increment share count after successful share
        await incrementShareCount(post.id);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  // Add navigation event listener
  useEffect(() => {
    const handleRouteChange = () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
        setIsPlaying(false);
      }
    };

    // Add listener for navigation events
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      handleRouteChange(); // Clean up on unmount
    };
  }, []);

  const handleListen = useCallback(() => {
    if (!speechSynthesisRef.current || !post) return;

    if (isPlaying) {
      speechSynthesisRef.current.cancel();
      setIsPlaying(false);
    } else {
      // Cancel any existing speech
      speechSynthesisRef.current.cancel();

      // Create new utterance
      utteranceRef.current = new SpeechSynthesisUtterance();
      utteranceRef.current.lang = "en-IN";
      utteranceRef.current.pitch = 0.5;
      utteranceRef.current.rate = 1.25;

      const cleanedContent = stripMarkdown(markdownContent);
      utteranceRef.current.text = cleanedContent;

      utteranceRef.current.onend = () => setIsPlaying(false);
      utteranceRef.current.onerror = () => setIsPlaying(false);

      speechSynthesisRef.current.speak(utteranceRef.current);
      setIsPlaying(true);
    }
  }, [isPlaying, post, markdownContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-7xl">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-7xl px-4">
          <Button variant="ghost" asChild className="mb-8 hover:bg-gray-100">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar />
      {/* Enhanced Hero Section */}
      <div className="w-full h-[80vh] relative bg-black">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="container max-w-7xl h-full relative">
          <div className="absolute inset-x-4 bottom-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex-1">
              <Button
                variant="ghost"
                asChild
                className="mb-6 text-white hover:text-white"
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mb-6">
                {post.title}
              </h1>

              {/* Metadata section moved to hero */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Action buttons moved to hero */}
            <div className="flex items-center gap-4">
              <ShareButton
                shareCount={shareCount}
                onShare={handleShare}
                variant="ghost"
                className="text-white hover:bg-white/10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleListen}
                className="gap-2 rounded-full text-white hover:bg-white"
              >
                {isPlaying ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                {isPlaying ? "Stop" : "Listen"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-2/3 px-4 relative z-10 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                {/* Content */}
                <div className="prose prose-gray max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                  >
                    {markdownContent || post.content || "No content available."}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Table of Contents Sidebar */}
          <TableOfContents content={markdownContent || post.content || ""} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden group">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(relatedPost.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedPost.readTime} min read
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
