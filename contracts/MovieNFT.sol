// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MovieNFT is ERC721URIStorage, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Movie {
        string title;
        string uri;
        uint256 price;
        bool forSale;
        string description;
        string genre;
        uint256 year;
        string duration;
    }

    mapping(uint256 => Movie) public movies;
    mapping(address => uint256[]) public userMovies;

    event MovieMinted(uint256 tokenId, string title, address owner);
    event MovieListed(uint256 tokenId, uint256 price);
    event MovieSold(uint256 tokenId, address buyer, uint256 price);
    event PriceUpdated(uint256 tokenId, uint256 newPrice);

    constructor() ERC721("Movie NFT", "MNFT") {}

    function mintMovie(
        string memory title,
        string memory uri,
        uint256 price,
        string memory description,
        string memory genre,
        uint256 year,
        string memory duration
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        
        movies[newTokenId] = Movie(
            title,
            uri,
            price,
            true,
            description,
            genre,
            year,
            duration
        );
        
        userMovies[msg.sender].push(newTokenId);
        emit MovieMinted(newTokenId, title, msg.sender);
        return newTokenId;
    }

    function buyMovie(uint256 tokenId) public payable nonReentrant {
        require(_exists(tokenId), "Movie does not exist");
        Movie storage movie = movies[tokenId];
        require(movie.forSale, "Movie is not for sale");
        require(msg.value >= movie.price, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);
        payable(seller).transfer(msg.value);
        
        // Update ownership records
        removeFromUserMovies(seller, tokenId);
        userMovies[msg.sender].push(tokenId);
        
        movie.forSale = false;
        emit MovieSold(tokenId, msg.sender, msg.value);
    }

    function listMovie(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than 0");
        
        movies[tokenId].price = price;
        movies[tokenId].forSale = true;
        
        emit MovieListed(tokenId, price);
    }

    function updatePrice(uint256 tokenId, uint256 newPrice) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(newPrice > 0, "Price must be greater than 0");
        
        movies[tokenId].price = newPrice;
        emit PriceUpdated(tokenId, newPrice);
    }

    function getUserMovies(address user) public view returns (uint256[] memory) {
        return userMovies[user];
    }

    function getMovie(uint256 tokenId) public view returns (Movie memory) {
        require(_exists(tokenId), "Movie does not exist");
        return movies[tokenId];
    }

    function removeFromUserMovies(address user, uint256 tokenId) internal {
        uint256[] storage userTokens = userMovies[user];
        for (uint256 i = 0; i < userTokens.length; i++) {
            if (userTokens[i] == tokenId) {
                userTokens[i] = userTokens[userTokens.length - 1];
                userTokens.pop();
                break;
            }
        }
    }
}