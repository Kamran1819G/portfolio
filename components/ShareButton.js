import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const formatShareCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const ShareButton = ({
  shareCount,
  onShare,
  className = "",
  isLoading = false,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const formattedCount = formatShareCount(shareCount);

  const handleShare = async () => {
    if (isLoading || showSuccess) return;

    try {
      await onShare();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      disabled={isLoading}
      className={`group relative gap-2 rounded-full
        bg-transparent border-primary text-primary-500
        hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600
        active:scale-95 transition-all duration-200 
        ${showSuccess ? "bg-green-50 border-green-200" : ""} 
        ${className}`}
    >
      <div className="relative w-4 h-4">
        <AnimatePresence>
          {!showSuccess && (
            <motion.div
              key="share-icon"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Share2 className="h-4 w-4" />
            </motion.div>
          )}
          {showSuccess && (
            <motion.div
              key="check-icon"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-green-500"
            >
              <Check className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span
        className={`font-medium transition-colors duration-200
        ${showSuccess ? "text-green-600" : ""}`}
      >
        {showSuccess ? "Shared!" : "Share"}
      </span>

      <Badge
        variant="secondary"
        className={`ml-1 transition-all duration-200
          ${
            showSuccess
              ? "bg-green-100 text-green-700"
              : "bg-transparent group-hover:bg-primary-foreground group-hover:text-primary"
          }`}
      >
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <span className="flex gap-0.5">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-75">.</span>
              <span className="animate-bounce delay-150">.</span>
            </span>
          </motion.div>
        ) : (
          formattedCount
        )}
      </Badge>

      {/* Success ring animation */}
      <motion.span
        className={`absolute inset-0 rounded-full border-2 pointer-events-none`}
        initial={showSuccess ? { scale: 0.95, opacity: 0 } : {}}
        animate={
          showSuccess
            ? { scale: 1.1, opacity: 1, borderColor: "rgba(72, 187, 120, 0.6)" }
            : {}
        }
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </Button>
  );
};

export default ShareButton;
