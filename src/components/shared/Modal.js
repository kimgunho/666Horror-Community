import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ show, text, link, btnText }) {
  const navigate = useNavigate();

  const onPageLocation = () => {
    navigate(link);
  };

  return (
    <>
      <div className={cx(['modal', { show }])}>
        <p className={cx('text')}>{text}</p>
        <button className={cx('submit')} onClick={onPageLocation}>
          {btnText}
        </button>
      </div>
    </>
  );
}

export default Modal;
