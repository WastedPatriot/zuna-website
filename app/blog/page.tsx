'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'savings', 'gaming', 'crypto', 'tips'];

  const blogPosts = [
    {
      id: 1,
      title: 'How I Saved £5,000 in 6 Months with ZUNA',
      excerpt: 'Discover how our digital pet companion helped one user transform their savings habits and reach their goals faster than ever.',
      category: 'savings',
      author: 'Sarah Johnson',
      date: '2025-08-28',
      readTime: '5 min read',
      image: '💰'
    },
    {
      id: 2,
      title: 'Top 10 Tips for Winning ZUNA Monthly Games',
      excerpt: 'Master strategies from our top players on how to maximize your chances of winning cash prizes in our monthly tournaments.',
      category: 'gaming',
      author: 'Mike Chen',
      date: '2025-08-25',
      readTime: '7 min read',
      image: '🎮'
    },
    {
      id: 3,
      title: 'Understanding ZUNA Tokens: A Beginner\'s Guide',
      excerpt: 'Everything you need to know about earning, using, and trading ZUNA tokens in our integrated crypto wallet.',
      category: 'crypto',
      author: 'Alex Thompson',
      date: '2025-08-22',
      readTime: '8 min read',
      image: '🪙'
    },
    {
      id: 4,
      title: 'The Psychology Behind Gamified Saving',
      excerpt: 'Learn why gamification makes saving money more effective and how ZUNA leverages behavioral psychology.',
      category: 'tips',
      author: 'Dr. Emma Wilson',
      date: '2025-08-20',
      readTime: '6 min read',
      image: '🧠'
    },
    {
      id: 5,
      title: 'Your Digital Pet\'s Happiness: What It Means',
      excerpt: 'Understanding how your ZUNA pet\'s mood reflects your financial health and savings progress.',
      category: 'tips',
      author: 'Lisa Park',
      date: '2025-08-18',
      readTime: '4 min read',
      image: '🐾'
    },
    {
      id: 6,
      title: 'From Zero to Hero: My ZUNA Success Story',
      excerpt: 'A university student shares how ZUNA helped them build an emergency fund while having fun.',
      category: 'savings',
      author: 'Tom Bradley',
      date: '2025-08-15',
      readTime: '5 min read',
      image: '🎓'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
              ZUNA Blog
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto" style={{
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              Tips, tricks, and success stories from the ZUNA community
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b-4 border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{
                  fontFamily: 'monospace',
                  border: '3px solid #1a1a1a',
                  boxShadow: selectedCategory === category ? '3px 3px 0 rgba(0,0,0,0.3)' : '2px 2px 0 rgba(0,0,0,0.2)'
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white hover:transform hover:-translate-y-2 transition-all cursor-pointer"
                style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.2)'
                }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="p-8">
                    <div className="text-6xl mb-4 text-center">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-bold" style={{
                        fontFamily: 'monospace',
                        border: '2px solid #1a1a1a'
                      }}>
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs" style={{ fontFamily: 'monospace' }}>
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3" style={{
                      fontFamily: 'monospace',
                      lineHeight: '1.4'
                    }}>
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm" style={{
                      fontFamily: 'monospace',
                      lineHeight: '1.6'
                    }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500" style={{
                      fontFamily: 'monospace'
                    }}>
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-400 to-pink-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
          }}>
            Stay Updated
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{
            fontFamily: 'monospace',
            lineHeight: '1.6'
          }}>
            Get the latest savings tips and game updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-gray-900"
              style={{
                fontFamily: 'monospace',
                border: '3px solid #1a1a1a',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.3)'
              }}
            />
            <button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3 transition-colors" style={{
              fontFamily: 'monospace',
              border: '3px solid #1a1a1a',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.3)'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
