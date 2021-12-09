import Write from '../../components/review/Write';
import { links } from '../../links';

function Review() {
  const buttons = [
    {
      title: '리뷰 작성',
      link: links.reviewWrite,
    },
  ];

  return (
    <>
      <Write buttons={buttons} />
    </>
  );
}

export default Review;
