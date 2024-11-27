import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MovieContext } from "../context/MovieContext"; // Import the context

const Navbar = () => {
  const [input, setInput] = useState("");
  const { setSearchTerm, setMovies, setCurrentPage, setTotalResults } =
    useContext(MovieContext); // Use context

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchTerm(input);
    setCurrentPage(1);

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=14793942&s=${input}&page=1`
    );

    setMovies(response.data.Search || []);
    setTotalResults(response.data.totalResults);
    navigate("/searchResults");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow-lg">
      <Link to="/" className="text-white text-2xl font-bold">
        OMDB App
      </Link>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded-l-md flex-grow outline-none"
          placeholder="Search movies..."
        />
        <button
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-r-lg transition"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
