import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Autoplay, Pagination, EffectFade } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './Main.module.scss';

const cx = classNames.bind(styles);

function Main({ data }) {
  return (
    <div className={cx('container')}>
      <Swiper
        className={cx('slideBox')}
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          el: cx('.Main_pagination__2IYXD'),
          renderBullet: (index, className) => {
            return `<span class='${className}'>${index + 1}</span>`;
          },
          bulletClass: cx('bullet'),
          bulletActiveClass: cx('active'),
        }}
        loop={true}
        effect="fade"
        speed={1000}
      >
        <div className={cx('pagination')} />
        {data.map(({ id, image, movieTitle, reviewTitle, text }) => {
          data.splice(4, 4);

          return (
            <SwiperSlide
              className={cx('slide')}
              key={id}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className={cx('info')}>
                <p className={cx('movieTitle')}>{movieTitle}</p>
                <h3 className={cx('reviewTitle')}>{reviewTitle}</h3>
                <p className={cx('text')}>{text.substring(1, 80)}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Main;
