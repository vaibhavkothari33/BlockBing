// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MovieStreaming is ReentrancyGuard, Ownable {
    struct Movie {
        string title;
        uint256 pricePerMinute;
        string playbackId;
        bool isActive;
    }

    struct ViewSession {
        uint256 startTime;
        uint256 depositAmount;
        bool isActive;
    }

    mapping(uint256 => Movie) public movies;
    mapping(address => mapping(uint256 => ViewSession)) public viewSessions;
    
    uint256 public movieCount;
    uint256 public constant MINIMUM_DEPOSIT = 0.001 ether;

    event MovieAdded(uint256 movieId, string title, uint256 pricePerMinute);
    event ViewingStarted(address viewer, uint256 movieId, uint256 startTime, uint256 deposit);
    event ViewingEnded(address viewer, uint256 movieId, uint256 duration, uint256 cost, uint256 refund);

    function addMovie(
        string memory _title,
        uint256 _pricePerMinute,
        string memory _playbackId
    ) external onlyOwner {
        movieCount++;
        movies[movieCount] = Movie({
            title: _title,
            pricePerMinute: _pricePerMinute,
            playbackId: _playbackId,
            isActive: true
        });

        emit MovieAdded(movieCount, _title, _pricePerMinute);
    }

    function startViewing(uint256 _movieId) external payable nonReentrant {
        require(movies[_movieId].isActive, "Movie not available");
        require(msg.value >= MINIMUM_DEPOSIT, "Insufficient deposit");
        require(!viewSessions[msg.sender][_movieId].isActive, "Session already active");

        viewSessions[msg.sender][_movieId] = ViewSession({
            startTime: block.timestamp,
            depositAmount: msg.value,
            isActive: true
        });

        emit ViewingStarted(msg.sender, _movieId, block.timestamp, msg.value);
    }

    function endViewing(uint256 _movieId) external nonReentrant {
        ViewSession storage session = viewSessions[msg.sender][_movieId];
        require(session.isActive, "No active session");

        uint256 duration = (block.timestamp - session.startTime) / 60; // Duration in minutes
        uint256 cost = duration * movies[_movieId].pricePerMinute;
        
        require(cost <= session.depositAmount, "Insufficient deposit");
        
        uint256 refund = session.depositAmount - cost;
        session.isActive = false;

        if (cost > 0) {
            (bool success, ) = owner().call{value: cost}("");
            require(success, "Transfer to owner failed");
        }

        if (refund > 0) {
            (bool success, ) = msg.sender.call{value: refund}("");
            require(success, "Refund transfer failed");
        }

        emit ViewingEnded(msg.sender, _movieId, duration, cost, refund);
    }

    function getMovie(uint256 _movieId) external view returns (
        string memory title,
        uint256 pricePerMinute,
        string memory playbackId,
        bool isActive
    ) {
        Movie memory movie = movies[_movieId];
        return (movie.title, movie.pricePerMinute, movie.playbackId, movie.isActive);
    }

    function getActiveSession(address _viewer, uint256 _movieId) external view returns (
        uint256 startTime,
        uint256 depositAmount,
        bool isActive
    ) {
        ViewSession memory session = viewSessions[_viewer][_movieId];
        return (session.startTime, session.depositAmount, session.isActive);
    }
}