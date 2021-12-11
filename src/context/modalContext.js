import { useState, createContext, useContext } from 'react';

const modal = createContext();

export const ModalProvider = ({ children }) => {
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

export const UseModalContext = () => {
  return useContext(modal);
};
