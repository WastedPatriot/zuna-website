'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpriteAnimation from '../components/SpriteAnimation';
import { useAuth0 } from '../providers/Auth0Provider';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth0();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      <Navbar />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Sign In Card */}
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
                  sprite="/sprites/waving.webp"
                  frames={4}
                  frameRate={200}
                  size={80}
                  alt="ZUNA Welcome"
                />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }}>
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-center mb-8" style={{
                fontFamily: 'monospace'
              }}>
                Sign in to continue your savings journey
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3"
                    placeholder="your@email.com"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid #1a1a1a',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3"
                    placeholder="••••••••"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid #1a1a1a',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#10b981' }} />
                    <span className="text-gray-700 text-sm" style={{ fontFamily: 'monospace' }}>
                      Remember me
                    </span>
                  </label>
                  <Link href="/forgot-password" className="text-green-600 hover:text-green-700 text-sm font-bold" style={{ fontFamily: 'monospace' }}>
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 transition-colors"
                  style={{
                    fontFamily: 'monospace',
                    border: '3px solid rgba(0,0,0,0.2)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500" style={{ fontFamily: 'monospace' }}>
                      Or continue with
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
                Don't have an account?{' '}
                <Link href="/signup" className="text-green-600 hover:text-green-700 font-bold">
                  Sign up
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
