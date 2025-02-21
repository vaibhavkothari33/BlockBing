import React, { useState } from 'react';
import { FaEthereum, FaStar, FaClock, FaVideo } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { getContract } from '../../utils/contract';
import { useLoader } from '../../contexts/LoaderContext';

const MovieCard = ({ nft, isOwner }) => {
  const { active, library } = useWeb3React();
  const { setIsLoading } = useLoader();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBuy = async () => {
    if (!active) return;
    setIsProcessing(true);
    setIsLoading(true);
    
    try {
      const contract = getContract(library);
      const tx = await contract.buyNFT(nft.tokenId, { 
        value: ethers.utils.parseEther(nft.price.toString()) 
      });
      await tx.wait();
      console.log('NFT bought:', nft.tokenId);
    } catch (error) {
      console.error('Error buying NFT:', error);
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="bg-dark-lighter rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={nft.image}
          alt={nft.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Top Badges */}
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
          {nft.imdb && (
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transform hover:scale-105 transition-transform">
              <FaStar className="text-base" />
              <span className="text-base">{nft.imdb}</span>
            </div>
          )}
          {nft.forSale && (
            <div className="bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
              For Sale
            </div>
          )}
        </div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-90' : 'opacity-0'
        }`} />

        {/* Hover Content */}
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300">
            <p className="text-white/90 text-sm line-clamp-3 mb-4">{nft.description}</p>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <FaClock className="text-primary" />
                <span>{nft.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaVideo className="text-primary" />
                <span>{nft.genre.split(',')[0]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-3 text-white/90">{nft.title}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <FaEthereum className="text-xl" />
            <span className="font-bold text-lg">{nft.price} ETH</span>
          </div>
          <span className="text-sm bg-dark/50 border border-primary/20 px-3 py-1 rounded-full text-primary/80">
            #{nft.tokenId}
          </span>
        </div>
        
        {active ? (
          isOwner ? (
            <button
              disabled
              className="w-full bg-primary/10 text-primary py-3 rounded-lg font-medium border border-primary/20"
            >
              Owned
            </button>
          ) : (
            nft.forSale && (
              <button
                onClick={handleBuy}
                disabled={isProcessing}
                className={`w-full ${
                  isProcessing 
                    ? 'bg-primary/50 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90'
                } py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-primary/30`}
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </button>
            )
          )
        ) : (
          <button
            className="w-full bg-gray-500/20 border border-gray-500/30 text-gray-400 py-3 rounded-lg cursor-not-allowed font-medium"
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