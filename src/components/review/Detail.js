import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Buttons from '../shared/Buttons';
import { links } from '../../links';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function Detail({ id, data }) {
  const [itemObject, setItemObject] = useState(null);

  useEffect(() => {
    const activeItem = data.find((object) => object.id === id);
    setItemObject(activeItem);
  }, []);

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

  return (
    <div className={cx('container')}>
      <div className={cx('limiter')}>
        <Buttons buttons={buttons} />
        <h2 className={cx('title')}>{itemObject?.reviewTitle}</h2>
        <p className={cx('movieInfo')}>
          <span className={cx('movieTitle')}>{itemObject?.movieTitle}</span>
          <span className={cx('writer')}>writer</span>
        </p>
        <div className={cx('info')}>
          <div className={cx('text')}>{itemObject?.text}</div>
          <div className={cx('image')}>
            <img src={itemObject?.image} alt={itemObject?.movieTitle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
