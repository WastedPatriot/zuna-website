'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpriteAnimation from '../components/SpriteAnimation';
import { useAuth0 } from '../providers/Auth0Provider';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth0();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    acceptTerms: false,
    marketingEmails: false
  });
  const [errors, setErrors] = useState<any>({});

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
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    try {
      // Sign up with Auth0
      await login();
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Sign Up Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8"
              style={{
                border: '4px solid #1a1a1a',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.3)'
              }}
            >
              {/* Mascot */}
              <div className="flex justify-center mb-6">
                <SpriteAnimation
                  sprite="/sprites/happy.webp"
                  frames={4}
                  frameRate={200}
                  size={80}
                  alt="ZUNA Happy"
                />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }}>
                Start Your Journey!
              </h1>
              <p className="text-gray-600 text-center mb-8" style={{
                fontFamily: 'monospace'
              }}>
                Join ZUNA and start saving with fun
              </p>

              {/* Progress Bar */}
              <div className="flex gap-2 mb-8">
                <div className={`flex-1 h-2 ${step >= 1 ? 'bg-green-500' : 'bg-gray-300'}`} style={{
                  border: '2px solid #1a1a1a'
                }} />
                <div className={`flex-1 h-2 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`} style={{
                  border: '2px solid #1a1a1a'
                }} />
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3"
                        placeholder="your@email.com"
                        style={{
                          fontFamily: 'monospace',
                          border: '3px solid #1a1a1a',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                        }}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'monospace' }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3"
                        placeholder="Min 8 characters"
                        style={{
                          fontFamily: 'monospace',
                          border: '3px solid #1a1a1a',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                        }}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'monospace' }}>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3"
                        placeholder="Re-enter password"
                        style={{
                          fontFamily: 'monospace',
                          border: '3px solid #1a1a1a',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                        }}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'monospace' }}>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 transition-colors"
                      style={{
                        fontFamily: 'monospace',
                        border: '3px solid rgba(0,0,0,0.2)',
                        boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                      }}
                    >
                      Continue →
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3"
                        placeholder="John Doe"
                        style={{
                          fontFamily: 'monospace',
                          border: '3px solid #1a1a1a',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                        }}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1" style={{ fontFamily: 'monospace' }}>
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1"
                          style={{ accentColor: '#10b981' }}
                        />
                        <span className="text-gray-700 text-sm" style={{ fontFamily: 'monospace' }}>
                          I accept the{' '}
                          <Link href="/terms" className="text-green-600 hover:text-green-700 font-bold">
                            Terms and Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-green-600 hover:text-green-700 font-bold">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.acceptTerms && (
                        <p className="text-red-500 text-xs ml-7" style={{ fontFamily: 'monospace' }}>
                          {errors.acceptTerms}
                        </p>
                      )}

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="marketingEmails"
                          checked={formData.marketingEmails}
                          onChange={handleChange}
                          className="mt-1"
                          style={{ accentColor: '#10b981' }}
                        />
                        <span className="text-gray-700 text-sm" style={{ fontFamily: 'monospace' }}>
                          Send me tips and updates about saving (optional)
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 transition-colors"
                        style={{
                          fontFamily: 'monospace',
                          border: '3px solid rgba(0,0,0,0.2)',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 transition-colors"
                        style={{
                          fontFamily: 'monospace',
                          border: '3px solid rgba(0,0,0,0.2)',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                        }}
                      >
                        {isLoading ? 'Creating...' : 'Create Account'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500" style={{ fontFamily: 'monospace' }}>
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={login}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 transition-colors"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid rgba(0,0,0,0.2)',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                    }}
                  >
                    🔐 Auth0
                  </button>
                  <button
                    type="button"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 transition-colors"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid rgba(0,0,0,0.2)',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                    }}
                  >
                    🍎 Apple
                  </button>
                </div>
              </div>

              <p className="text-center mt-8 text-gray-600" style={{ fontFamily: 'monospace' }}>
                Already have an account?{' '}
                <Link href="/signin" className="text-green-600 hover:text-green-700 font-bold">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}