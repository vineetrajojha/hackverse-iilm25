import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const leftLogoOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rightLogoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="min-h-screen pt-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Main content section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-deep-jungle mb-6">
              Transforming Ideas into Reality
            </h2>
            <p className="text-moss-green text-lg mb-8">
              AAROHAN is a pioneering technology company dedicated to creating innovative solutions 
              that drive business growth and digital transformation.
            </p>
            <motion.button
              onClick={() => navigate('/auth')}
              className="bg-herbal-green text-white px-8 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          <div className="md:w-1/2 relative h-[500px]">
            <motion.div
              className="absolute inset-0 flex justify-center items-center"
              style={{ opacity: rightLogoOpacity }}
            >
              <img
                src="/logo.jpeg"
                alt="AAROHAN Logo"
                className="w-100 h-100 object-contain" // Increased from w-80 h-80
              />
            </motion.div>
          </div>
        </div>

        {/* Services grid moved below both content and logo */}
        <motion.div
          className="w-full flex justify-center"
          style={{ opacity: leftLogoOpacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl">
            {['Innovation', 'Excellence', 'Growth', 'Solutions'].map((service) => (
              <motion.div
                key={service}
                className="bg-fresh-sage p-4 rounded-lg text-white text-center"
                whileHover={{ scale: 1.05 }}
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;