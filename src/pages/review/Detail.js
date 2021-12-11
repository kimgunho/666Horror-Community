import { useParams } from 'react-router-dom';

import { links } from '../../links';
import Detail from '../../components/review/Detail';

import TEMP_DATA from '../../assets/data/homeTemp';

function ReviewDetail() {
  const buttons = [
    {
      title: '이전글',
      prev: true,
    },
    {
      title: '다음글',
      next: true,
    },
    {
      title: '목록',
      link: links.review,
    },
  ];

  let item = useParams();
  return <Detail buttons={buttons} id={item.id} data={TEMP_DATA} />;
}

export default ReviewDetail;
