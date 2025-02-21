import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FaGoogle } from 'react-icons/fa';
import Squares from '../Squares';

const Auth = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and loading is complete
    if (isAuthenticated && !isLoading) {
      navigate('/browse');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: '/browse' }
    });
  };

  // If still loading, you might want to show a loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-dark-lighter rounded-2xl shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to Continue</h2>
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-primary py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FaGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Auth; 