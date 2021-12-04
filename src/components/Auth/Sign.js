import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from './Modal';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Form() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [onDisplay, setOndisplay] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    // RE-폼에 대한 고민
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'pw':
        setPw(value);
        break;
      default:
        console.log('err');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, pw)
      .then(() => {
        setOndisplay(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={cx('container')}>
        <form onSubmit={onSubmit}>
          <h3 className={cx('title')}>Sign in</h3>
          <ul className={cx('formList')}>
            <li>
              <input
                name="email"
                type="email"
                className={cx('id')}
                placeholder="email"
                required
                value={email}
                onChange={onChange}
              />
            </li>
            <li>
              <input
                autoComplete="on"
                name="pw"
                type="password"
                className={cx('pw')}
                placeholder="password"
                required
                value={pw}
                onChange={onChange}
              />
            </li>
            <li>
              <ul>
                <li>
                  <input
                    type="submit"
                    value="sign in"
                    className={cx('submit')}
                  />
                </li>
                <li>
                  <Link to={links.login} className={cx('sign')}>
                    login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </form>
      </div>

      <Modal
        on={onDisplay}
        text={'가입해주셔서 감사합니다. 가입이 완료되었습니다.'}
        link={links.login}
      />
    </>
  );
}

export default Form;
