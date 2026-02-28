"use client";

const PETALS = [
  { left: "4%",  top: "8%",  size: 20, color: "#FCE4EC", opacity: 0.35, delay: "0s",    duration: "8s",   rotate: 15  },
  { left: "14%", top: "68%", size: 15, color: "#F8BBD9", opacity: 0.30, delay: "1.5s",  duration: "10s",  rotate: -20 },
  { left: "24%", top: "28%", size: 24, color: "#ffffff", opacity: 0.22, delay: "3s",    duration: "7s",   rotate: 45  },
  { left: "38%", top: "78%", size: 17, color: "#FCE4EC", opacity: 0.30, delay: "0.5s",  duration: "9s",   rotate: -35 },
  { left: "54%", top: "12%", size: 21, color: "#F8BBD9", opacity: 0.32, delay: "2s",    duration: "8.5s", rotate: 60  },
  { left: "63%", top: "55%", size: 13, color: "#ffffff", opacity: 0.20, delay: "4s",    duration: "11s",  rotate: -15 },
  { left: "74%", top: "22%", size: 25, color: "#FCE4EC", opacity: 0.28, delay: "1s",    duration: "9.5s", rotate: 30  },
  { left: "84%", top: "72%", size: 19, color: "#F8BBD9", opacity: 0.33, delay: "2.5s",  duration: "7.5s", rotate: -50 },
  { left: "91%", top: "38%", size: 15, color: "#ffffff", opacity: 0.20, delay: "3.5s",  duration: "10.5s",rotate: 20  },
  { left: "9%",  top: "48%", size: 22, color: "#FCE4EC", opacity: 0.25, delay: "1.2s",  duration: "8.2s", rotate: -60 },
  { left: "48%", top: "42%", size: 16, color: "#F8BBD9", opacity: 0.18, delay: "4.5s",  duration: "9.2s", rotate: 75  },
  { left: "33%", top: "58%", size: 23, color: "#ffffff", opacity: 0.22, delay: "0.8s",  duration: "10.8s",rotate: -10 },
];

const PETAL_ASPECT_RATIO = 1.6;

function Petal({ size, color, opacity, delay, duration, rotate }) {
  return (
    <div
      className="animate-float-petal"
      style={{ animationDelay: delay, animationDuration: duration }}
    >
      <svg
        width={size}
        height={Math.round(size * PETAL_ASPECT_RATIO)}
        viewBox="0 0 20 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotate}deg)`, opacity }}
        aria-hidden="true"
      >
        <path d="M10 0 C18 5, 20 14, 10 30 C0 14, 2 5, 10 0 Z" fill={color} />
      </svg>
    </div>
  );
}

export default function FlowerPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <div key={i} className="absolute" style={{ left: p.left, top: p.top }}>
          <Petal {...p} />
        </div>
      ))}
    </div>
  );
}
