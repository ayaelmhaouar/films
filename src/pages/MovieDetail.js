import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "7bc1ce18ff1992c16ad7893673646002";
  const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(data);
      } catch (error) {
        console.error("Erreur lors du chargement du film :", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!movie) return <p>Film non trouvé.</p>;

  return (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",  // hauteur de la fenêtre
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <button
      onClick={() => navigate(-1)}
      style={{
        backgroundColor: "#0400ffff",
        border: "none",
        borderRadius: "4px",
        color: "white",
        padding: "6px 12px",
        cursor: "pointer",
        marginBottom: "20px",  // un peu d'espace sous le bouton
      }}
    >
      ← Retour
    </button>
    <h1>{movie.title}</h1>
    <img
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=Pas+d'image"
      }
      alt={movie.title}
      style={{ width: "300px", borderRadius: "10px", margin: "20px 0" }}
    />
    <div
      style={{
        border: "2px solid #333",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "600px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        textAlign: "center", // centre aussi le texte à l'intérieur
      }}
    >
      <p style={{ marginBottom: "10px", fontSize: "16px" }}>
        <strong>Date de sortie :</strong> {movie.release_date}
      </p>
      <p style={{ marginBottom: "10px", fontSize: "16px" }}>
        <strong>Note :</strong> {movie.vote_average} / 10
      </p>
      <p style={{ lineHeight: "1.6", fontSize: "15px" }}>{movie.overview}</p>
    </div>
  </motion.div>
);

}

export default MovieDetail;

