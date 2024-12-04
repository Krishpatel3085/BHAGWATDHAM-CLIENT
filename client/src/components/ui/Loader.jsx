import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { colors } from "../../Utilis/Colors";
import lodermain from '../../images/lodermain.png'

export function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);
  console.log(progress)
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: colors.background }} // Use inline styles for dynamic colors
    >
      <div className="text-center">
        {/* <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 mb-4 rounded-full border-8 animate-spin"
          style={{
            borderColor: `${colors.primary}`,
            borderTopColor: `${colors.accent}`,
          }}
        /> */}

        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl font-bold mb-2"
          style={{ color: colors.primary }}>
          <img src={lodermain} alt="loader logo" className="w-40 h-48 animate-bounce" /></motion.h2>

        {/* <div
          className="w-64 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: colors.secondary }}
        > */}
        {/* <motion.div
            className="h-full"
            style={{ backgroundColor: colors.primary, width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          /> */}
        {/* </div> */}

      </div>
    </motion.div>
  );
}
