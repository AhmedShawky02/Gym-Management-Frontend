import { motion } from "framer-motion";
import classes from "./LoadingSpinner.module.css";
import type { CSSProperties } from "react";

function LoadingSpinner({ label = "Loading", size = 120, color = "#9A070E" }) {
  return (
    <>
      <motion.div
        className={classes.loadingSpinner}
        animate={{ rotate: [0, 180, 200, 360] }}
        transition={{
          repeat: Infinity,
          duration: 1.3,
          ease: "linear"
        }}
        style={{
          "--spinner-size": `${size}px`,
          "--spinner-color": color,
        } as CSSProperties}
      />
      <p className={classes.label}>{label}</p>
    </>
  );
}

export default LoadingSpinner;
