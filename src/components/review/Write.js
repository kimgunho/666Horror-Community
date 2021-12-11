import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase';
import { links } from '../../links';
import styles from './Write.module.scss';

const cx = classNames.bind(styles);

function Write() {
  const [nickName, setNickName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setNickName(user.displayName);
    });
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = auth.currentUser.uid.substring(0, 8) + new Date().getTime();
      await setDoc(doc(db, 'review', id), {
        title: title.current.value,
        movieTitle: movieTitle.current.value,
        text: text.current.value,
        date: Date.now(),
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        id: id,
      });
      navigate(links.review);
    } catch (error) {
      console.log(error.code);
    }
  };

  const title = useRef();
  const movieTitle = useRef();
  const text = useRef();
  return (
    <div className={cx('container')}>
      <div className={cx('limiter')}>
        <h2 className={cx('title')}>
          <span className={cx('user')}>{nickName}</span>님만의 생각을
          작성해주세요
        </h2>

        <form onSubmit={onSubmit}>
          <ul className={cx('signup')}>
            <li>
              <label>제목을 작성해주세요.</label>
              <input
                ref={title}
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
                ref={movieTitle}
                type="text"
                required
                name="movie"
                placeholder="영화 제목"
              />
            </li>
            <li>
              <label>내용을 작성해주세요.</label>
              <textarea ref={text}></textarea>
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
