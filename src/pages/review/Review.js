import List from '../../components/review/List';

import { links } from '../../links';
import HOME_TEMP_DATA from '../../assets/data/homeTemp';

function Review() {
  const buttons = [
    {
      title: '리뷰 작성',
      link: links.reviewWrite,
      login: true,
    },
  ];

  return (
    <>
      <List buttons={buttons} data={HOME_TEMP_DATA} />
    </>
  );
}

export default Review;
