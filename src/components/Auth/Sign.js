import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from '../shared/Modal';
import Dimmed from '../shared/Dimmed';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Form() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [profileSrc, setProfileSrc] = useState('');
  const [show, setShow] = useState(false);

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
      case 'name':
        setName(value);
        break;
      case 'profileImage':
        setProfileSrc(value);
        break;

      default:
        console.log('err');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, pw)
      .then(() => {
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
                name="name"
                type="text"
                className={cx('name')}
                placeholder="nickName"
                value={name}
                onChange={onChange}
              />
            </li>
            <li>
              <input
                name="profileImage"
                type="file"
                className={cx('profile')}
                value={profileSrc}
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
        text={'가입해주셔서 감사합니다. 가입이 완료되었습니다.'}
        link={links.login}
        btnText={'로그인 페이지로 이동'}
      />
      <Dimmed show={show} />
    </>
  );
}

export default Form;
