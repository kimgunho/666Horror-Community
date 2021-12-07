import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { UseCurrentModal } from '../../context/modalContext';
import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from '../shared/Modal';
import Dimmed from '../shared/Dimmed';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Form() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [modalMessage, setModalMessage] = useState(null);
  const [linkResult, setLinkResult] = useState(null);

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
      case 'pwCheck':
        setPwCheck(value);
        break;
      case 'name':
        setDisplayName(value);
        break;

      default:
        console.log('err');
    }
  };

  const navigate = useNavigate();
  let redirect;

  const onSubmit = (event) => {
    event.preventDefault();

    if (pw === pwCheck) {
      createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: displayName,
          })
            .then(() => {})
            .catch((err) => {
              console.dir(err);
            });

          redirect = links.home;
        })
        .catch((err) => {
          console.dir(err.code);
          setShow(true);
          redirect = links.signin;
          setLinkResult(links.signin);
          if (err.code === 'auth/email-already-in-use') {
            setModalMessage('이미 사용중인 이메일입니다.');
          } else if (err.code === 'auth/invalid-email') {
            setModalMessage('적합하지 않는 이메일입니다');
          }
        })
        .finally(() => {
          navigate(redirect);
        });
    } else {
      setLinkResult(links.signin);
      setModalMessage('비밀번호 중복체크를 다시 부탁드리겠습니다.');
      setShow(true);
    }
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
              <input
                autoComplete="on"
                name="pwCheck"
                type="password"
                className={cx('pw')}
                placeholder="please password check"
                required
                value={pwCheck}
                onChange={onChange}
              />
            </li>
            <li>
              <input
                name="name"
                type="text"
                className={cx('name')}
                placeholder="nickName"
                required
                value={displayName}
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
        show={show}
        text={modalMessage}
        link={linkResult}
        btnText={'확인'}
      />
      <Dimmed show={show} />
    </>
  );
}

export default Form;
