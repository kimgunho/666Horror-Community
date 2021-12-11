import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Buttons from '../shared/Buttons';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function Detail({ buttons, id, data }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const activeDetail = data.find((item) => item.id === id);
    setDetail(activeDetail);
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('limiter')}>
        <Buttons buttons={buttons} />
        <h2 className={cx('title')}>{detail?.reviewTitle}</h2>
        <p className={cx('movieInfo')}>
          <span className={cx('movieTitle')}>{detail?.movieTitle}</span>
          <span className={cx('writer')}>writer</span>
        </p>
        <div className={cx('info')}>
          <div className={cx('text')}>{detail?.text}</div>
          <div className={cx('image')}>
            <img src={detail?.image} alt={detail?.movieTitle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
