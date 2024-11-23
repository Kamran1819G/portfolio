import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { XEmbed, LinkedInEmbed } from "react-social-media-embed";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import { Code, TwitterIcon, LinkedinIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  where,
  getFirestore,
} from "firebase/firestore";

const COLLECTION_NAME = "socialFeeds";

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
    <p className="text-lg text-gray-600">Loading social updates...</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-[30vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
    <div className="space-y-4">
      <div className="text-6xl">😕</div>
      <h3 className="text-2xl font-bold text-gray-800">
        Something&apos;s not right
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">{message}</p>
    </div>
    <motion.button
      className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.reload()}
    >
      Try Again
    </motion.button>
  </div>
);

const SocialFeedSection = () => {
  const [activeTab, setActiveTab] = useState("twitter");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState({ twitter: [], linkedin: [] });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const db = getFirestore();

  const fetchSocialPosts = async (platform) => {
    try {
      const socialPostsRef = collection(db, COLLECTION_NAME);
      const q = query(
        socialPostsRef,
        where("platform", "==", platform),
        where("active", "==", true),
        orderBy("createdAt", "desc"),
        limit(6)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(`Error fetching ${platform} posts:`, error);
      throw error;
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const [twitterPosts, linkedinPosts] = await Promise.all([
          fetchSocialPosts("twitter"),
          fetchSocialPosts("linkedin"),
        ]);

        setPosts({
          twitter: twitterPosts,
          linkedin: linkedinPosts,
        });
        setError(null);
      } catch (err) {
        setError(
          "We couldn't load the social media posts. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const SocialPost = ({ post, type }) => (
    <Card className="h-full w-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full">
          {type === "twitter" ? (
            <div className="w-full flex justify-center bg-white">
              <XEmbed
                url={post.url}
                width="100%"
                className="w-full max-w-full"
              />
            </div>
          ) : (
            <div className="w-full flex justify-center bg-white">
              <LinkedInEmbed
                url={post.url}
                width="100%"
                height={480}
                className="w-full max-w-full"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[200px] text-center px-4"
    >
      <div className="space-y-4">
        <div className="text-6xl mb-4">{type === "twitter" ? "🐦" : "💼"}</div>
        <h3 className="text-xl font-semibold text-gray-800">
          No posts to show right now
        </h3>
        <p className="text-gray-600">Check back soon for the latest updates</p>
      </div>
    </motion.div>
  );

  const PostsGrid = ({ posts, type }) => {
    if (posts.length === 0) {
      return <EmptyState type={type} />;
    }

    if (isMobile) {
      return (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          grabCursor={true}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="w-full">
              <div className="py-4 w-full">
                <SocialPost post={post} type={type} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SocialPost post={post} type={type} />
          </motion.div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ErrorState message={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 w-full">
      <div className="container mx-auto px-4">
        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
          Social Media 🌐
        </span>
        <h2 className="text-4xl font-bold mb-12">
          <span className="block">Latest Updates</span>
          <span className="block">From My Social Media</span>
        </h2>

        <Tabs defaultValue="linkedin" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="linkedin"
              className="flex items-center gap-2"
              onClick={() => setActiveTab("linkedin")}
            >
              <LinkedinIcon className="h-4 w-4" />
              <span className="text-lg">LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger
              value="twitter"
              className="flex items-center gap-2"
              onClick={() => setActiveTab("twitter")}
            >
              <TwitterIcon className="h-4 w-4" />
              <span className="text-lg">Twitter</span>
            </TabsTrigger>
          </TabsList>

          <div className="w-full">
            <TabsContent value="twitter" className="mt-6 w-full">
              <PostsGrid posts={posts.twitter} type="twitter" />
            </TabsContent>

            <TabsContent value="linkedin" className="mt-6 w-full">
              <PostsGrid posts={posts.linkedin} type="linkedin" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default SocialFeedSection;
