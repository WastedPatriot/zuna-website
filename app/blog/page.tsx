'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const blogPosts = [
    {
      id: 1,
      title: 'How ZUNA Makes Saving Fun',
      excerpt: 'Discover how gamification transforms your financial habits',
      date: 'Dec 15, 2024',
      category: 'Tips',
      color: '#10b981',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Meet Your Digital Pet',
      excerpt: 'Learn how your savings buddy helps you reach your goals',
      date: 'Dec 10, 2024',
      category: 'Features',
      color: '#667eea',
      readTime: '3 min'
    },
    {
      id: 3,
      title: 'AI Coach Pro Guide',
      excerpt: 'Get the most out of your personalized financial advisor',
      date: 'Dec 5, 2024',
      category: 'Tutorial',
      color: '#FFD700',
      readTime: '7 min'
    },
    {
      id: 4,
      title: 'Family Savings Strategies',
      excerpt: 'Tips for managing finances with your whole family',
      date: 'Nov 28, 2024',
      category: 'Family',
      color: '#FF69B4',
      readTime: '6 min'
    },
    {
      id: 5,
      title: 'Crypto Rewards Explained',
      excerpt: 'Understanding ZUNA tokens and how to earn them',
      date: 'Nov 20, 2024',
      category: 'Crypto',
      color: '#F0A000',
      readTime: '4 min'
    },
    {
      id: 6,
      title: 'Security Best Practices',
      excerpt: 'Keep your financial data safe with these tips',
      date: 'Nov 15, 2024',
      category: 'Security',
      color: '#DC143C',
      readTime: '5 min'
    }
  ];

  const categories = ['All', 'Tips', 'Features', 'Tutorial', 'Family', 'Crypto', 'Security'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <PixelBackground isDarkMode={isDarkMode}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '12px'
          }}>
            ← HOME
          </Link>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded"
            style={{
              backgroundColor: isDarkMode ? '#FFD700' : '#4A90E2',
              border: '2px solid',
              borderColor: isDarkMode ? '#FFA500' : '#357ABD',
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '10px'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              textShadow: '4px 4px 0 rgba(0,0,0,0.3)'
            }}>
              ZUNA Blog
            </h1>
            <p style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              fontSize: '14px'
            }}>
              Tips, tutorials, and financial wisdom
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 transition-all hover:scale-105"
                style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  backgroundColor: selectedCategory === category ? '#667eea' : 'transparent',
                  color: '#FFFFFF',
                  border: '2px solid',
                  borderColor: selectedCategory === category ? '#667eea' : 'rgba(102, 126, 234, 0.5)',
                  imageRendering: 'pixelated'
                }}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer transition-transform hover:scale-105"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                  border: '4px solid',
                  borderColor: post.color,
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                  padding: '24px',
                  imageRendering: 'pixelated'
                }}
              >
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '8px',
                    backgroundColor: post.color,
                    color: post.color === '#FFD700' ? '#000' : '#FFF',
                    border: '2px solid rgba(0,0,0,0.2)'
                  }}>
                    {post.category.toUpperCase()}
                  </span>
                  <span style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '8px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    {post.readTime}
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="mb-3" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '14px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                  lineHeight: '1.5'
                }}>
                  {post.title}
                </h3>

                {/* Post Excerpt */}
                <p className="mb-4" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  color: isDarkMode ? '#B0B0B0' : '#666666',
                  lineHeight: '1.8'
                }}>
                  {post.excerpt}
                </p>

                {/* Post Date */}
                <div className="flex justify-between items-center">
                  <span style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '9px',
                    color: isDarkMode ? '#667eea' : '#4A90E2'
                  }}>
                    {post.date}
                  </span>
                  <span style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: post.color
                  }}>
                    READ MORE →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8" style={{
              backgroundColor: isDarkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(74, 144, 226, 0.1)',
              border: '4px solid #FFD700',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
              imageRendering: 'pixelated'
            }}>
              <h2 className="mb-4" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '20px',
                color: '#FFD700'
              }}>
                STAY UPDATED
              </h2>
              <p className="mb-6" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '11px',
                color: isDarkMode ? '#B0B0B0' : '#666666'
              }}>
                Get weekly tips and updates
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="YOUR@EMAIL.COM"
                  className="flex-1 px-4 py-3"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '11px',
                    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                    border: '2px solid #FFD700',
                    color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                    outline: 'none'
                  }}
                />
                <button className="px-6 py-3" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '11px',
                  backgroundColor: '#FFD700',
                  color: '#000',
                  border: '2px solid #FFA500',
                  boxShadow: '4px 4px 0 #000'
                }}>
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </section>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}