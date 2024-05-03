"use client"
import React from 'react';

const Searchbar = () => {
  const backgroundImageUrl = 'https://marketplace.canva.com/EAE-59GyulA/2/0/1600w/canva-black-blue-grey-bold-gamer-gaming-desktop-background-wallpaper-PhGSpPy4z9c.jpg';

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Set the height to fill the entire viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // You can add more styles as needed
  };

  return (
    <div style={containerStyle}>
      {/* Add your search bar content here */}
    </div>
  );
};

export default Searchbar;
