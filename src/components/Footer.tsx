import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com' },
    { icon: FaInstagram, url: 'https://instagram.com' },
    { icon: FaFacebook, url: 'https://facebook.com' },
  ];

  return (
    <footer className="bg-forest-green text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">AAROHAN</h3>
            <p className="text-sm opacity-80">
              Transforming businesses through innovative technology solutions. 
              We help companies navigate the digital landscape with confidence.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-spring-green transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-spring-green transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-spring-green transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#62BD69' }}
                  className="text-white hover:text-spring-green transition-colors"
                >
                  <social.icon size={29} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} AAROHAN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;