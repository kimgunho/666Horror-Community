import { useState } from 'react';
import classNames from 'classnames/bind';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { ModalProvider } from './context/modalContext';
import { auth } from './firebase';
import { links } from './links';

import styles from './App.module.scss';

import Header from './components/shared/Header';
import Tnb from './components/shared/Tnb';
import Home from './pages/Home';
import Review from './pages/review/Review';
import ReviewDetail from './pages/review/Detail';
import ReviewWrite from './pages/review/Write';
import Login from './components/auth22/Login22';
import Sign from './components/auth22/Sign';

const cx = classNames.bind(styles);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  onAuthStateChanged(auth, (user) => {
    user !== null ? setIsLogin(true) : setIsLogin(false);
  });

  return (
    <ModalProvider>
      <BrowserRouter>
        <div className={cx('wrapper')}>
          <Header />
          <div className={cx('content')}>
            <Tnb />
            <Routes>
              <Route exact path={links.home} element={<Home />} />
              <Route path={links.review} element={<Review />} />
              <Route path={links.reviewDetail} element={<ReviewDetail />} />
              <Route path={links.reviewWrite} element={<ReviewWrite />} />

              {isLogin ? (
                ''
              ) : (
                <>
                  <Route path={links.login} element={<Login />} />
                  <Route path={links.signin} element={<Sign />} />
                </>
              )}

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
    </ModalProvider>
  );
}

export default App;
