import React from 'react';

import HOME_TEMP_DATA from '../assets/data/homeTemp';

import Main from '../components/home/Main';

function Home() {
  return (
    <>
      <Main data={HOME_TEMP_DATA} />
    </>
  );
}

export default Home;
