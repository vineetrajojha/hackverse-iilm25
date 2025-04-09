import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: 'Digital Transformation',
      description: 'Modernize your business with cutting-edge digital solutions',
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure for your needs',
    },
    {
      title: 'Custom Development',
      description: 'Tailored software solutions for your unique requirements',
    },
    {
      title: 'AI Integration',
      description: 'Leverage the power of artificial intelligence for growth',
    },
  ];

  return (
    <section className="py-20 bg-fresh-sage/5">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-deep-jungle mb-16 text-left">
            Our Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-deep-jungle mb-3">
                  {feature.title}
                </h3>
                <p className="text-moss-green">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;