'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-400 to-sky-300 pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
            }}>
              Contact Us
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto" style={{
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              We're here to help! Get in touch with the ZUNA team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-50 p-8"
              style={{
                border: '4px solid #1a1a1a',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)'
              }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid #1a1a1a',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid #1a1a1a',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid #1a1a1a',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white resize-none"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid #1a1a1a',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 transition-colors"
                  style={{
                    fontFamily: 'monospace',
                    border: '3px solid rgba(0,0,0,0.2)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}>
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8" style={{
                  fontFamily: 'monospace',
                  lineHeight: '1.8'
                }}>
                  Have questions about ZUNA? We're here to help! Reach out through the form or contact us directly.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-white p-6" style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
                }}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">📧</span>
                    <div>
                      <h3 className="font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                        Email
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'monospace' }}>
                        hello@zuna.app
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6" style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
                }}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">💬</span>
                    <div>
                      <h3 className="font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                        Live Chat
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'monospace' }}>
                        Available Mon-Fri, 9am-6pm GMT
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6" style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
                }}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">📍</span>
                    <div>
                      <h3 className="font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                        Office
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'monospace' }}>
                        London, United Kingdom
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6" style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
                }}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🐦</span>
                    <div>
                      <h3 className="font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                        Social Media
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'monospace' }}>
                        @zunafinance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.2)'
              }}>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                  Looking for quick answers?
                </h3>
                <p className="text-sm mb-4" style={{ fontFamily: 'monospace' }}>
                  Check out our FAQ section for instant help
                </p>
                <a href="/faq" className="inline-block bg-white text-gray-900 px-4 py-2 font-bold hover:bg-gray-100 transition-colors" style={{
                  fontFamily: 'monospace',
                  border: '2px solid #1a1a1a',
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.2)'
                }}>
                  Visit FAQ →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
