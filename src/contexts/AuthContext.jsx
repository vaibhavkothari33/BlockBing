import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const { active: isWalletConnected, activate } = useWeb3React();
  const navigate = useNavigate();

  // Handle auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/browse');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: '/browse' }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLogout,
        isWalletConnected
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 