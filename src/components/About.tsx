import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold text-deep-jungle text-center mb-16"
        >
          About AAROHAN
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="bg-fresh-sage/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-deep-jungle mb-4">Our Complement</h3>
            <p className="text-moss-green">
              At AAROHAN, we complement your business vision with cutting-edge technology 
              solutions. Our expertise spans across multiple domains, ensuring that we can 
              tackle any challenge with confidence and precision.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-fresh-sage/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-deep-jungle mb-4">Our Dream</h3>
            <p className="text-moss-green">
              We dream of a future where technology seamlessly integrates with human 
              potential. Our vision is to be at the forefront of this transformation, 
              creating solutions that make a lasting impact on businesses and society.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;