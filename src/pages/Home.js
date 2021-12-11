import HOME_TEMP_DATA from '../assets/data/homeTemp';

import Banner from '../components/home/Banner';

function Home() {
  return (
    <>
      <Banner data={HOME_TEMP_DATA} />
    </>
  );
}

export default Home;
