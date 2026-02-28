"use client";

const PETALS = [
  { left: "8%",  top: "12%", size: 22, color: "#F06292", opacity: 0.70, delay: 0,   duration: 8,   rotate: 20  },
  { left: "30%", top: "75%", size: 18, color: "#EC407A", opacity: 0.65, delay: 1.5, duration: 10,  rotate: -25 },
  { left: "50%", top: "10%", size: 24, color: "#F48FB1", opacity: 0.62, delay: 3,   duration: 7.5, rotate: 45  },
  { left: "72%", top: "65%", size: 20, color: "#E91E63", opacity: 0.60, delay: 0.8, duration: 9,   rotate: -40 },
  { left: "90%", top: "20%", size: 21, color: "#AD1457", opacity: 0.66, delay: 2,   duration: 8.5, rotate: 35  },
  { left: "18%", top: "50%", size: 19, color: "#F06292", opacity: 0.58, delay: 3.5, duration: 9.5, rotate: -15 },
  { left: "60%", top: "85%", size: 23, color: "#EC407A", opacity: 0.64, delay: 1.2, duration: 7,   rotate: 55  },
  { left: "82%", top: "42%", size: 17, color: "#F48FB1", opacity: 0.60, delay: 2.5, duration: 10.5, rotate: -50 },
];

const PETAL_ASPECT_RATIO = 1.6;

function Petal({ size, color, opacity, delay, duration, rotate, index }) {
  const animName = index % 2 === 0 ? "floatPetal" : "floatPetalReverse";
  return (
    <div style={{ transform: `rotate(${rotate}deg)` }}>
      <div
        style={{
          animation: `${animName} ${duration}s ease-in-out ${-delay}s infinite`,
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
      </div>
    </div>
  );
}

export default function FlowerPetals() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <div key={i} className="absolute" style={{ left: p.left, top: p.top }}>
          <Petal {...p} index={i} />
        </div>
      ))}
    </div>
  );
}
