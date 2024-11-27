import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";

const SearchResults = () => {
  const {
    movies,
    setMovies,
    searchTerm,
    currentPage,
    setCurrentPage,
    totalResults,
  } = useContext(MovieContext);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = async (page) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=14793942&s=${searchTerm}&page=${page}`
    );
    setMovies(response.data.Search || []);
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-white text-2xl mt-6 mb-6">
        Search Results for "{searchTerm}"
      </h2>

      {movies.length === 0 ? ( // Check if movies array is empty
        <div className="text-white text-center mt-20">
          <h3 className="text-2xl font-bold">
            No movies found for "{searchTerm}".
          </h3>
          <p className="text-gray-300">Try searching for something else.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:w-11/12 w-10/12 ml-14 mt-20">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="h-full w-full bg-transparent pr-14 md:p-4 hover:shadow-lg hover:scale-110 transition"
              >
                <Link to={`/moviesDetails/${movie.imdbID}`}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="max-w-full h-auto object-cover rounded-md"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mt-2 text-gray-100">
                      {movie.Title}
                    </h2>
                    <p className="text-gray-200 font-medium">{movie.Year}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
