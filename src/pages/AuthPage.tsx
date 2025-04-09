import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

type Role = 'trainee' | 'lawyer' | 'user';
type Mode = 'signin' | 'signup';

const commonSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  aadhar: z.string().regex(/^\d{12}$/, 'Aadhar number must be 12 digits'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const lawyerSchema = commonSchema.extend({
  barNumber: z.string().min(6, 'Bar number must be at least 6 characters'),
});

const AuthPage = () => {
  const [mode, setMode] = useState<Mode>('signin');
  const [role, setRole] = useState<Role>('user');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadhar: '',
    email: '',
    password: '',
    barNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = role === 'lawyer' ? lawyerSchema : commonSchema;
      schema.parse(formData);

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              role,
              name: formData.name,
              phone: formData.phone,
              aadhar: formData.aadhar,
              ...(role === 'lawyer' && { barNumber: formData.barNumber }),
            },
          },
        });

        if (error) throw error;
        toast.success('Successfully signed up! Please check your email for verification.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        toast.success('Successfully signed in!');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-forest-green flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-deep-jungle">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'} to AAROHAN
          </h2>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setMode('signin')}
              className={`px-4 py-2 rounded-lg ${
                mode === 'signin'
                  ? 'bg-herbal-green text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-lg ${
                mode === 'signup'
                  ? 'bg-herbal-green text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {(['trainee', 'lawyer', 'user'] as Role[]).map((r) => (
            <motion.button
              key={`role-select-${mode}-${r}`}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-lg capitalize ${
                role === r
                  ? 'bg-fresh-sage text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {r}
            </motion.button>
          ))}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <div className="space-y-4">
              {mode === 'signup' && (
                <>
                  <motion.div
                    key="name-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring-herbal-green"
                    />
                  </motion.div>

                  <motion.div
                    key="phone-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring-herbal-green"
                    />
                  </motion.div>

                  <motion.div
                    key="aadhar-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Aadhar Number
                    </label>
                    <input
                      type="text"
                      value={formData.aadhar}
                      onChange={(e) =>
                        setFormData({ ...formData, aadhar: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring-herbal-green"
                    />
                  </motion.div>

                  {role === 'lawyer' && (
                    <motion.div
                      key="bar-number-input"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        Bar Number
                      </label>
                      <input
                        type="text"
                        value={formData.barNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, barNumber: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring-herbal-green"
                      />
                    </motion.div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring-herbal-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-herbal-green focus:ring-herbal-green"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-herbal-green hover:bg-spring-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-herbal-green"
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;