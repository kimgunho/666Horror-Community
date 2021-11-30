import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { FiSearch } from 'react-icons/fi';

import styles from './Tnb.module.scss';

const cx = classNames.bind(styles);

function Tnb() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollActive, setScrollActive] = useState(true);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (scrollY > window.scrollY) {
        setScrollActive(true);
      } else if (scrollY < window.scrollY) {
        setScrollActive(false);
      }
      setScrollY(window.scrollY);
    },
    [scrollY],
  );

  useEffect(() => {
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <div className={cx(['container', { on: scrollActive }])}>
      <p className={cx('count')}>
        <span className={cx('point')}>+ 999</span>
        <br />
        개의 리뷰가 올라왔어요!
      </p>
      <div className={cx('inner')}>
        <div className={cx('search')}>
          <input type="text" placeholder="검색해주세요." />
          <button className={cx('submit')}>
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tnb;
