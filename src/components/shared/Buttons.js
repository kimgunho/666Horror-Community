import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Buttons.module.scss';

const cx = classNames.bind(styles);

function Button({ buttons }) {
  return (
    <ul className={cx('btns')}>
      {buttons.map(({ title, link = false }, index) => {
        return (
          <li key={index}>
            <Link className={cx('button')} to={link}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Button;
