import React, { useState, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const user = createContext();

export const UserAuthProvider = ({ children }) => {
  const [loginObject, setLoginObject] = useState(undefined);
  onAuthStateChanged(auth, (user) => {
    setLoginObject(user);
  });

  return (
    <user.Provider
      value={{
        loginObject,
        setLoginObject,
      }}
    >
      {loginObject === undefined ? null : children}
    </user.Provider>
  );
};

export const UseUserAuth = () => {
  return useContext(user);
};
