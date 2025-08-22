'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center"
    >
      <h2 className="font-pixel text-3xl md:text-4xl text-green-800 mb-4">
        STAY IN THE LOOP
      </h2>
      <p className="text-lg text-gray-600 mb-8 font-sans max-w-2xl mx-auto">
        Get weekly tips on saving money, exclusive features, and updates about your mascot's new abilities!
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-6 py-4 rounded-full border-2 border-green-200 focus:border-green-500 focus:outline-none transition-colors font-sans"
            disabled={status === 'loading' || status === 'success'}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === 'loading' || status === 'success'}
            className={`px-8 py-4 rounded-full font-medium transition-all ${
              status === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/25'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subscribing...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Subscribed!
              </span>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </div>
        
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 mt-4 font-sans"
          >
            Welcome to the Zuna family! Check your inbox for a special welcome gift 🎁
          </motion.p>
        )}
      </form>
      
      <p className="text-sm text-gray-500 mt-6 font-sans">
        No spam, ever. Unsubscribe anytime. We respect your privacy.
      </p>
    </motion.div>
  );
}
