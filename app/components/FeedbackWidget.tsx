'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'bug' | 'feature' | 'improvement'>('improvement');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send feedback to your backend or email service
    try {
      // For now, we'll just log it. You can integrate with your backend later
      console.log('Feedback submitted:', { type, email, feedback });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFeedback('');
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border-2 border-green-400/50"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    ✅
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-400 pixelated">THANK YOU!</h3>
                  <p className="text-gray-400 mt-2">Your feedback has been received</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4 pixelated text-green-400">
                    FEEDBACK
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Feedback Type */}
                    <div>
                      <label className="block text-sm font-bold mb-2 pixelated">TYPE</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['bug', 'feature', 'improvement'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                            className={`py-2 px-3 rounded-lg font-bold pixelated text-sm transition-all ${
                              type === t
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                          >
                            {t.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold mb-2 pixelated">
                        EMAIL (OPTIONAL)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Feedback */}
                    <div>
                      <label className="block text-sm font-bold mb-2 pixelated">
                        YOUR FEEDBACK
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg focus:border-green-400 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us what you think..."
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-3 border-2 border-gray-700 text-gray-400 rounded-lg font-bold pixelated hover:border-gray-600 transition-colors"
                      >
                        CANCEL
                      </button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !feedback.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold pixelated disabled:opacity-50"
                      >
                        {isSubmitting ? 'SENDING...' : 'SEND'}
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
