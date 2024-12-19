"use client";
import {  Save } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SubscribeButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  onClick,
  text = "Publish",
  className = "",
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleClick = () => {
    if (!isSubscribed) {
      setIsAnimating(true);
    }
    setIsSubscribed(!isSubscribed);
    if (onClick) {
      onClick();
    }
  };

  const createCircles = (count = 20) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const radius = Math.random() * 100 + 50;
      const endX = Math.cos(angle) * radius;
      const endY = Math.sin(angle) * radius;

      const shapes = ["circle", "star"];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

      return (
        <motion.div
          key={i}
          className={`absolute ${
            randomShape === "circle" ? "rounded-full" : ""
          }`}
          initial={{
            opacity: 0,
            scale: 0,
            x: "-50%",
            y: "-50%",
            left: "50%",
            top: "50%",
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 0.5 + 0.7, 0],
            x: ["-50%", `calc(${endX}px - 50%)`],
            y: ["-50%", `calc(${endY}px - 50%)`],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 1,
            delay: Math.random() * 0.1,
            ease: "easeInOut",
          }}
          style={{
            width: `${Math.random() * 2 + 10}px`,
            height: `${Math.random() * 2 + 10}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
            clipPath:
              randomShape === "star"
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                : "",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        />
      );
    });
  };

  return (
    <motion.div className="relative w-fit">
      {isSubscribed ? createCircles() : null}
      <motion.button
        onClick={handleClick}
        layout
        className={`flex items-center justify-center px-6 py-2 rounded-lg bg-black text-white  transition duration-300 ${className}`}
      >
        <AnimatePresence mode="wait">
          {isSubscribed ? (
            <motion.div
              key="subscribed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center"
            >
              <motion.div
                animate={{
                  rotate: [0, -15, 15, -15, 15, -15, 15, 0],
                  transition: { duration: 0.7, delay: 0.2 },
                }}
                style={{ transformOrigin: "top center" }}
              >
                <Save className="w-4 h-4 mr-2" />
              </motion.div>
              Published
            </motion.div>
          ) : (
            <motion.div
              key="subscribe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};
