'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpriteAnimation from '../components/SpriteAnimation';

export default function AboutPage() {
  const teamMembers = [
    { name: 'Alex Chen', role: 'CEO & Founder', emoji: '👨‍💼', mood: 'happy' },
    { name: 'Sarah Williams', role: 'CTO', emoji: '👩‍💻', mood: 'waving' },
    { name: 'Marcus Johnson', role: 'Head of Design', emoji: '👨‍🎨', mood: 'gaming' },
    { name: 'Emily Rodriguez', role: 'Head of Growth', emoji: '👩‍📊', mood: 'savings' },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Mission-Driven',
      description: 'We believe everyone deserves financial wellness, regardless of their starting point.'
    },
    {
      icon: '🎮',
      title: 'Fun First',
      description: 'Finance doesn\'t have to be boring. We make saving money as fun as playing your favorite game.'
    },
    {
      icon: '🔒',
      title: 'Security Always',
      description: 'Your data and money are protected with bank-level encryption and security measures.'
    },
    {
      icon: '🌱',
      title: 'Growth Mindset',
      description: 'We help you grow your savings while growing as a person through better financial habits.'
    }
  ];

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
              About ZUNA
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto" style={{
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              We're on a mission to make financial wellness accessible, fun, and rewarding for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }}>
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600" style={{ fontFamily: 'monospace', lineHeight: '1.8' }}>
                <p>
                  ZUNA was born from a simple observation: traditional banking apps are boring, and saving money feels like a chore.
                </p>
                <p>
                  In 2023, our founder Alex was struggling to save money despite having a good income. He realized that what was missing wasn't knowledge or tools—it was motivation and engagement.
                </p>
                <p>
                  That's when the idea struck: What if saving money could be as engaging as playing a mobile game? What if your financial progress could be visualized through a digital pet that grows with your savings?
                </p>
                <p>
                  Today, ZUNA helps over 50,000 people save smarter through gamification, behavioral psychology, and a whole lot of fun.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-b from-sky-200 to-green-200 p-12 rounded-2xl" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)'
              }}>
                <SpriteAnimation
                  sprite="/sprites/happy.webp"
                  frames={4}
                  frameRate={200}
                  size={256}
                  alt="Happy ZUNA"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 text-center"
                style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
                }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}>
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-b from-blue-100 to-green-100 p-8 mb-4" style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
                }}>
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <div className="w-16 h-16 mx-auto">
                    <SpriteAnimation
                      sprite={`/sprites/${member.mood}.webp`}
                      frames={4}
                      frameRate={300}
                      size={64}
                      alt={member.name}
                    />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'monospace' }}>
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
          }}>
            Our Mission
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8" style={{
            fontFamily: 'monospace',
            lineHeight: '1.6'
          }}>
            To empower millions of people worldwide to achieve financial wellness through gamification, 
            making the journey to financial freedom as enjoyable as the destination.
          </p>
          <Link href="/signup" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-10 inline-block transition-colors" style={{
            fontFamily: 'monospace',
            border: '4px solid #1a1a1a',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
          }}>
            Join Our Mission
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
