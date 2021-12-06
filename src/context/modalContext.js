import React, { useState, createContext, useContext } from 'react';

const modal = createContext();

export const CurrentModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <modal.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </modal.Provider>
  );
};

export const UseCurrentModal = () => {
  return useContext(modal);
};
