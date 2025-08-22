'use client';

import { motion } from 'framer-motion';

interface PixelMascotProps {
  mood?: 'happy' | 'excited' | 'sleepy';
}

export default function PixelMascot({ mood = 'happy' }: PixelMascotProps) {
  const mascotPixels = [
    // Row 0-3: Top spike/antenna
    '          ##          ',
    '         ####         ',
    '        ######        ',
    '       ########       ',
    // Row 4-7: Ears and head top
    '     ##  ####  ##     ',
    '    ###  ####  ###    ',
    '   ####  ####  ####   ',
    '  ##################  ',
    // Row 8-11: Head with face
    ' #################### ',
    ' ##@@####@@####@@#### ',
    ' ##@@####@@####@@#### ',
    ' #################### ',
    // Row 12-13: Cheeks
    ' ###PP########PP##### ',
    ' #################### ',
    // Row 14-15: Neck
    '      ##########      ',
    '      ##########      ',
    // Row 16-19: Body
    '    ##############    ',
    '   ################   ',
    '  ##################  ',
    ' #################### ',
    // Row 20-23: Arms and legs
    '####    ####    ####  ',
    '###      ##      ###  ',
    '##       ##       ##  ',
    '##       ##       ##  ',
  ];

  const bounceAnimation = mood === 'excited' ? {
    y: [0, -10, 0]
  } : undefined;

  return (
    <motion.div 
      className="relative inline-block"
      animate={bounceAnimation}
      transition={mood === 'excited' ? {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="grid grid-cols-[repeat(22,8px)] gap-0">
        {mascotPixels.map((row, y) => 
          row.split('').map((pixel, x) => {
            let bgColor = 'transparent';
            if (pixel === '#') bgColor = '#4ADE80';
            else if (pixel === '@') bgColor = '#000000';
            else if (pixel === 'P') bgColor = '#FF69B4';
            
            return (
              <div
                key={`${x}-${y}`}
                className="w-2 h-2"
                style={{
                  backgroundColor: bgColor,
                  imageRendering: 'pixelated'
                }}
              />
            );
          })
        )}
      </div>
      
      {/* Eye shine */}
      <div className="absolute w-1 h-1 bg-white rounded-full" 
           style={{ left: '82px', top: '74px' }} />
      <div className="absolute w-1 h-1 bg-white rounded-full" 
           style={{ left: '106px', top: '74px' }} />
      
      {/* Mood indicators */}
      {mood === 'sleepy' && (
        <>
          <motion.div
            className="absolute -top-4 -right-2 text-2xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💤
          </motion.div>
        </>
      )}
      
      {mood === 'excited' && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white px-3 py-1 rounded-full border-2 border-green-600 text-sm font-pixel">
            YAY!
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}