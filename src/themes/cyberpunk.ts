export const cyberpunkTheme = {
  name: 'Cyberpunk',
  background: '#0a0a1a',  // Deep dark blue-black
  text: '#e0e0ff',        // Soft electric blue
  accent: '#00ffff',      // Bright cyan
  cardBackground: 'rgba(10, 10, 26, 0.7)',  // Translucent background
  borderColor: '#00ffff', // Accent color for borders
  
  // Typography
  fontFamily: "'Orbitron', sans-serif",
  
  // Additional theme-specific styles
  glowEffect: {
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
  },
  
  // Color variants
  colors: {
    primary: '#00ffff',   // Bright cyan
    secondary: '#ff00ff', // Bright magenta
    error: '#ff0040',     // Bright red
    success: '#00ff40',   // Bright green
  },
  
  // Gradient backgrounds
  gradients: {
    primary: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)',
    accent: 'linear-gradient(45deg, #00ffff 0%, #ff00ff 100%)',
  }
};
