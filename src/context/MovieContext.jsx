import React, { createContext, useState } from "react";

// Create Context
export const MovieContext = createContext();

// Create Provider Component
const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // State and handlers to be shared globally
  const value = {
    movies,
    setMovies,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalResults,
    setTotalResults,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;
