import { useParams } from 'react-router-dom';

import Detail from '../../components/review/Detail';

import TEMP_DATA from '../../assets/data/homeTemp';

function ReviewDetail() {
  let item = useParams();
  return <Detail id={item.id} data={TEMP_DATA} />;
}

export default ReviewDetail;
