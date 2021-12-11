import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { UseModalContext } from '../../context/modalContext';
import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from '../shared/Modal';
import Dimmed from '../shared/Dimmed';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState(null);
  const [linkResult, setLinkResult] = useState(null);

  const { show, setShow } = UseModalContext();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordCheck':
        setPasswordCheck(value);
        break;
      case 'name':
        setDisplayName(value);
        break;

      default:
        console.log('error');
    }
  };

  const navigate = useNavigate();
  let redirect;

  const onSubmit = (event) => {
    event.preventDefault();

    if (password === passwordCheck) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: displayName,
          })
            .then(() => {})
            .catch((error) => {
              console.dir(error);
            });

          redirect = links.home;
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setMessage('이미 사용중인 이메일입니다.');
          } else if (error.code === 'auth/invalid-email') {
            setMessage('적합하지 않는 이메일입니다');
          }
          redirect = links.signin;
          setLinkResult(links.signin);
          setShow(true);
        })
        .finally(() => {
          navigate(redirect);
        });
    } else {
      setLinkResult(links.signin);
      setMessage('비밀번호 중복체크를 다시 부탁드리겠습니다.');
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
                name="password"
                type="password"
                className={cx('password')}
                placeholder="password"
                required
                value={password}
                onChange={onChange}
              />
            </li>
            <li>
              <input
                autoComplete="on"
                name="passwordCheck"
                type="password"
                className={cx('password')}
                placeholder="please password check"
                required
                value={passwordCheck}
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

      <Modal show={show} text={message} link={linkResult} btnText={'확인'} />
      <Dimmed show={show} />
    </>
  );
}

export default Signin;
