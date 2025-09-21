import React from 'react';
import Slider from '../components/Slider';
import Promotions from '../components/Promotions';
import AboutClub from '../components/AboutClub';
import Location from '../components/Location';
const Home = () => {
  return (
    <div>
      <Slider />
      <Promotions />
      <AboutClub />
      <Location />
    </div>
  );
};

export default Home;