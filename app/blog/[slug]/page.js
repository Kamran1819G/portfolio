"use client";

import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Tag,
  User,
  ChevronLeft,
  Share2,
  Bookmark,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Previous helper functions remain the same
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
    return "No date";
  }
}

function calculateReadTime(content) {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Loading skeleton component remains the same
const BlogSkeleton = () => (
  <div className="space-y-8">
    <div className="h-[400px] w-full bg-gray-200 rounded-2xl animate-pulse" />
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-12 w-3/4" />
      <div className="flex gap-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      setSpeechSynthesis(window.speechSynthesis);
    }

    // Cleanup function to stop speech when component unmounts
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Previous useEffect for fetching post remains the same
  useEffect(() => {
    async function fetchPost() {
      if (!params?.slug) {
        setError("Post slug not found");
        setLoading(false);
        return;
      }

      try {
        const blogsRef = collection(db, "blogs");
        const querySnapshot = await getDocs(blogsRef);
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
          };

          allPosts.push(postData);

          if (postData.slug === params.slug) {
            foundPost = postData;
          }
        });

        if (foundPost) {
          setPost(foundPost);
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params?.slug, router]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  const handleListen = useCallback(() => {
    if (!speechSynthesis) return;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${post.title}. ${post.content}`;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  }, [isPlaying, post, speechSynthesis]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Button variant="ghost" asChild className="mb-8 hover:bg-gray-100">
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog List
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
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="mb-8 hover:bg-gray-100">
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog List
          </Link>
        </Button>

        <Card className="max-w-4xl mx-auto">
          <div className="relative h-[400px] w-full rounded-t-xl overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <CardContent className="p-8">
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-700 rounded-full py-1 px-3 mb-4"
            >
              {post.category}
            </Badge>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </TooltipTrigger>
                  <TooltipContent>Author</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </TooltipTrigger>
                  <TooltipContent>Publication Date</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </TooltipTrigger>
                  <TooltipContent>Reading Time</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2 rounded-full"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleListen}
                className="gap-2 rounded-full"
              >
                {isPlaying ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                {isPlaying ? "Stop" : "Listen"}
              </Button>
            </div>

            <div className="prose prose-gray max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-bold text-xl mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(relatedPost.createdAt)}</span>
                        <span>{relatedPost.readTime} min read</span>
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
