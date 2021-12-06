import React from 'react';
import classNames from 'classnames/bind';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { links } from './links';
import { UserAuthProvider } from './context/authContext';

import styles from './App.module.scss';

import Header from './components/shared/Header';
import Tnb from './components/shared/Tnb';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Sign from './components/auth/Sign';

const cx = classNames.bind(styles);

function App() {
  return (
    <UserAuthProvider>
      <BrowserRouter>
        <div className={cx('wrapper')}>
          <Header />
          <div className={cx('content')}>
            <Tnb />
            <Routes>
              <Route path={links.home} element={<Home />} />
              <Route path={links.login} element={<Login />} />
              <Route path={links.signin} element={<Sign />} />

              <Route
                path={links.notFound}
                element={
                  <div className={cx('notFound')}>
                    존재하지 않는 페이지입니다.
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </UserAuthProvider>
  );
}

export default App;
