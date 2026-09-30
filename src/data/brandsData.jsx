import React from 'react';

export const topBrands = [
  {
    name: 'TOYOTA',
    width: '80px',
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-1">
        <path d="M12 2C6.48 2 2 4.69 2 8c0 3.31 4.48 6 10 6s10-2.69 10-6c0-3.31-4.48-6-10-6zm0 10.5c-4.42 0-8-2.01-8-4.5s3.58-4.5 8-4.5 8 2.01 8 4.5-3.58 4.5-8 4.5z" />
        <path d="M12 3.5c-2.21 0-4 2.01-4 4.5s1.79 4.5 4 4.5 4-2.01 4-4.5-1.79-4.5-4-4.5zm0 7.5c-1.1 0-2-1.34-2-3s.9-3 2-3 2 1.34 2 3-.9 3-2 3z" />
        <path d="M12 5.5c-3.31 0-6 1.12-6 2.5s2.69 2.5 6 2.5 6-1.12 6-2.5-2.69-2.5-6-2.5zm0 3.8c-2.21 0-4-.58-4-1.3s1.79-1.3 4-1.3 4 .58 4 1.3-1.79 1.3-4 1.3z" />
      </svg>
    )
  },
  {
    name: 'HONDA',
    width: '80px',
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary mb-1">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 6v12M16 6v12M8 12h8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'FORD',
    width: '80px',
    renderIcon: () => (
      <svg width="50" height="40" viewBox="0 0 60 30" fill="currentColor" className="text-secondary mb-1">
        <ellipse cx="30" cy="15" rx="28" ry="14" fill="#0d47a1" />
        <ellipse cx="30" cy="15" rx="25" ry="11" fill="none" stroke="white" strokeWidth="1" />
        <text x="30" y="20" fill="white" fontSize="12" fontWeight="bold" fontStyle="italic" textAnchor="middle" fontFamily="Georgia, serif">Ford</text>
      </svg>
    )
  },
  {
    name: 'CHEVROLET',
    width: '90px',
    renderIcon: () => (
      <svg width="45" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-1">
        <path d="M4 10h3.5l1.5-3.5h6l1.5 3.5H20v4h-3.5l-1.5 3.5h-6L7.5 14H4v-4z" />
      </svg>
    )
  },
  {
    name: 'NISSAN',
    width: '80px',
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary mb-1">
        <circle cx="12" cy="12" r="8" />
        <rect x="2" y="9.5" width="20" height="5" rx="1" fill="white" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="13" fill="currentColor" fontSize="4.5" fontWeight="black" textAnchor="middle" letterSpacing="0.2">NISSAN</text>
      </svg>
    )
  },
  {
    name: 'BMW',
    width: '80px',
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary mb-1">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M12 5a7 7 0 0 1 7 7h-7z" fill="currentColor" />
        <path d="M12 19a7 7 0 0 1-7-7h7z" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'HYUNDAI',
    width: '80px',
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary mb-1">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path d="M9 9l2 6M15 9l-2 6M9.5 12h5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'KIA',
    width: '80px',
    renderIcon: () => (
      <svg width="50" height="40" viewBox="0 0 60 24" fill="currentColor" className="text-secondary mb-1">
        <path d="M5 2h4l5 10L19 2h4l-6 12 6 8h-4l-5-10-5 10H5l6-12zM32 2h4v20h-4zM43 2h12v4H47v4h6v4h-6v6h-4z" />
      </svg>
    )
  },
  {
    name: 'JEEP',
    width: '80px',
    renderIcon: () => (
      <svg width="50" height="40" viewBox="0 0 60 24" fill="currentColor" className="text-secondary mb-1">
        <text x="30" y="18" fill="currentColor" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="-1">Jeep</text>
      </svg>
    )
  }
];
