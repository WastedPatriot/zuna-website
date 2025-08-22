export const PixelMascot = () => {
  return (
    <div className="pixel-mascot-svg">
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
        {/* Top spike */}
        <rect x="15" y="0" width="1" height="1" fill="#7A7A7A" />
        <rect x="16" y="0" width="1" height="1" fill="#7A7A7A" />
        
        {/* Head outline and ears */}
        <rect x="14" y="1" width="1" height="1" fill="#7A7A7A" />
        <rect x="15" y="1" width="1" height="1" fill="#2E7D32" />
        <rect x="16" y="1" width="1" height="1" fill="#2E7D32" />
        <rect x="17" y="1" width="1" height="1" fill="#7A7A7A" />
        
        {/* Triangular ears */}
        <rect x="10" y="6" width="1" height="1" fill="#7A7A7A" />
        <rect x="11" y="6" width="1" height="1" fill="#7A7A7A" />
        <rect x="20" y="6" width="1" height="1" fill="#7A7A7A" />
        <rect x="21" y="6" width="1" height="1" fill="#7A7A7A" />
        
        <rect x="11" y="7" width="1" height="1" fill="#7A7A7A" />
        <rect x="12" y="7" width="1" height="1" fill="#2E7D32" />
        <rect x="19" y="7" width="1" height="1" fill="#2E7D32" />
        <rect x="20" y="7" width="1" height="1" fill="#7A7A7A" />
        
        {/* Head */}
        <rect x="12" y="8" width="8" height="8" fill="#4ADE80" />
        
        {/* Eyes */}
        <rect x="14" y="10" width="1" height="1" fill="#000000" />
        <rect x="17" y="10" width="1" height="1" fill="#000000" />
        
        {/* Eye shine */}
        <rect x="14" y="10" width="0.3" height="0.3" fill="#FFFFFF" />
        <rect x="17" y="10" width="0.3" height="0.3" fill="#FFFFFF" />
        
        {/* Cheeks */}
        <rect x="13" y="12" width="1" height="1" fill="#FF69B4" />
        <rect x="18" y="12" width="1" height="1" fill="#FF69B4" />
        
        {/* Body */}
        <rect x="13" y="16" width="6" height="8" fill="#4ADE80" />
        
        {/* Arms */}
        <rect x="11" y="17" width="2" height="4" fill="#4ADE80" />
        <rect x="19" y="17" width="2" height="4" fill="#4ADE80" />
        
        {/* Legs */}
        <rect x="14" y="24" width="2" height="3" fill="#4ADE80" />
        <rect x="16" y="24" width="2" height="3" fill="#4ADE80" />
        
        {/* Feet */}
        <rect x="13" y="27" width="3" height="1" fill="#2E7D32" />
        <rect x="16" y="27" width="3" height="1" fill="#2E7D32" />
      </svg>
    </div>
  );
};
