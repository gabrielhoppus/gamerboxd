import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext<any>({});
export default UserContext;

export function UserProvider({ children }: any) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
