import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { UseUserAuth } from '../../context/authContext';
import { UseModalContext } from '../../context/modalContext';
import { links } from '../../links';
import { auth } from '../../firebase';
import Modal from '../shared/Modal';
import Dimmed from '../shared/Dimmed';

import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [linkResult, setLinkResult] = useState(null);

  const { setUserInfo } = UseUserAuth();
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
      default:
        console.log('error');
    }
  };

  const navigate = useNavigate();
  let redirect;

  const onSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUserInfo(auth.currentUser);
        redirect = links.home;
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            setMessage('비밀번호가 정확하지 않습니다.');
            break;
          case 'auth/user-not-found':
            setMessage('사용자를 찾을수가 없습니다.');
            break;
          case 'auth/invalid-email':
            setMessage('잘못된 형식입니다.');
            break;

          default:
            alert(`${error} 재접속을 해주세요.`);
        }

        redirect = links.login;
        setShow(true);
        setLinkResult(links.login);
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
      <Modal show={show} text={message} link={linkResult} btnText={'확인'} />
      <Dimmed show={show} />
    </>
  );
}

export default Login;
