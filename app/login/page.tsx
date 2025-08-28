'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SpriteAnimation from '../components/SpriteAnimation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt:', {
          email: formData.email,
          password: '***encrypted***',
          rememberMe: formData.rememberMe
        });
        
        // Redirect to app or dashboard
        router.push('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      {/* Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-[-100px] w-[200px] h-[60px] bg-white rounded-full opacity-70"
          animate={{
            x: [0, typeof window !== 'undefined' ? window.innerWidth + 200 : 2120],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            boxShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}
        />
        
        <motion.div
          className="absolute top-32 left-[-150px] w-[250px] h-[80px] bg-white rounded-full opacity-60"
          animate={{
            x: [0, typeof window !== 'undefined' ? window.innerWidth + 250 : 2170],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
          style={{
            boxShadow: '0 0 25px rgba(255,255,255,0.4)',
          }}
        />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 pixel-border shadow-2xl">
            {/* ZUNA Mascot */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl border-2 border-gray-800">
                <SpriteAnimation
                  sprite="/sprites/waving.webp"
                  frames={4}
                  frameRate={400}
                  size={64}
                  alt="Waving Zuna Mascot"
                />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-2 pixel-text text-gray-900">
              WELCOME BACK
            </h1>
            
            <p className="text-center text-gray-600 mb-8 pixel-text text-sm">
              Your pet missed you!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 pixel-text text-gray-900">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-4 border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none transition-colors pixel-text text-sm"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 pixel-text">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 pixel-text text-gray-900">PASSWORD</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-4 border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none transition-colors pixel-text text-sm"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 pixel-text">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 accent-green-400"
                  />
                  <span className="text-sm text-gray-700 pixel-text">Remember me</span>
                </label>
                
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline pixel-text">
                  Forgot password?
                </Link>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold pixel-text pixel-border hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </motion.button>
            </form>
            
            <p className="text-center text-gray-600 mt-6 pixel-text text-sm">
              Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          </div>
          
          {/* Security Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-700 flex items-center justify-center gap-2 pixel-text">
              <span>🔒</span>
              <span>256-bit encryption • PCI compliant • FCA regulated</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}