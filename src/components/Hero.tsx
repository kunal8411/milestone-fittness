import { motion } from 'framer-motion';
import Link from 'next/link';
import ImageSlider from './ImageSlider';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Slider */}
      <ImageSlider />
      
      {/* Hero Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className=""
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-red-500 tracking-wider">
            MILESTONE FITNESS
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
            Achieve Your Fitness Goals
          </h1>
          <p className="text-lg md:text-xl mb-8 mx-auto text-white/90 drop-shadow-md">
            Join our state-of-the-art gym facility with expert trainers and premium equipment
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300 shadow-lg"
            >
              Get a Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 