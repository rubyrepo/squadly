import React from 'react';
import Slider from '../components/Slider';
import Promotions from '../components/Promotions';
import AboutClub from '../components/AboutClub';
const Home = () => {
  return (
    <div>
      <Slider />
      <Promotions />
      <AboutClub />
    </div>
  );
};

export default Home;