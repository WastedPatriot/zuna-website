'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InteractiveBackground from '../components/InteractiveBackground';
import Navigation from '../components/Navigation';
import PixelMascot from '../components/PixelMascot';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    acceptTerms: false,
    marketingEmails: false
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const validateStep1 = () => {
    const newErrors: any = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old';
      }
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      if (validateStep2()) {
        setIsLoading(true);
        
        // Simulate API call with encryption
        setTimeout(() => {
          console.log('Encrypted data would be sent to server:', {
            ...formData,
            password: '***encrypted***'
          });
          
          // Redirect to success page
          router.push('/signup/success');
        }, 2000);
      }
    }
  };

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
            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold pixelated text-sm ${
                  step >= 1 ? 'bg-green-400 text-black' : 'bg-gray-700 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-green-400' : 'bg-gray-700'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold pixelated text-sm ${
                  step >= 2 ? 'bg-green-400 text-black' : 'bg-gray-700 text-gray-400'
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* Mascot */}
            <div className="flex justify-center mb-6">
              <PixelMascot size={60} mood="happy" />
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-2 pixelated text-green-400">
              {step === 1 ? 'CREATE ACCOUNT' : 'ALMOST THERE'}
            </h1>
            
            <p className="text-center text-gray-400 mb-8">
              {step === 1 ? 'Start your financial journey' : 'Just a few more details'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
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
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 pixelated">CONFIRM PASSWORD</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2 pixelated">FULL NAME</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 pixelated">DATE OF BIRTH</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                    />
                    {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-green-400"
                      />
                      <span className="text-sm text-gray-300">
                        I accept the <Link href="/terms" className="text-green-400 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-green-400 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                    {errors.acceptTerms && <p className="text-red-400 text-xs">{errors.acceptTerms}</p>}
                    
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.marketingEmails}
                        onChange={(e) => setFormData({ ...formData, marketingEmails: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-green-400"
                      />
                      <span className="text-sm text-gray-300">
                        Send me tips and updates about my Tamagotchi
                      </span>
                    </label>
                  </div>
                </>
              )}
              
              <div className="flex gap-4 mt-8">
                {step === 2 && (
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 border-2 border-gray-700 text-gray-400 rounded-lg font-bold pixelated hover:border-gray-600 transition-colors"
                  >
                    BACK
                  </motion.button>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold pixelated hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'CREATING...' : step === 1 ? 'NEXT' : 'CREATE ACCOUNT'}
                </motion.button>
              </div>
            </form>
            
            <p className="text-center text-gray-400 mt-6">
              Already have an account? <Link href="/login" className="text-green-400 hover:underline">Login</Link>
            </p>
          </div>
          
          {/* Security Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <span>🔒</span>
              <span>256-bit encryption • PCI compliant • FCA regulated</span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
