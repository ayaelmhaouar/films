
import React from "react";

function About() {
  return (
    <div style={{ padding: "130px", maxWidth: 800, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#0011ff" }}>À propos de MovieScope 🎬</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
        MovieScope est votre portail vers l’univers du cinéma. Parcourez les films populaires, découvrez les nouveautés,
         et obtenez toutes les informations essentielles sur chaque film, y compris synopsis, date de sortie et affiches.
        MovieScope est une application web qui vous permet de découvrir et rechercher vos films préférés.
        Vous pouvez consulter les détails de chaque film, ajouter vos favoris .
      </p>
      
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
        Profitez de MovieScope pour explorer le monde du cinéma et créer votre liste de films favoris !
      </p>
    </div>
  );
}

export default About;