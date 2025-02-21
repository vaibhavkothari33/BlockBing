import { Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Auth from './components/Auth/Auth';
import LandingPage from './components/LandingPage';
import Browse from './components/Browse';
import Movies from './components/Movies';
// import TVShows from './components/TVShows';
import MyList from './components/MyList';
import Search from './components/Search';
import Profile from './components/Profile';
import Marketplace from './components/Marketplace/Marketplace';
import ClickSpark from './components/ClickSpark';
import React from 'react';
import { WalletProvider } from './context/WalletContext';

// import Navbar from './components/Navbar';
// import Auth from './components/Auth/Auth';
// import LandingPage from './components/LandingPage';
// import Browse from './components/Browse';
// import Movies from './components/Movies';
// import TVShows from './components/TVShows';
// import MyList from './components/MyList';
// import Search from './components/Search';
// import Profile from './components/Profile';
// import ClickSpark from './components/ClickSpark';

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletProvider>
          <div className="min-h-screen bg-dark">
            <ClickSpark
              sparkColor='#fff'
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            />
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/movies" element={<Movies />} />
              {/* <Route path="/tv-shows" element={<TVShows />} /> */}
              <Route path="/my-list" element={<MyList />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
          </div>
        </WalletProvider>
      </Web3ReactProvider>
    </Auth0Provider>
  );
};

export default App;
