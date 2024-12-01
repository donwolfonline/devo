'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCustomization } from '@/context/CustomizationContext';

const deviceDimensions = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: '100%',
    height: '100%',
  },
};

interface DevicePreviewProps {
  children: React.ReactNode;
}

export default function DevicePreview({ children }: DevicePreviewProps) {
  const { state } = useCustomization();
  const { devicePreview } = state;

  const isResponsivePreview = devicePreview !== 'desktop';
  const dimensions = deviceDimensions[devicePreview];

  const frameVariants = {
    mobile: {
      borderRadius: '2rem',
      padding: '1rem',
    },
    tablet: {
      borderRadius: '1.5rem',
      padding: '1rem',
    },
    desktop: {
      borderRadius: 0,
      padding: 0,
    },
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  if (!isResponsivePreview) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <motion.div
        initial={false}
        animate={devicePreview}
        variants={frameVariants}
        className="bg-white dark:bg-gray-800 shadow-2xl overflow-hidden relative"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxHeight: '90vh',
        }}
      >
        {/* Device Frame */}
        <div className="absolute inset-0 pointer-events-none">
          {devicePreview === 'mobile' && (
            <>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-800 dark:bg-gray-200 rounded-full" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-gray-800 dark:border-gray-200 rounded-full" />
            </>
          )}
          {devicePreview === 'tablet' && (
            <>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 border-2 border-gray-800 dark:border-gray-200 rounded-full" />
            </>
          )}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={devicePreview}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full overflow-auto"
            style={{
              maxWidth: dimensions.width,
              maxHeight: dimensions.height,
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
