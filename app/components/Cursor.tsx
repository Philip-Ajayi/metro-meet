'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotSpringConfig = { damping: 15, stiffness: 400 };
  const cursorXDotSpring = useSpring(cursorX, dotSpringConfig);
  const cursorYDotSpring = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addHoverListeners();

    // Re-bind listeners on DOM changes (e.g. dynamic forms)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-metro-gold pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          backgroundColor: linkHovered ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0)',
          borderColor: linkHovered ? '#ffffff' : '#f59e0b',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-metro-gold rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXDotSpring,
          y: cursorYDotSpring,
          translateX: 12,
          translateY: 12,
        }}
        animate={{
          scale: clicked ? 1.5 : linkHovered ? 0.5 : 1,
          backgroundColor: linkHovered ? '#ffffff' : '#f59e0b',
        }}
      />
    </>
  );
}
