import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { links } from '../../links';

import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form() {
  return (
    <div className={cx('container')}>
      <form>
        <h3 className={cx('title')}>Login</h3>
        <ul className={cx('formList')}>
          <li>
            <input
              type="text"
              className={cx('id')}
              placeholder="email"
              required
            />
          </li>
          <li>
            <input
              type="password"
              className={cx('pw')}
              placeholder="password"
              required
            />
          </li>
          <li>
            <ul>
              <li>
                <input type="submit" value="login" className={cx('submit')} />
              </li>
              <li>
                <Link to={links.signin} className={cx('sign')}>
                  sign in
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Form;
