import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}