import React from 'react';

const Skeleton = ({ width = '100%', height = '1rem', className, borderRadius = '0.5rem', count = 1 }) => {
  const style = {
    width,
    height,
    borderRadius,
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} style={style}></div>
      ))}
    </>
  );
};

export default Skeleton;
