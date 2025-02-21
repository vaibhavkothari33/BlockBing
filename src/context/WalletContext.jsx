import React, { createContext, useContext, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, NETWORKS } from '../utils/connectors';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { activate, active } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const switchToSepolia = async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORKS[11155111].chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORKS[11155111]],
          });
        } catch (addError) {
          setError('Failed to add network. Please try again.');
        }
      } else {
        setError('Failed to switch network. Please try again.');
      }
    }
  };

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask to connect your wallet');
        return;
      }

      await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      await switchToSepolia();
      await activate(injected, undefined, true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  }, [activate]);

  return (
    <WalletContext.Provider value={{
      active,
      isConnecting,
      error,
      connectWallet,
      setError
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 