import React from "react";

export default function BiggerCircularProgressBar({ progressPercentage }) {
  const radius = 80; // Increased radius
  const strokeWidth = 15; // Increased stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (progressPercentage / 100) * circumference; // How much the progress should be offset

  return (
    <div className="relative flex items-center justify-center">
      {/* Background Circle */}
      <svg width="200" height="200" className="rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#e6e6e6" // Background color
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Progress Circle */}
      <svg width="200" height="200" className="rotate-90 absolute">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#4caf50" // Progress color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Text Inside Circle */}
      <div className="absolute text-center font-bold text-3xl">
        {progressPercentage.toFixed(2)}%
      </div>
    </div>
  );
}
