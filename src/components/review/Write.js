import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase';
import styles from './Write.module.scss';

const cx = classNames.bind(styles);

function Write() {
  const [nickName, setNickName] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setNickName(user.displayName);
    });
  });

  return (
    <div className={cx('container')}>
      <div className={cx('limiter')}>
        <h2>{nickName}님만의 생각을 작성해주세요</h2>
      </div>
    </div>
  );
}

export default Write;
