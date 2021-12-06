import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { UseUserAuth } from '../../context/authContext';
import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from '../shared/Modal';
import Dimmed from '../shared/Dimmed';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const { setLoginObject } = UseUserAuth();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

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

  const onSubmit = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, email, pw)
      .then(() => {
        setLoginObject(auth.currentUser);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={cx('container')}>
        <form onSubmit={onSubmit}>
          <h3 className={cx('title')}>Login</h3>
          <ul className={cx('formList')}>
            <li>
              <input
                name="email"
                type="text"
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
      <Modal
        show={show}
        text={'로그인이 완료되었습니다.'}
        link={links.home}
        btnText={'메인으로 이동'}
      />
      <Dimmed show={show} />
    </>
  );
}

export default Login;
