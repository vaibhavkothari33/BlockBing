import React, { useState } from 'react';
import { FaPlay, FaEthereum, FaWallet, FaShieldAlt, FaFilm, FaSearch, FaPlayCircle, FaCode, FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { injected, NETWORKS } from '../utils/connectors';
import Squares from './Squares';
import CircularGallery from './CircularGallery';
import { useWallet } from '../context/WalletContext';
import SpotlightCard from './SpotlightCard';
const LandingPage = () => {
  const { active } = useWeb3React();
  const { connectWallet, isConnecting, error } = useWallet();

  return (
    <div className="relative min-h-screen w-full">
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

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center px-4 sm:px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaEthereum className="text-3xl md:text-4xl text-primary animate-pulse" />
            <span className="text-lg md:text-xl text-primary font-semibold">Blockchain Powered Streaming</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
            Revolutionizing Digital Content with Web3
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 md:mb-8 px-4">
            Experience the future of streaming with our decentralized pay-per-view platform.
            Watch premium content using cryptocurrency, with no subscriptions required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 px-4">
            <Link
              to="/browse"
              className="flex items-center justify-center gap-2 bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <FaPlay />
              <span>Browse Content</span>
            </Link>
            {active ? (
              <button className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 px-6 py-3 md:px-8 md:py-4 rounded-lg transition-colors w-full sm:w-auto">
                <FaWallet />
                <span>Connected</span>
              </button>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center justify-center gap-2 bg-gray-500/50 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-500/70 transition-colors backdrop-blur-sm w-full sm:w-auto"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <FaWallet />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm mx-4">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Choose from a Wide Variety of Movies</h2>
        <div style={{ height: '600px', position: 'relative' }}>
          <Link to="/browse">
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
          </Link>
        </div>
      </div>


      {/* Features Section */}
      <div className="relative bg-dark-lighter py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Experience the Future of Streaming</h2>
          <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto">Watch your favorite movies using blockchain technology. No subscriptions, no hidden fees - just seamless entertainment.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <FaShieldAlt className="text-6xl text-primary" />
              </div>
              <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(0, 229, 255, 0.1)">
                <div className="space-y-4 p-6">
                  <h3 className="text-2xl font-semibold">Secure & Transparent</h3>
                  <p className="text-gray-300 mb-6">
                    Experience worry-free streaming with our blockchain-powered platform that ensures complete security and transparency.
                  </p>
                  <ul className="text-gray-300 space-y-3 text-left">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Military-grade encryption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Verifiable transactions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Decentralized storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Smart contract protection</span>
                    </li>
                  </ul>
                </div>
              </SpotlightCard>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <FaFilm className="text-6xl text-primary" />
              </div>
              <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(0, 229, 255, 0.1)">
                <div className="space-y-4 p-6">
                  <h3 className="text-2xl font-semibold">Premium Content</h3>
                  <p className="text-gray-300 mb-6">
                    Dive into a vast library of high-quality content, from blockbuster movies to indie gems.
                  </p>
                  <ul className="text-gray-300 space-y-3 text-left">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>4K Ultra HD quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Exclusive releases</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Multi-language support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Curated collections</span>
                    </li>
                  </ul>
                </div>
              </SpotlightCard>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <FaEthereum className="text-6xl text-primary" />
              </div>
              <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(0, 229, 255, 0.1)">
                <div className="space-y-4 p-6">
                  <h3 className="text-2xl font-semibold">Easy Payments</h3>
                  <p className="text-gray-300 mb-6">
                    Pay-per-view with cryptocurrency. No subscriptions, no commitments - just simple, instant transactions.
                  </p>
                  <ul className="text-gray-300 space-y-3 text-left">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Pay only what you watch</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Multiple crypto supported</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Instant transactions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>No hidden fees</span>
                    </li>
                  </ul>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-16 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-dark to-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-3">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[25%] right-[25%] h-0.5 bg-gradient-to-r from-primary via-primary/70 to-primary z-0"></div>

            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-6 bg-dark-lighter rounded-xl border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-xl text-black">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Connect Wallet</h3>
                <p className="text-gray-300 text-center">Link your MetaMask or other crypto wallet securely to our platform</p>
                <div className="mt-4 flex justify-center">
                  <FaWallet className="text-primary text-2xl" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-6 bg-dark-lighter rounded-xl border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-xl text-black">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Browse Content</h3>
                <p className="text-gray-300 text-center">Explore our curated library of premium movies and exclusive content</p>
                <div className="mt-4 flex justify-center">
                  <FaSearch className="text-primary text-2xl" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-6 bg-dark-lighter rounded-xl border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-xl text-black">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Pay & Watch</h3>
                <p className="text-gray-300 text-center">Make a secure crypto payment and start streaming in seconds</p>
                <br />
                <div className="mt-4 flex justify-center">
                  <FaEthereum className="text-primary text-2xl" />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative p-6 bg-dark-lighter rounded-xl border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-xl text-black">4</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Enjoy</h3>
                <p className="text-gray-300 text-center">Watch your content in 4K Ultra HD with no buffering or ads
                </p>
                <br /> 
                <div className="mt-4 flex justify-center">
                  <FaPlayCircle className="text-primary text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              Get Started <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      {/* NFT Marketplace Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-primary/5 to-dark" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              NFT Marketplace
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Own and trade exclusive movie NFTs. Collect your favorite movies and support content creators.
            </p>
          </div>

          {/* Featured NFTs Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "The Dark Knight",
                image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
                price: "0.1 ETH"
              },
              {
                title: "Inception",
                image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
                price: "0.15 ETH"
              },
              {
                title: "Interstellar",
                image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                price: "0.2 ETH"
              }
            ].map((nft, index) => (
              <div
                key={index}
                className="group relative bg-dark-lighter rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-[2/3]">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
                  <div className="flex items-center gap-2 text-primary">
                    <FaEthereum />
                    <span>{nft.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium group"
            >
              Explore Marketplace
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="relative bg-dark-lighter py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-dark mx-auto mb-6 flex items-center justify-center">
                <FaCode className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vaibhav Kothari</h3>
              <p className="text-gray-400 mb-4">Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-dark mx-auto mb-6 flex items-center justify-center">
                <FaCode className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Abhigya Krishna</h3>
              <p className="text-gray-400 mb-4">Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-dark mx-auto mb-6 flex items-center justify-center">
                <FaCode className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shrijan Katiyar</h3>
              <p className="text-gray-400 mb-4">Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-dark mx-auto mb-6 flex items-center justify-center">
                <FaCode className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Navya Singh</h3>
              <p className="text-gray-400 mb-4">Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-8 md:px-16 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400">© 2025 Payper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 