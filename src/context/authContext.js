import React, { useState, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const user = createContext();

export const UserAuthProvider = ({ children }) => {
  const [loginObject, setLoginObject] = useState(undefined);
  const [nickName, setNickName] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setLoginObject(user);
  });

  return (
    <user.Provider
      value={{
        loginObject,
        setLoginObject,
        nickName,
        setNickName,
      }}
    >
      {loginObject === undefined ? null : children}
    </user.Provider>
  );
};

export const UseUserAuth = () => {
  return useContext(user);
};
