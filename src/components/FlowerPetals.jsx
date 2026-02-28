"use client";
import { motion } from "framer-motion";

const PETALS = [
  { left: "4%",  top: "8%",  size: 22, color: "#F06292", opacity: 0.72, delay: 0,    duration: 8,    rotate: 15  },
  { left: "14%", top: "68%", size: 17, color: "#EC407A", opacity: 0.68, delay: 1.5,  duration: 10,   rotate: -20 },
  { left: "24%", top: "28%", size: 26, color: "#F48FB1", opacity: 0.60, delay: 3,    duration: 7,    rotate: 45  },
  { left: "38%", top: "78%", size: 19, color: "#E91E63", opacity: 0.58, delay: 0.5,  duration: 9,    rotate: -35 },
  { left: "54%", top: "12%", size: 23, color: "#AD1457", opacity: 0.65, delay: 2,    duration: 8.5,  rotate: 60  },
  { left: "63%", top: "55%", size: 15, color: "#F06292", opacity: 0.55, delay: 4,    duration: 11,   rotate: -15 },
  { left: "74%", top: "22%", size: 27, color: "#EC407A", opacity: 0.70, delay: 1,    duration: 9.5,  rotate: 30  },
  { left: "84%", top: "72%", size: 21, color: "#E91E63", opacity: 0.66, delay: 2.5,  duration: 7.5,  rotate: -50 },
  { left: "91%", top: "38%", size: 17, color: "#F48FB1", opacity: 0.58, delay: 3.5,  duration: 10.5, rotate: 20  },
  { left: "9%",  top: "48%", size: 24, color: "#AD1457", opacity: 0.62, delay: 1.2,  duration: 8.2,  rotate: -60 },
  { left: "48%", top: "42%", size: 18, color: "#F06292", opacity: 0.60, delay: 4.5,  duration: 9.2,  rotate: 75  },
  { left: "33%", top: "58%", size: 25, color: "#EC407A", opacity: 0.64, delay: 0.8,  duration: 10.8, rotate: -10 },
  { left: "19%", top: "15%", size: 20, color: "#E91E63", opacity: 0.66, delay: 2.2,  duration: 8.8,  rotate: 40  },
  { left: "70%", top: "82%", size: 16, color: "#F48FB1", opacity: 0.62, delay: 3.8,  duration: 9.8,  rotate: -25 },
  { left: "42%", top: "5%",  size: 23, color: "#AD1457", opacity: 0.58, delay: 1.8,  duration: 7.8,  rotate: 55  },
  { left: "80%", top: "48%", size: 19, color: "#F06292", opacity: 0.70, delay: 0.3,  duration: 10.2, rotate: -40 },
  { left: "58%", top: "88%", size: 22, color: "#EC407A", opacity: 0.64, delay: 3.2,  duration: 8.6,  rotate: 70  },
  { left: "28%", top: "92%", size: 15, color: "#E91E63", opacity: 0.60, delay: 4.2,  duration: 9.4,  rotate: -55 },
  { left: "96%", top: "62%", size: 21, color: "#F48FB1", opacity: 0.68, delay: 1.6,  duration: 7.2,  rotate: 25  },
  { left: "2%",  top: "35%", size: 18, color: "#AD1457", opacity: 0.56, delay: 2.8,  duration: 11.2, rotate: -70 },
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
