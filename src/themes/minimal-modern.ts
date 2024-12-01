export const minimalModernTheme = {
  name: 'Minimal Modern',
  background: '#ffffff',  // Pure white
  text: '#1a1a1a',        // Deep charcoal
  accent: '#007bff',      // Modern blue
  cardBackground: 'rgba(250, 250, 250, 0.8)',  // Light translucent background
  borderColor: '#e0e0e0', // Light grey border
  
  // Typography
  fontFamily: "'Inter', sans-serif",
  
  // Subtle effects
  glowEffect: {
    textShadow: '0 0 5px rgba(0, 123, 255, 0.2)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  
  // Color variants
  colors: {
    primary: '#007bff',   // Modern blue
    secondary: '#6c757d', // Grey
    error: '#dc3545',     // Soft red
    success: '#28a745',   // Soft green
  },
  
  // Gradient backgrounds
  gradients: {
    primary: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    accent: 'linear-gradient(45deg, #007bff 0%, #0056b3 100%)',
  }
};
