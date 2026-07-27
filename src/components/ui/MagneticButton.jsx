import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ 
  children, 
  className = "", 
  variant = "primary",
  onClick,
  href
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-[#2e8b57] text-white hover:bg-[#247048]",
    secondary: "bg-transparent border border-[#ededed]/30 text-[#ededed] hover:border-[#2e8b57]",
    gold: "bg-[#FFD700] text-[#0a0a0a] hover:bg-[#e6c200]"
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={`
        px-6 py-3 rounded-full font-medium text-sm tracking-wide
        transition-colors duration-300 inline-flex items-center justify-center
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}