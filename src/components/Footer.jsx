import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='w-full p-4 text-[#5f5f5f] flex items-center justify-center'>
      <h1 className='flex'>© {currentYear} SolStru</h1>
    </div>
  );
};