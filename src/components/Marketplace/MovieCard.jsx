import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';

const MovieCard = ({ nft, isOwner }) => {
  const { active } = useWeb3React();

  const handleBuy = async () => {
    // Implement buy functionality
    console.log('Buying NFT:', nft.tokenId);
  };

  const handleSell = async () => {
    // Implement sell functionality
    console.log('Selling NFT:', nft.tokenId);
  };

  return (
    <div className="bg-dark-lighter rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
      <div className="relative aspect-[2/3]">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-full object-cover"
        />
        {nft.forSale && (
          <div className="absolute top-2 right-2 bg-primary px-2 py-1 rounded text-sm font-semibold">
            For Sale
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{nft.title}</h3>
        <div className="flex items-center gap-2 text-primary mb-4">
          <FaEthereum />
          <span className="font-medium">{nft.price} ETH</span>
        </div>
        
        {active ? (
          isOwner ? (
            <button
              onClick={handleSell}
              className="w-full bg-primary/20 text-primary py-2 rounded-lg hover:bg-primary/30 transition-colors"
            >
              {nft.forSale ? 'Update Price' : 'Sell NFT'}
            </button>
          ) : (
            nft.forSale && (
              <button
                onClick={handleBuy}
                className="w-full bg-primary py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Buy Now
              </button>
            )
          )
        ) : (
          <button
            className="w-full bg-gray-500/50 py-2 rounded-lg cursor-not-allowed"
            disabled
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard; 