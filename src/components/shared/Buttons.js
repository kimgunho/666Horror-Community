import React from 'react';
import classNames from 'classnames/bind';

import Button from './Button';
import styles from './Buttons.module.scss';

const cx = classNames.bind(styles);

function Buttons({ buttons }) {
  // title : 버튼제목
  // link : 버튼 링크 : (default : false)
  // prev : pagination에 사용시 이전페이지 허용 비허용 : boolean (default : false)
  // next : pagination에 사용시 다음페이지 허용 비허용 : boolean (default : false)

  return (
    <ul className={cx('btns')}>
      {buttons.map(({ title, link = false }, index) => {
        return (
          <li key={index}>
            <Button link={link} title={title} />
          </li>
        );
      })}
    </ul>
  );
}

export default Buttons;
