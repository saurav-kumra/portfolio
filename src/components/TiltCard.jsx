import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TILT_MAX  = 18;   // max rotation degrees
const SCALE_MAX = 1.04; // subtle scale on hover
const SPRING    = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * TiltCard — wraps any children with a smooth 3D mouse-tilt + glare effect.
 *
 * Props:
 *   className  – extra class(es) to merge onto the wrapper div
 *   style      – extra inline styles
 *   ...rest    – any other motion.div props (variants, animate, etc.)
 */
const TiltCard = ({ children, className = '', style = {}, ...rest }) => {
  const ref = useRef(null);

  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [ TILT_MAX, -TILT_MAX]), SPRING);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-TILT_MAX,  TILT_MAX]), SPRING);
  const scale   = useSpring(1, SPRING);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
    glareX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glareY.set(((e.clientY - rect.top)  / rect.height) * 100);
    scale.set(SCALE_MAX);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    glareX.set(50);
    glareY.set(50);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        willChange: 'transform',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}

      {/* Moving glare overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 9,
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)`
          ),
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
