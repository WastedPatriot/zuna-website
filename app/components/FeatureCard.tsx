'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  index: number;
}

export default function FeatureCard({ icon, title, description, color, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
      
      {/* Icon */}
      <div className="relative mb-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
      
      {/* Content */}
      <h3 className="font-pixel text-lg text-green-800 mb-3 group-hover:text-green-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 font-sans text-sm leading-relaxed">
        {description}
      </p>
      
      {/* Hover indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}
