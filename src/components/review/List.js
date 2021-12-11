import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { links } from '../../links';

import { auth } from '../../firebase';
import Button from '../shared/Button';
import Pagination from '../shared/Pagination';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

function List({ data }) {
  return (
    <div className={cx('container')}>
      {auth.currentUser !== null ? (
        <Button title={'리뷰 작성'} link={links.reviewWrite} />
      ) : (
        <p className={cx('alert')}>리뷰는 로그인을 하여야 작성이 가능합니다.</p>
      )}
      <ul className={cx('list')}>
        {data.map((item) => (
          <li key={item.id}>
            <Link to={`${links.review}/${item.id}`}>
              <div className={cx('info')}>
                <p className={cx('movieTitle')}>{item.movieTitle}</p>
                <h3 className={cx('reviewTitle')}>{item.title}</h3>
                <p className={cx('text')}>{item.text}...</p>
                <p className={cx('writer')}>by {item.name}</p>
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
