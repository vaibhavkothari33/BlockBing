import React, { useState, useEffect } from 'react';
import { FaEthereum, FaSearch, FaFilter } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import MovieCard from './MovieCard';
import { useWallet } from '../../context/WalletContext';
import { useLoader } from '../../contexts/LoaderContext';
import { movies } from '../../data/movies'; // Import local movies as fallback

const Marketplace = () => {
  const { active, account } = useWeb3React();
  const { connectWallet, isConnecting } = useWallet();
  const { setIsLoading } = useLoader();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [nfts, setNfts] = useState(movies); // Use local movies as initial state

  // Fetch NFTs from OpenSea
  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://api.opensea.io/v2/chain/ethereum/stats/rankings?category=movie',
          {
            headers: {
              'X-API-KEY': import.meta.env.VITE_OPENSEA_API_KEY,
              'accept': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('OpenSea API response:', data);

        if (data && data.rankings) {
          const formattedNFTs = data.rankings.map(nft => ({
            id: nft.collection?.slug || Math.random().toString(),
            tokenId: nft.collection?.contract || '',
            title: nft.collection?.name || 'Untitled',
            image: nft.collection?.image_url || '',
            price: nft.floor_price || 0,
            owner: account || "0x1234...5678",
            forSale: true,
            description: nft.collection?.description || 'No description available',
          }));
          setNfts(formattedNFTs);
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, [setIsLoading, account]);

  const categories = [
    { id: 'all', name: 'All NFTs' },
    { id: 'forSale', name: 'For Sale' },
    { id: 'owned', name: 'My Collection' }
  ];

  const filteredNFTs = nfts.filter(nft => {
    if (!account) return true;
    if (filter === 'forSale') return nft.forSale;
    if (filter === 'owned') return nft.owner === account;
    return true;
  }).filter(nft => 
    nft.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/20 to-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              NFT Marketplace
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Discover, collect, and trade unique digital assets.
            </p>
            {!active && (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-primary/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-primary/50 hover:bg-primary/30 transition-colors"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                    Connecting...
                  </>
                ) : (
                  'Connect Wallet to Start Trading'
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-lg ${
                  filter === cat.id 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <MovieCard 
              key={nft.id} 
              nft={nft}
              isOwner={nft.owner === account}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace; 