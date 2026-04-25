import { createContext, useState, useContext } from 'react';

const ToggleContext = createContext();

export function MyProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ToggleContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </ToggleContext.Provider>
  );
}

export const useToggleContext = () => useContext(ToggleContext);