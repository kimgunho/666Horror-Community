import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const TEMP_NUMBER = [1, 2, 3, 4];

function Pagination() {
  const [indexActive, setIndexActive] = useState(null);

  const handleActiveClass = (index) => {
    setIndexActive(index);
  };

  return (
    <ul className={cx('pagination')}>
      <li>
        <FiChevronsLeft />
      </li>
      {TEMP_NUMBER.map((number, index) => (
        <li
          onClick={() => handleActiveClass(index)}
          className={cx({ active: indexActive === index })}
          key={index}
        >
          {number}
        </li>
      ))}
      <li>
        <FiChevronsRight />
      </li>
    </ul>
  );
}

export default Pagination;
