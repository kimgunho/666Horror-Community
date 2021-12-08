import List from '../../components/review/List';
import HOME_TEMP_DATA from '../../assets/data/homeTemp';

function Review() {
  return (
    <>
      <List data={HOME_TEMP_DATA} />
    </>
  );
}

export default Review;
