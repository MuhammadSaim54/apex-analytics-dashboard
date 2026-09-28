import React from 'react';

export default function ApexLogo({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Precision Geometric 'A' Apex Peak */}
      <path 
        d="M12 2.5L3.5 19.5H8.5L12 11.5L15.5 19.5H20.5L12 2.5Z" 
        fill={color} 
      />
      {/* Dynamic Laser Core Notch */}
      <path 
        d="M12 14L9 19.5H15L12 14Z" 
        fill="#2DD4BF" 
        fillOpacity="0.9"
      />
    </svg>
  );
}