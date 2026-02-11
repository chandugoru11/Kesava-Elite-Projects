
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'default' }) => {
  const brandBlue = variant === 'white' ? '#FFFFFF' : '#0056b3';
  const brandOrange = variant === 'white' ? '#FFFFFF' : '#ff9800';
  const textColor = variant === 'white' ? '#FFFFFF' : '#1a1a1a';

  return (
    <svg 
      viewBox="0 0 400 180" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="LogoIcon">
        {/* Abstract 'K' and 'E' structure */}
        <path d="M157 50V130H182V50H157Z" fill={brandBlue} />
        <path d="M182 90L235 50H262L200 95L263 130H235L182 100" fill={brandOrange} />

        {/* Technical nodes */}
        <g stroke={brandBlue} strokeWidth="2.5" strokeLinecap="round">
          <circle cx="138" cy="65" r="3.5" fill={brandBlue} stroke="none" />
          <path d="M141.5 65H148L165 82" />
          
          <circle cx="135" cy="82" r="3.5" fill={brandBlue} stroke="none" />
          <path d="M138.5 82H145L165 102" />

          <circle cx="135" cy="99" r="3.5" fill={brandBlue} stroke="none" />
          <path d="M138.5 99H145L158 112" />

          <circle cx="138" cy="116" r="3.5" fill={brandBlue} stroke="none" />
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
        fill={brandOrange} 
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
