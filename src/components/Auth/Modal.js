import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ on, text, link }) {
  const navigate = useNavigate();

  const onPageLocation = () => {
    navigate(link);
  };

  return (
    <>
      <div className={cx(['modal', { on }])}>
        <p className={cx('text')}>{text}</p>
        <button className={cx('submit')} onClick={onPageLocation}>
          확인
        </button>
      </div>
      <div className={cx(['blackPanal', { on }])} />
      {/* dimmed */}
    </>
  );
}

export default Modal;
