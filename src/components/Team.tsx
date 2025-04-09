import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin } from 'react-icons/fa';

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const team = [
    {
      name: 'Priyansh Singh',
      role: '',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Krish Sen',
      role: '',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Harshita Sharma',
      role: '',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Vineet Raj',
      role: '',
      image: '/team-placeholder.jpg',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-deep-jungle mb-16 text-center">
            Our Team
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-deep-jungle">
                    {member.name}
                  </h3>
                  <p className="text-moss-green mb-3">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-herbal-green hover:text-spring-green transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;