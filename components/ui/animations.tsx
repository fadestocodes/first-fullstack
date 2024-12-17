'use client'

import { motion, useAnimation, Variants } from "framer-motion";
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
    triggerOnce: once,  // Trigger the animation once when the element comes into view
    threshold: 0.1,      // Trigger when 10% of the element is in view
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
      {children}
    </motion.div>
  );
};

export  {Bounce, BounceFade, FadeIn};