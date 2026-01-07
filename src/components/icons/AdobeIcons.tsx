import React from 'react';
interface IconProps {
  size?: number;
  className?: string;
}
export function PremierePro({
  size = 24,
  className = ''
}: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Rounded square background */}
      <rect x="1" y="1" width="22" height="22" rx="4" fill="url(#prGradient)" />
      <defs>
        <linearGradient id="prGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9999FF" />
          <stop offset="100%" stopColor="#7777DD" />
        </linearGradient>
      </defs>

      {/* "Pr" text */}
      <text x="12" y="16.5" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
        Pr
      </text>
    </svg>;
}
export function AfterEffects({
  size = 24,
  className = ''
}: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Rounded square background */}
      <rect x="1" y="1" width="22" height="22" rx="4" fill="url(#aeGradient)" />
      <defs>
        <linearGradient id="aeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9999FF" />
          <stop offset="100%" stopColor="#6666CC" />
        </linearGradient>
      </defs>

      {/* "Ae" text */}
      <text x="12" y="16.5" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
        Ae
      </text>
    </svg>;
}
export function CapCut({
  size = 24,
  className = ''
}: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Rounded square background */}
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#000000" stroke="white" strokeWidth="0.5" />

      {/* Scissors icon */}
      <g transform="translate(12, 12)">
        {/* Top blade */}
        <circle cx="-3" cy="-3" r="1.5" fill="white" />
        <path d="M -3 -3 L 4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        {/* Bottom blade */}
        <circle cx="-3" cy="3" r="1.5" fill="white" />
        <path d="M -3 3 L 4 -2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        {/* Center screw */}
        <circle cx="0" cy="0" r="1" fill="white" />

        {/* Film strip accent */}
        <rect x="3" y="-3" width="3" height="6" rx="0.5" fill="white" opacity="0.8" />
        <line x1="4" y1="-2" x2="4" y2="2" stroke="#000000" strokeWidth="0.5" />
        <line x1="5" y1="-2" x2="5" y2="2" stroke="#000000" strokeWidth="0.5" />
      </g>
    </svg>;
}