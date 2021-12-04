import React, { useState, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const user = createContext();

export const UserAuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(undefined);
  onAuthStateChanged(auth, (user) => {
    setIsLogin(user);
  });

  return (
    <user.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {isLogin === undefined ? null : children}
    </user.Provider>
  );
};

export const UseUserAuth = () => {
  return useContext(user);
};
