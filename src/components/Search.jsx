import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlay, FaEthereum, FaHeart } from 'react-icons/fa';
import MovieSlug from './MovieSlug';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Movie data (you might want to move this to a separate file or context)
  const movies = [
    {
      id: 1,
      title: "PK",
      image: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_.jpg",
      price: 0.0001,
      year: 2014,
      duration: "2h 33min",
      genre: "Comedy, Drama",
      rating: "8.1",
      imdbRating: "8.1/10",
      categories: ['trending', 'comedy', 'drama'],
      description: "An alien on Earth loses the only device he can use to communicate with his spaceship."
    },
    {
      id: 2,
      title: "The Dark Knight",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      price: 0.0001,
      year: 2008,
      duration: "2h 32min",
      genre: "Action, Crime, Drama",
      rating: "9.0",
      imdbRating: "9.0/10",
      categories: ['trending', 'action'],
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham."
    },
    {
      id: 3,
      title: "Inception",
      image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      price: 0.0001,
      year: 2010,
      duration: "2h 28min",
      genre: "Action, Sci-Fi",
      rating: "8.8",
      imdbRating: "8.8/10",
      categories: ['trending', 'action', 'scifi'],
      description: "A thief who steals corporate secrets through dream-sharing technology."
    },
    {
      id: 4,
      title: "The Conjuring",
      image: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg",
      price: 0.0001,
      year: 2013,
      duration: "1h 52min",
      genre: "Horror, Mystery, Thriller",
      rating: "7.5",
      imdbRating: "7.5/10",
      categories: ['horror'],
      description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence."
    },
    {
      id: 5,
      title: "Interstellar",
      image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      price: 0.0001,
      year: 2014,
      duration: "2h 49min",
      genre: "Adventure, Drama, Sci-Fi",
      rating: "8.6",
      imdbRating: "8.6/10",
      categories: ['scifi', 'drama'],
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
      id: 6,
      title: "Get Out",
      image: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
      price: 0.0001,
      year: 2017,
      duration: "1h 44min",
      genre: "Horror, Mystery, Thriller",
      rating: "7.7",
      imdbRating: "7.7/10",
      categories: ['horror', 'trending'],
      description: "A young African-American visits his white girlfriend's parents for the weekend."
    },
    {
      id: 7,
      title: "The Grand Budapest Hotel",
      image: "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_.jpg",
      price: 0.0001,
      year: 2014,
      duration: "1h 39min",
      genre: "Adventure, Comedy, Crime",
      rating: "8.1",
      imdbRating: "8.1/10",
      categories: ['comedy'],
      description: "A writer encounters the owner of an aging high-class hotel."
    },
    {
      id: 8,
      title: "Parasite",
      image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
      price: 0.0001,
      year: 2019,
      duration: "2h 12min",
      genre: "Drama, Thriller",
      rating: "8.5",
      imdbRating: "8.5/10",
      categories: ['trending', 'drama'],
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
    }
  ];


  // Search functionality
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = movies.filter(movie => 
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-dark pt-16 px-4 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies by title, genre, or description..."
            className="w-full bg-dark-lighter py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto mt-8">
        {searchQuery && (
          <h2 className="text-xl text-gray-300 mb-6">
            {searchResults.length === 0 
              ? 'No results found' 
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`}
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {searchResults.map((movie) => (
            <div 
              key={movie.id} 
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
                    IMDb {movie.imdbRating}
                  </div>
                  <div className="bg-primary/90 px-2 py-1 rounded text-sm font-bold">
                    {movie.year}
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent 
                  transition-all duration-300 ${hoveredMovie === movie.id ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute bottom-0 p-4 w-full">
                    <div className="flex items-center justify-between text-white mb-3">
                      <div className="flex items-center gap-2">
                        <FaEthereum className="text-primary text-lg" />
                        <span className="text-lg font-medium">{movie.price} ETH</span>
                      </div>
                      <span className="text-sm bg-dark-lighter px-2 py-1 rounded">
                        {movie.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {movie.description}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary py-2.5 rounded-lg hover:bg-primary/90 
                        transition-colors font-medium text-sm flex items-center justify-center gap-2">
                        <FaPlay className="text-xs" />
                        Watch Now
                      </button>
                      <button className="bg-dark-lighter p-2.5 rounded-lg hover:bg-dark-light 
                        transition-colors" onClick={(e) => e.stopPropagation()}>
                        <FaHeart className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="bg-dark-lighter px-2 py-0.5 rounded">
                  {movie.genre.split(',')[0]}
                </span>
                <span>•</span>
                <span>{movie.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movie Slug Modal */}
      {selectedMovie && (
        <MovieSlug 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default Search; 