import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "15px 10px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "14px",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} MovieZone. Tous droits réservés.
      </p>
      <p>
        Site développé par <strong>TonNom</strong>
      </p>
    </footer>
  );
}

export default Footer;
