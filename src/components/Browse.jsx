import React, { useState, useEffect } from 'react';
import { FaEthereum, FaPlay, FaInfoCircle, FaHeart, FaFilter } from 'react-icons/fa';
import MovieSlug from './MovieSlug';
import { useLoader } from '../contexts/LoaderContext';

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All', count: 0 },
    { id: 'trending', name: 'Trending', count: 0 },
    { id: 'action', name: 'Action', count: 0 },
    { id: 'horror', name: 'Horror', count: 0 },
    { id: 'comedy', name: 'Comedy', count: 0 },
    { id: 'drama', name: 'Drama', count: 0 },
    { id: 'scifi', name: 'Sci-Fi', count: 0 }
  ]);
  const { setIsLoading } = useLoader();

  // Extended movie data with categories
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

  // Update category counts
  useEffect(() => {
    const updatedCategories = categories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? movies.length 
        : movies.filter(movie => movie.categories.includes(category.id)).length
    }));
    
    setCategories(updatedCategories);
  }, []); // Empty dependency array since movies is static

  // Filter movies based on selected category
  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? movies
      : movies.filter(movie => movie.categories.includes(selectedCategory));
    
    setFilteredMovies(filtered);
  }, [selectedCategory]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="pt-16 min-h-screen bg-dark">
      {/* Hero Section - More responsive */}
      <div className="relative h-[50vh] md:h-[70vh] mb-8 md:mb-12">
        <div className="absolute inset-0">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
            alt="Featured Movie"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">The Dark Knight</h1>
            <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-8 line-clamp-3 md:line-clamp-none">
              When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, 
              Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.
            </p>
            <button className="flex items-center gap-2 bg-primary px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base">
              <FaPlay />
              <span>Watch Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="sticky top-16 z-30 bg-dark/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-4 mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Browse by Category</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>
        
        <div className={`flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 
          ${showFilters ? 'flex' : 'hidden md:flex'}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full transition-all whitespace-nowrap text-sm md:text-base
                ${selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                }`}
            >
              <span>{category.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs 
                ${selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-dark-light'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-300">
            Showing {filteredMovies.length} {selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory)?.name : ''} movies
          </h3>
          <div className="flex items-center gap-4">
            {/* Add additional filters here if needed */}
          </div>
        </div>
      </div>

      {/* Movie Grid - Enhanced cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredMovies.map((movie) => (
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

export default Browse; 