'use client';

import { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const AppContext = createContext<any>(undefined);

export function Appwrapper({ children }: Props) {
  const [name, setName] = useState('Hello');
  return (
    <AppContext.Provider value={{ name, setName }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
