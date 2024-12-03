import { motion } from 'framer-motion';

export default function AnimatedDevIcon() {
  return (
    <motion.div
      className="relative h-12 flex items-center justify-center overflow-hidden"
      initial={{ width: "48px" }}
      animate={{ width: "128px" }}
      transition={{
        width: {
          duration: 0.6,
          ease: "easeOut"
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Rotating outer ring */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-purple-500/30"
        animate={{
          rotate: 360,
          borderColor: ['rgba(147, 51, 234, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(147, 51, 234, 0.3)'],
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          },
          borderColor: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />

      {/* Inner rotating squares */}
      <motion.div
        className="absolute inset-1 rounded-lg border-2 border-purple-400/40"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />

      {/* Central text container */}
      <motion.div
        className="relative z-10 bg-black rounded-md"
        initial={{ opacity: 0, width: "32px" }}
        animate={{ 
          opacity: 1, 
          width: "116px",
          transition: {
            width: {
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1
            },
            opacity: {
              duration: 0.3,
              delay: 0.2
            }
          }
        }}
      >
        <motion.div
          className="px-4 py-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.div
            className="font-bold text-base tracking-wider font-mono whitespace-nowrap"
            style={{
              background: 'linear-gradient(to right, #9333EA, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(147, 51, 234, 0.3)',
            }}
          >
            DevoApp
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 bg-purple-500/5 rounded-lg blur-sm"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Side accent lines */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-gradient-to-r from-purple-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          opacity: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }
        }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-gradient-to-l from-purple-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          opacity: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.7
          }
        }}
      />
    </motion.div>
  );
}
