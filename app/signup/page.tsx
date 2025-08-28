'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SpriteAnimation from '../components/SpriteAnimation';

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
            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold pixel-text text-sm ${
                  step >= 1 ? 'bg-green-400 text-black' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-green-400' : 'bg-gray-300'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold pixel-text text-sm ${
                  step >= 2 ? 'bg-green-400 text-black' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* ZUNA Mascot */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl border-2 border-gray-800">
                <SpriteAnimation
                  sprite="/sprites/happy.webp"
                  frames={4}
                  frameRate={500}
                  size={64}
                  alt="Happy Zuna Mascot"
                />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2 pixel-text text-gray-900">
              {step === 1 ? 'CREATE ACCOUNT' : 'ALMOST THERE'}
            </h1>
            
            <p className="text-center text-gray-600 mb-8 pixel-text text-sm">
              {step === 1 ? 'Start your financial journey' : 'Just a few more details'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
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
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 pixel-text text-gray-900">CONFIRM PASSWORD</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-4 border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none transition-colors pixel-text text-sm"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 pixel-text">{errors.confirmPassword}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2 pixel-text text-gray-900">FULL NAME</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-4 border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none transition-colors pixel-text text-sm"
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1 pixel-text">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 pixel-text text-gray-900">DATE OF BIRTH</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-4 border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none transition-colors pixel-text text-sm"
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1 pixel-text">{errors.dateOfBirth}</p>}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-green-400"
                      />
                      <span className="text-sm text-gray-700 pixel-text">
                        I accept the <Link href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                    {errors.acceptTerms && <p className="text-red-500 text-xs pixel-text">{errors.acceptTerms}</p>}
                    
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.marketingEmails}
                        onChange={(e) => setFormData({ ...formData, marketingEmails: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-green-400"
                      />
                      <span className="text-sm text-gray-700 pixel-text">
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
                    className="flex-1 py-3 border-4 border-gray-800 text-gray-800 rounded-lg font-bold pixel-text hover:bg-gray-100 transition-colors"
                  >
                    BACK
                  </motion.button>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold pixel-text pixel-border hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? 'CREATING...' : step === 1 ? 'NEXT' : 'CREATE ACCOUNT'}
                </motion.button>
              </div>
            </form>
            
            <p className="text-center text-gray-600 mt-6 pixel-text text-sm">
              Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
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