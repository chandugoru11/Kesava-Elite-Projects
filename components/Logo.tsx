
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'default' }) => {
  const goldGradient = variant === 'white' ? '#FFFFFF' : 'url(#goldGrad)';
  const subtitleColor = variant === 'white' ? '#FFFFFF' : '#3B82F6';
  const textColor = variant === 'white' ? '#FFFFFF' : '#D4AF37';

  return (
    <svg 
      viewBox="0 0 400 180" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGrad" x1="140" y1="40" x2="260" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8860B" />
          <stop offset="0.5" stopColor="#FFD700" />
          <stop offset="1" stopColor="#8B6914" />
        </linearGradient>
      </defs>

      <g id="LogoIcon">
        <path d="M157 50V130H182V50H157Z" fill={goldGradient} />
        <path d="M182 90L235 50H262L200 95L263 130H235L182 100" fill={goldGradient} />

        <g stroke={goldGradient} strokeWidth="2.5" strokeLinecap="round">
          <circle cx="138" cy="65" r="3.5" fill={goldGradient} stroke="none" />
          <path d="M141.5 65H148L165 82" />
          
          <circle cx="135" cy="82" r="3.5" fill={goldGradient} stroke="none" />
          <path d="M138.5 82H145L165 102" />

          <circle cx="135" cy="99" r="3.5" fill={goldGradient} stroke="none" />
          <path d="M138.5 99H145L158 112" />

          <circle cx="138" cy="116" r="3.5" fill={goldGradient} stroke="none" />
          <path d="M141.5 116H148L158 126" />
        </g>
      </g>

      <text 
        x="200" 
        y="155" 
        textAnchor="middle"
        fill={textColor} 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 900, 
          fontSize: '28px', 
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}
      >
        KESHAVA ELITE PROJECTS
      </text>
      
      <text 
        x="200" 
        y="175" 
        textAnchor="middle"
        fill={subtitleColor} 
        style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 700, 
          fontSize: '14px', 
          letterSpacing: '0.3em',
          textTransform: 'uppercase'
        }}
      >
        ROBOTICS & TECHNOLOGY
      </text>
    </svg>
  );
};

export default Logo;
