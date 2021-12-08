import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { links } from '../../links';

import Pagination from '../shared/Pagination';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

function List({ data }) {
  return (
    <div className={cx('container')}>
      <ul className={cx('list')}>
        {data.map((item) => (
          <li key={item.id}>
            <Link to={`${links.review}/${item.id}`}>
              <div className={cx('info')}>
                <p className={cx('movieTitle')}>{item.movieTitle}</p>
                <h3 className={cx('reviewTitle')}>{item.reviewTitle}</h3>
                <p className={cx('text')}>{item.text}...</p>
                <p className={cx('writer')}>작성자 : writer</p>
              </div>
            </Link>
            <div
              className={cx('image')}
              style={{ backgroundImage: `url(${item.image})` }}
            />
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
}

export default List;
