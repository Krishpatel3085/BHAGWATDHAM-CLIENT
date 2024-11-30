const colors = require('./src/Utilis/Colors'); // Adjust path as needed

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Adjust according to your file structure
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
