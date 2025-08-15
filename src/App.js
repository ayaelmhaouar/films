import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Apropo from "./pages/Apropo"


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const API_KEY = "7bc1ce18ff1992c16ad7893673646002";
  const API_URL = "https://api.themoviedb.org/3";

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`
      );
      setMovies(data.results || []);
    } catch (error) {
      console.error("Erreur lors du chargement des films :", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {/* Navbar */}
      <nav
        style={{
          padding: "30px 20px",
          backgroundColor: "#0051ff",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
         textAlign: "right",
       
        }}
      >
        {/* Liens menu */}
         <img src="/images/movie.png" alt="movie" style={{ width: '50px', height: '30px' }} />
        <div
          style={{
            display:
              windowWidth > 600
                ? "flex"
                : mobileMenuOpen
                ? "flex"
                : "none",
            flexDirection: windowWidth > 600 ? "row" : "column",
            gap: "10px",
          }}
        >
          <Link to="/" style={{ color: "#fff", textDecoration: "none",  textAlign: "right" ,  fontSize: "24px",marginRight: "30px"}}>
            Home
          </Link>
          <Link to="/Apropo" style={{ color: "#fff", textDecoration: "none",  textAlign: "right" ,  fontSize: "24px",marginRight: "30px"}}>
          À propos
          </Link>
          {!isLoggedIn && (
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" ,  textAlign: "right",  fontSize: "24px"}}>
              Login
            </Link>
          )}
        </div>

        {/* Bouton mobile */}
        {windowWidth <= 600 && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "1px solid #fff",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              onSearch={setSearchTerm}
            />
          }
        />
         <Route path="/Apropo" element={<Apropo />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2600ff",
          color: "#fff",
          textAlign: "center",
          padding: "20px 0",
          marginTop: "40px",
        }}
      >
        <p>&copy; {new Date().getFullYear()} MovieScope. </p>
      </footer>
    </Router>
  );
}

export default App;
