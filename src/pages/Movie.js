import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ movies = [], onSearch }) {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis le localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored && stored !== "undefined") {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Erreur lors du parsing du localStorage", error);
      setFavorites([]); // valeur par défaut
    }
  }, []);

  // Fonction pour ajouter/retirer des favoris
  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ padding: "20px", maxWidth: 1200, margin: "auto" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2.5rem", color: "#0011ff" }}>
          Bienvenue sur MovieScope 🎬
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Recherchez vos films préférés ou découvrez les nouveautés !
        </p>
      </header>

      <div style={{ maxWidth: 400, margin: "0 auto 40px auto" }}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "25px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            outline: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "#999",
            }}
          >
            Aucun film trouvé.
          </p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                backgroundColor: "#fff",
                position: "relative",
              }}
            >
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=Pas+d'image"
                  }
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "270px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "10px" }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      margin: "0 0 8px 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#777", margin: 0 }}>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "N/A"}
                  </p>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie.id);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: favorites.includes(movie.id) ? "red" : "#ccc",
                }}
              >
                {favorites.includes(movie.id) ? "❤️" : "🤍"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
