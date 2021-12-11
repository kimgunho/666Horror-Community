import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import List from '../../components/review/List';
import { db } from '../../firebase';
import { links } from '../../links';

function Review() {
  const [items, setItems] = useState([]);
  const buttons = [
    {
      title: '리뷰 작성',
      link: links.reviewWrite,
      login: true,
    },
  ];

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    const querySnapshot = await getDocs(collection(db, 'review'));
    querySnapshot.forEach((item) => {
      return setItems((prev) => [...prev, item.data()]);
    });
  };

  return (
    <>
      <List buttons={buttons} data={items} />
    </>
  );
}

export default Review;
