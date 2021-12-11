import React, { useState, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const user = createContext();

export const UserAuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  onAuthStateChanged(auth, (user) => {
    setUserInfo(user);
  });

  return (
    <user.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {userInfo === undefined ? null : children}
    </user.Provider>
  );
};

export const UseUserAuth = () => {
  return useContext(user);
};
