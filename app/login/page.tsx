'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InteractiveBackground from '../components/InteractiveBackground';
import Navigation from '../components/Navigation';
import PixelMascot from '../components/PixelMascot';
import { loginWithRedirect, handleRedirectCallback } from '../../lib/auth0';

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
      
      try {
        // Use Auth0 for authentication
        await loginWithRedirect();
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'Login failed. Please try again.' });
        setIsLoading(false);
      }
    }
  };

  // Handle Auth0 callback
  useEffect(() => {
    const handleAuth0Callback = async () => {
      if (window.location.search.includes('code=')) {
        try {
          await handleRedirectCallback();
          router.push('/dashboard');
        } catch (error) {
          console.error('Callback error:', error);
        }
      }
    };
    
    handleAuth0Callback();
  }, [router]);

  return (
    <>
      <InteractiveBackground />
      <Navigation />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/50">
            {/* Mascot */}
            <div className="flex justify-center mb-6">
              <PixelMascot size={60} mood="happy" />
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-2 pixelated text-green-400">
              WELCOME BACK
            </h1>
            
            <p className="text-center text-gray-400 mb-8">
              Login to continue your journey
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 pixelated">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 pixelated">PASSWORD</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 accent-green-400"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                
                <Link href="/forgot-password" className="text-sm text-green-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold pixelated hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50"
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </motion.button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">OR</span>
              </div>
            </div>
            
            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full py-3 bg-black/50 border-2 border-gray-700 rounded-lg font-bold hover:border-gray-600 transition-colors flex items-center justify-center gap-3">
                <span className="text-xl">🍎</span>
                <span>Continue with Apple</span>
              </button>
              
              <button className="w-full py-3 bg-black/50 border-2 border-gray-700 rounded-lg font-bold hover:border-gray-600 transition-colors flex items-center justify-center gap-3">
                <span className="text-xl">🔵</span>
                <span>Continue with Google</span>
              </button>
            </div>
            
            <p className="text-center text-gray-400 mt-6">
              Don't have an account? <Link href="/signup" className="text-green-400 hover:underline">Sign up</Link>
            </p>
          </div>
          
          {/* Security Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <span>🔒</span>
              <span>Secure login with 256-bit encryption</span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
