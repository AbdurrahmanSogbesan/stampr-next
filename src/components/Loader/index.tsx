import logoSrc from "../../assets/images/logo.svg";
import React from "react";

import { motion } from "framer-motion";

interface LoaderProps {}

const svgVariants = {
  hidden: { opacity: 0.2 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, yoyo: Infinity },
  },
};

export const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <motion.img
        height="45"
        src={logoSrc.src}
        className="mb-2"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
      />
      <strong>Just a sec...</strong>
    </div>
  );
};
