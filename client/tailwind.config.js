const colors = require('./src/Utilis/Colors'); 

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], 
  theme: {
    extend: {
      colors: {
        primary: "#FFA500",    // Deep Orange
        secondary: "#8B4513",  // Saddle Brown
        accent: "#FFD700",     // Gold
        background: "#FFF5E6", // Light Cream
        text: "#4A3728",       // Dark Brown
        white: "#FFFFFF"
      },
    },
  },
  plugins: [],
};
