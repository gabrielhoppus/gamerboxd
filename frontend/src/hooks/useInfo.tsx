import { useContext } from 'react';

import UserContext from "../context/UserContext";

export default function useInfo() {
  const { userData: user } = useContext(UserContext);

  return user.User;
}