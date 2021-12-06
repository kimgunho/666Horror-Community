import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';
import { UseCurrentModal } from '../../context/modalContext';

const cx = classNames.bind(styles);

function Modal({ show, text, link, btnText }) {
  const { setShow } = UseCurrentModal();
  const navigate = useNavigate();

  const onPageLocation = () => {
    setShow(false);
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
