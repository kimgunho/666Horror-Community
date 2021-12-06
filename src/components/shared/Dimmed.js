import React from 'react';
import classNames from 'classnames/bind';

import styles from './Dimmed.module.scss';

const cx = classNames.bind(styles);

function Dimmed({ show }) {
  return (
    <>
      <div className={cx(['dimmed', { show }])} />
    </>
  );
}

export default Dimmed;
