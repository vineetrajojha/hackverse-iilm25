import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const navItems = ['Home', 'About', 'Team', 'Contact'];

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full bg-forest-green text-white py-4 z-50 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          AAROHAN
        </motion.h1>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-spring-green transition-colors font-medium py-1"
            >
              {item}
            </Link>
          ))}
          <motion.button
            onClick={() => navigate('/auth')}
            className="cursor-pointer hover:text-spring-green transition-colors font-medium py-1"
            whileHover={{ scale: 1.05 }}
          >
            Hearing
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;