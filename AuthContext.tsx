
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types.ts';
import { decodeJWT } from './utils/jwtUtils.ts';

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('keshava_auth_token'));

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) setUser({ name: decoded.name, email: decoded.email, isLoggedIn: true });
      else logout();
    }
  }, [token]);

  const login = (jwtToken: string) => {
    localStorage.setItem('keshava_auth_token', jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('keshava_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
