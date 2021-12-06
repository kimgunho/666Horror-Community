import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FiAlignLeft, FiX, FiLogIn, FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';

import { UseUserAuth } from '../../context/authContext';
import { links } from '../../links';
import { auth } from '../../firebase';
import gnb from '../../assets/data/gnb';
import styles from './Header.module.scss';

import logo from '../../assets/images/component/logo.png';

const cx = classNames.bind(styles);

function Header() {
  const [toggle, setToggle] = useState(false);
  const { loginObject, setLoginObject } = UseUserAuth();

  const handleLogOut = () => {
    // event.preventDefault();
    signOut(auth)
      .then(() => {
        setLoginObject(auth.currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className={cx('mobileBtn')} onClick={() => setToggle(!toggle)}>
        {toggle ? <FiX size={32} /> : <FiAlignLeft size={32} />}
      </div>
      <ul className={cx(['gnb', { on: toggle }])}>
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
        {!loginObject ? (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? cx('active') : '')}
              to={links.login}
            >
              <span className={cx('icon')}>
                <FiLogIn />
              </span>
              <span className={cx('title')}>Login</span>
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to={links.home} onClick={handleLogOut}>
              <span className={cx('icon')}>
                <FiLogOut />
              </span>
              <span className={cx('title')}>Log Out</span>
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
