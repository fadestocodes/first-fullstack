'use client'

import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// interface BounceProps {
//   children: React.ReactNode;
//   delay?: number;
//   duration?: number;
//   bounceHeight?: number;
//   className?: string;
//   once?: boolean;
// }
const escapeHtml = (str) => {
    return str.replace(/['"&<>]/g, (char) => {
      switch (char) {
        case "'":
          return "&#39;";
        case "&":
          return "&amp;";
        case '"':
          return "&quot;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        default:
          return char;
      }
    });
  };
  
const Bounce= ({
  children,
  delay = 0,
  duration = 0.5,
  bounceHeight = 20,
  className = "",
  once = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  const variants = {
    hidden: { opacity: 0, y: bounceHeight },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};


//--------------FadeIn--------//

const FadeIn= ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  const variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${className} w-full`} 
    >
      {children}
    </motion.div>
  );
};


//--------BounceFade-----//
const BounceFade = ({
    children,
    delay = 0,
    duration = 0.5,
    bounceHeight = 20,
    className = "",
    once = true,
  }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
      triggerOnce: once,
      threshold: 0.1,
    });
  
    // Handle animation effects for bounce and fade
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else if (!once) {
        controls.start("hidden");
      }
    }, [controls, inView, once]);
  
    // Variants for Bounce and Fade
    const variants = {
      hidden: { opacity: 0, y: bounceHeight },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration,
          type: "spring",
          stiffness: 200,
          damping: 10,
        },
      },
    };
  
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className={className}
      >
        {/* Escape any special HTML characters in children */}
        {typeof children === "string" ? escapeHtml(children) : children}
      </motion.div>
    );
  };
  
  export default BounceFade;

export  {Bounce, BounceFade, FadeIn};