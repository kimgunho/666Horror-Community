import { useState, useEffect } from 'react';
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
        <h2 className={cx('title')}>
          <span className={cx('user')}>{nickName}</span>님만의 생각을
          작성해주세요
        </h2>

        <form>
          <ul className={cx('signup')}>
            <li>
              <label>제목을 작성해주세요.</label>
              <input
                type="text"
                required
                name="title"
                placeholder="제목 작성"
                maxLength={100}
              />
            </li>
            <li>
              <label>영화 제목을 작성해주세요.</label>
              <input
                type="text"
                required
                name="movie"
                placeholder="영화 제목"
              />
            </li>
            <li>
              <label>내용을 작성해주세요.</label>
              <textarea></textarea>
            </li>
            <li>
              <label className={cx('fileLabel')} htmlFor="file">
                이미지 첨부
              </label>
              <input
                id="file"
                className={cx('file')}
                type="file"
                name="file"
                accept="image/*"
              />
            </li>
          </ul>

          <input className={cx('submit')} type="submit" value="리뷰 등록" />
        </form>
      </div>
    </div>
  );
}

export default Write;
