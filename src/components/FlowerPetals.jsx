"use client";
import { motion } from "framer-motion";

const PETALS = [
  { left: "4%",  top: "8%",  size: 20, color: "#FCE4EC", opacity: 0.55, delay: 0,    duration: 8,    rotate: 15  },
  { left: "14%", top: "68%", size: 15, color: "#F8BBD9", opacity: 0.50, delay: 1.5,  duration: 10,   rotate: -20 },
  { left: "24%", top: "28%", size: 24, color: "#ffffff", opacity: 0.38, delay: 3,    duration: 7,    rotate: 45  },
  { left: "38%", top: "78%", size: 17, color: "#FCE4EC", opacity: 0.50, delay: 0.5,  duration: 9,    rotate: -35 },
  { left: "54%", top: "12%", size: 21, color: "#F8BBD9", opacity: 0.52, delay: 2,    duration: 8.5,  rotate: 60  },
  { left: "63%", top: "55%", size: 13, color: "#ffffff", opacity: 0.35, delay: 4,    duration: 11,   rotate: -15 },
  { left: "74%", top: "22%", size: 25, color: "#FCE4EC", opacity: 0.48, delay: 1,    duration: 9.5,  rotate: 30  },
  { left: "84%", top: "72%", size: 19, color: "#F8BBD9", opacity: 0.53, delay: 2.5,  duration: 7.5,  rotate: -50 },
  { left: "91%", top: "38%", size: 15, color: "#ffffff", opacity: 0.35, delay: 3.5,  duration: 10.5, rotate: 20  },
  { left: "9%",  top: "48%", size: 22, color: "#FCE4EC", opacity: 0.45, delay: 1.2,  duration: 8.2,  rotate: -60 },
  { left: "48%", top: "42%", size: 16, color: "#F8BBD9", opacity: 0.38, delay: 4.5,  duration: 9.2,  rotate: 75  },
  { left: "33%", top: "58%", size: 23, color: "#ffffff", opacity: 0.38, delay: 0.8,  duration: 10.8, rotate: -10 },
];

const PETAL_ASPECT_RATIO = 1.6;

function Petal({ size, color, opacity, delay, duration, rotate }) {
  return (
    <motion.div
      animate={{
        y: [0, -18, -8, 0],
        x: [0, 6, -4, 0],
        rotate: [rotate, rotate + 8, rotate - 6, rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={size}
        height={Math.round(size * PETAL_ASPECT_RATIO)}
        viewBox="0 0 20 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
        aria-hidden="true"
      >
        <path d="M10 0 C18 5, 20 14, 10 30 C0 14, 2 5, 10 0 Z" fill={color} />
      </svg>
    </motion.div>
  );
}

export default function FlowerPetals() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <div key={i} className="absolute" style={{ left: p.left, top: p.top }}>
          <Petal {...p} />
        </div>
      ))}
    </div>
  );
}
