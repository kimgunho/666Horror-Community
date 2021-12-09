import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ title, link }) {
  // title : 버튼제목
  // link : 버튼 링크 : (default : false)
  // prev : pagination에 사용시 이전페이지 허용 비허용 : boolean (default : false)
  // next : pagination에 사용시 다음페이지 허용 비허용 : boolean (default : false)

  return (
    <Link className={cx('button')} to={link}>
      {title}
    </Link>
  );
}

export default Button;
