import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { UseUserAuth } from '../../context/authContext';
import { UseCurrentModal } from '../../context/modalContext';
import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from '../shared/Modal';
import Dimmed from '../shared/Dimmed';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [modalMessage, setModalMessage] = useState(null);
  const [linkResult, setLinkResult] = useState(null);

  const { setLoginObject } = UseUserAuth();
  const { show, setShow } = UseCurrentModal();

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

  const navigate = useNavigate();
  let redirect;

  const onSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, pw)
      .then(() => {
        setLoginObject(auth.currentUser);
        redirect = links.home;
      })
      .catch((err) => {
        redirect = links.login;
        setShow(true);
        setLinkResult(links.login);

        switch (err.code) {
          case 'auth/wrong-password':
            setModalMessage('비밀번호가 정확하지 않습니다.');
            break;
          case 'auth/user-not-found':
            setModalMessage('사용자를 찾을수가 없습니다.');
            break;
          case 'auth/invalid-email':
            setModalMessage('잘못된 형식입니다.');
            break;

          default:
            alert(`${err} 재접속을 해주세요.`);
        }
      })
      .finally(() => {
        navigate(redirect);
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
        text={modalMessage}
        link={linkResult}
        btnText={'확인'}
      />
      <Dimmed show={show} />
    </>
  );
}

export default Login;
