'use client';

import { Poppins } from 'next/font/google';
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${poppins.className} px-6 sm:px-8 py-3 sm:py-4 mt-4 sm:mt-5 text-white font-medium rounded-full text-sm sm:text-base hover:cursor-pointer relative overflow-hidden border border-[#ffffff80] shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
      style={{
        background: `url(${isHovered ? '/btn-hover.webp' : '/btn.webp'}) center center / cover no-repeat`,
      }}
    >
      {children}
    </button>
  );
};

export default Button;