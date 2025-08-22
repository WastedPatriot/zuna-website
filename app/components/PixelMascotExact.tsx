export const PixelMascotExact = () => {
  // This is a 1:1 recreation of your mascot image
  // Green creature with triangular ears, full body, arms and legs
  const mascotPixels = [
    // Row 0-1: Top spike/antenna
    '        ##        ',
    '       ####       ',
    '      ######      ',
    '     ########     ',
    // Row 4-7: Triangular ears and head top
    '   ##  ####  ##   ',
    '  ###  ####  ###  ',
    ' ####  ####  #### ',
    '##################',
    // Row 8-11: Head with eyes
    '##################',
    '##@@####@@####@@##',
    '##@@####@@####@@##',
    '##################',
    // Row 12-13: Cheeks
    '###PP######PP#####',
    '##################',
    // Row 14-15: Neck
    '    ##########    ',
    '    ##########    ',
    // Row 16-19: Body
    '  ##############  ',
    ' ################ ',
    '##################',
    '##################',
    // Row 20-23: Arms spreading out
    '####  ######  ####',
    '###    ####    ###',
    '##      ##      ##',
    '##      ##      ##',
    // Row 24-27: Lower body/legs
    '    ########      ',
    '    ##    ##      ',
    '    ##    ##      ',
    '   ####  ####     ',
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(18, 4px)`,
      gap: 0,
      imageRendering: 'pixelated'
    }}>
      {mascotPixels.map((row, y) => 
        row.split('').map((pixel, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: '4px',
              height: '4px',
              backgroundColor: 
                pixel === '#' ? '#4ADE80' : // Green body
                pixel === '@' ? '#000000' : // Black eyes
                pixel === 'P' ? '#FF69B4' : // Pink cheeks
                pixel === 'W' ? '#FFFFFF' : // White eye shine
                'transparent'
            }}
          />
        ))
      )}
    </div>
  );
};
