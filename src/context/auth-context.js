import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    Logout: () => {},
    ClientID: 0,
    clientIDsetter: () => {},
    Token: undefined
});