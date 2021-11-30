import React from 'react';
import classNames from 'classnames/bind';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { links } from './links';
import styles from './App.module.scss';

import Header from './components/shared/Header';
import Tnb from './components/shared/Tnb';
import Home from './pages/Home';

const cx = classNames.bind(styles);

function App() {
  return (
    <BrowserRouter>
      <div className={cx('wrapper')}>
        <Header />
        <div className={cx('content')}>
          <Tnb />
          <Routes>
            <Route path={links.home} element={<Home />} />
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
  );
}

export default App;
