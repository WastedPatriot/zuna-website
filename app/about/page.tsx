'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';
import Image from 'next/image';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const teamMembers = [
    { name: 'Alex Chen', role: 'CEO & Founder', sprite: 'happy' },
    { name: 'Sarah Williams', role: 'CTO', sprite: 'waving' },
    { name: 'Marcus Johnson', role: 'Head of Design', sprite: 'gaming' },
    { name: 'Emily Rodriguez', role: 'Head of Growth', sprite: 'savings' },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Mission-Driven',
      description: 'Everyone deserves financial wellness'
    },
    {
      icon: '🎮',
      title: 'Fun First',
      description: 'Making finance as fun as gaming'
    },
    {
      icon: '🔒',
      title: 'Security Always',
      description: 'Bank-level encryption & protection'
    },
    {
      icon: '🌱',
      title: 'Growth Mindset',
      description: 'Grow savings & financial habits'
    }
  ];

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
              About ZUNA
            </h1>
            <p className="text-xl mb-8" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              fontSize: '14px'
            }}>
              Your friendly financial companion
            </p>
            
            {/* Mascot */}
            <div className="flex justify-center mb-12">
              <div style={{
                width: '128px',
                height: '128px',
                position: 'relative',
                isolation: 'isolate',
                zIndex: 10
              }}>
                <Image
                  src="/sprites/happy.webp"
                  alt="ZUNA Happy"
                  width={128}
                  height={128}
                  style={{
                    imageRendering: 'pixelated',
                    filter: 'brightness(1) contrast(1)',
                    opacity: 1
                  }}
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center p-8" style={{
            backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.9)' : 'rgba(255,255,255,0.9)',
            border: '4px solid',
            borderColor: isDarkMode ? '#667eea' : '#4A90E2',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
            imageRendering: 'pixelated'
          }}>
            <h2 className="text-3xl font-bold mb-6" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
            }}>
              Our Mission
            </h2>
            <p style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '12px',
              lineHeight: '2',
              color: isDarkMode ? '#B0B0B0' : '#666666'
            }}>
              We believe financial wellness should be accessible, fun, and rewarding for everyone. 
              ZUNA combines gamification with smart financial tools to help you build better money habits 
              while having fun along the way.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-12" style={{
            fontFamily: pixelFont.style.fontFamily,
            color: '#FFFFFF',
            textShadow: '2px 2px 0 rgba(102, 126, 234, 0.5)'
          }}>
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 text-center"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                  border: '4px solid',
                  borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated'
                }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold mb-2" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '14px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-12" style={{
            fontFamily: pixelFont.style.fontFamily,
            color: '#FFFFFF',
            textShadow: '2px 2px 0 rgba(102, 126, 234, 0.5)'
          }}>
            Meet The Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                  border: '4px solid',
                  borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated'
                }}
              >
                <div className="mb-4 flex justify-center">
                  <div style={{
                    width: '96px',
                    height: '96px',
                    position: 'relative'
                  }}>
                    <Image
                      src={`/sprites/${member.sprite}.webp`}
                      alt={member.name}
                      width={96}
                      height={96}
                      style={{
                        imageRendering: 'pixelated',
                        filter: 'brightness(1) contrast(1)'
                      }}
                      unoptimized
                    />
                  </div>
                </div>
                <h3 className="font-bold mb-1" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '12px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              textShadow: '2px 2px 0 rgba(102, 126, 234, 0.5)'
            }}>
              Ready to Start?
            </h2>
            <p className="mb-8" style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '12px',
              color: '#FFFFFF'
            }}>
              Join thousands of users building better financial habits
            </p>
            <Link href="/signup">
              <button className="px-8 py-4 text-white transition-all hover:scale-105" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '14px',
                backgroundColor: '#10b981',
                border: '4px solid #065f46',
                boxShadow: '4px 4px 0 #000',
                imageRendering: 'pixelated'
              }}>
                GET STARTED
              </button>
            </Link>
          </div>
        </section>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}