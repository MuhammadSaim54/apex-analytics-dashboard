export default function SidebarToggleIcon({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer rounded rectangle */}
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="5" 
        stroke={color} 
        strokeWidth="2" 
      />
      {/* Left panel vertical partition */}
      <path 
        d="M9 3V21" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
}