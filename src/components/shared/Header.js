import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FiAlignLeft, FiX, FiLogIn, FiLogOut } from 'react-icons/fi';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import { links } from '../../links';
import { auth } from '../../firebase';
import gnb from '../../assets/data/gnb';
import styles from './Header.module.scss';

import logo from '../../assets/images/component/logo.png';

const cx = classNames.bind(styles);

function Header() {
  const [mobileIcon, setMobileIcon] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loginText, setLoginText] = useState('');
  const [loginIcon, setLoginIcon] = useState('');

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setLoginText('log out');
        setLoginIcon(<FiLogOut />);
      } else {
        setUserInfo(null);
        setLoginText('login');
        setLoginIcon(<FiLogIn />);
      }
    });
  }, []);

  return (
    <header className={cx('header')}>
      <h1 className={cx('logo')}>
        <Link to={links.home}>
          <img src={logo} alt="666 Horror Community" />
          <span className={cx('title')}>
            Horror&nbsp;
            <br />
            Community
          </span>
        </Link>
      </h1>
      <div
        className={cx('mobileBtn')}
        onClick={() => setMobileIcon(!mobileIcon)}
      >
        {mobileIcon ? <FiX size={32} /> : <FiAlignLeft size={32} />}
      </div>
      <ul className={cx(['gnb', { on: mobileIcon }])}>
        {gnb.map((menu, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) => (isActive ? cx('active') : '')}
              to={menu.link}
            >
              <span className={cx('icon')}>{menu.icon}</span>
              <span className={cx('title')}>{menu.title}</span>
            </NavLink>
          </li>
        ))}
        <li>
          {!userInfo ? (
            <NavLink
              className={({ isActive }) => (isActive ? cx('active') : '')}
              to={links.login}
            >
              <span className={cx('icon')}>{loginIcon}</span>
              <span className={cx('title')}>{loginText}</span>
            </NavLink>
          ) : (
            <Link to={links.home} onClick={handleLogOut}>
              <span className={cx('icon')}>{loginIcon}</span>
              <span className={cx('title')}>{loginText}</span>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
