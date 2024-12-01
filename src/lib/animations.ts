import { Variants } from 'framer-motion';

export const presetAnimations = {
  subtle: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  playful: {
    initial: { scale: 0.9, rotate: -5, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0.9, rotate: 5, opacity: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
  professional: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  minimal: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  dramatic: {
    initial: { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
    exit: { scale: 0.9, opacity: 0, filter: 'blur(10px)' },
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
  techno: {
    initial: { opacity: 0, y: 20, scaleY: 0.8 },
    animate: { opacity: 1, y: 0, scaleY: 1 },
    exit: { opacity: 0, y: -20, scaleY: 0.8 },
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  glitch: {
    initial: { opacity: 0, x: -3 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: 'linear',
        repeat: 2,
        repeatType: 'reverse',
      },
    },
    exit: { opacity: 0, x: 3 },
  },
} as const;

export const sectionAnimations: Record<string, Variants> = {
  fadeSlideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
  slideFromRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  expandCollapse: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
  },
};

export const hoverAnimations = {
  lift: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2 },
  },
  glow: {
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    transition: { duration: 0.2 },
  },
  highlight: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    transition: { duration: 0.2 },
  },
};

export const scrollAnimations = {
  fadeIn: {
    opacity: 0,
    y: 20,
    transition: {
      opacity: { duration: 0.6 },
      y: { duration: 0.6, ease: 'easeOut' },
    },
  },
  scaleIn: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  stagger: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const templateSpecificAnimations = {
  minimal: {
    content: presetAnimations.minimal,
    sections: sectionAnimations.fadeSlideUp,
    hover: hoverAnimations.lift,
  },
  modern: {
    content: presetAnimations.professional,
    sections: sectionAnimations.fadeScale,
    hover: hoverAnimations.glow,
  },
  creative: {
    content: presetAnimations.playful,
    sections: sectionAnimations.slideFromRight,
    hover: hoverAnimations.highlight,
  },
  tech: {
    content: presetAnimations.techno,
    sections: sectionAnimations.expandCollapse,
    hover: {
      ...hoverAnimations.lift,
      ...hoverAnimations.glow,
    },
  },
  glitch: {
    content: presetAnimations.glitch,
    sections: {
      initial: { opacity: 0, x: -3 },
      animate: {
        opacity: [0, 1, 0.5, 1],
        x: [-3, 0, 2, 0],
        transition: {
          duration: 0.3,
          times: [0, 0.2, 0.4, 1],
        },
      },
    },
    hover: {
      x: [-2, 0, 2, 0],
      transition: {
        duration: 0.3,
        repeat: 2,
        repeatType: 'reverse',
      },
    },
  },
};
