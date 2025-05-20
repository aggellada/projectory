import React from "react";

export default function CircularProgressBar({ progressPercentage }) {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the progress bar stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (progressPercentage / 100) * circumference; // How much the progress should be offset

  return (
    <div className="relative flex items-center justify-center">
      {/* Background Circle */}
      <svg width="120" height="120" className="rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e6e6e6" // Background color
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Progress Circle */}
      <svg width="120" height="120" className="rotate-90 absolute">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#4caf50" // Progress color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Text Inside Circle */}
      <div className="absolute text-center font-bold text-xl">
        {progressPercentage.toFixed(2)}%
      </div>
    </div>
  );
}
