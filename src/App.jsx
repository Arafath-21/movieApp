import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import MovieProvider from "./context/MovieContext"; // Import the provider

const App = () => {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchResults" element={<SearchResults />} />
            <Route path="/moviesDetails/:id" element={<MovieDetails />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;
