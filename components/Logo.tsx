
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'default' }) => {
  // Brand Colors from image
  const goldPrimary = variant === 'white' ? '#FFFFFF' : '#D4AF37';
  const blueTech = variant === 'white' ? '#FFFFFF' : '#4dabf7';
  const textColor = variant === 'white' ? '#FFFFFF' : '#D4AF37';

  return (
    <svg 
      viewBox="0 0 500 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#C5A059', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#F7EF8A', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <g id="LogoIcon">
        {/* The Stylized 'K' from image */}
        <path 
          d="M195 40H225V85L290 40H325L255 90L328 140H290L225 95V140H195V40Z" 
          fill="url(#goldGradient)" 
        />

        {/* Integrated Circuitry Lines and Nodes */}
        <g stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round">
          {/* Top Line */}
          <path d="M168 45L185 65L230 110" />
          <circle cx="168" cy="45" r="4" fill="url(#goldGradient)" stroke="none" />
          
          {/* Middle Top Line */}
          <path d="M165 65L182 85L220 120" />
          <circle cx="165" cy="65" r="4" fill="url(#goldGradient)" stroke="none" />

          {/* Middle Bottom Line */}
          <path d="M168 85L185 105L210 125" />
          <circle cx="168" cy="85" r="4" fill="url(#goldGradient)" stroke="none" />

          {/* Bottom Line */}
          <path d="M172 105L190 125L205 135" />
          <circle cx="172" cy="105" r="4" fill="url(#goldGradient)" stroke="none" />
        </g>
      </g>

      {/* Main Text: KESHAVA ELITE PROJECTS */}
      <text 
        x="250" 
        y="170" 
        textAnchor="middle"
        fill={textColor} 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 900, 
          fontSize: '32px', 
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}
      >
        KESHAVA ELITE PROJECTS
      </text>
      
      {/* Subtitle with separator: ROBOTICS & TECHNOLOGY */}
      <g>
        <line x1="120" y1="188" x2="160" y2="188" stroke={blueTech} strokeWidth="1" opacity="0.6" />
        <text 
          x="265" 
          y="192" 
          textAnchor="middle"
          fill={blueTech} 
          style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 700, 
            fontSize: '18px', 
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          ROBOTICS & TECHNOLOGY
        </text>
      </g>
    </svg>
  );
};

export default Logo;
