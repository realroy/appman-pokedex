import React from "react";

export const PokemonCard = ({
  imgUrl = "",
  name = "",
  hp = 0,
  str = 0,
  weak = 0,
  happiness = 0,
  mode = "Add",
  onClick = () => {}
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      background: "#f3f4f7",
      padding: "4px"
    }}
  >
    <img src={imgUrl} alt="pokemon-card" />
    <div style={{ flexGrow: "2" }}>
      <h4>{name || ""}</h4>
      <div style={{ display: "flex" }}>
        <div className="label">
          <p>HP</p>
          <p>STR</p>
          <p>Weak</p>
        </div>
        <div className="bar-chart">
          <p> {hp || 0}</p>
          <p> {str || 0}</p>
          <p> {weak || 0}</p>
        </div>
      </div>
      <div>{happiness || 0}</div>
    </div>
    <div>
      <button
        style={{ border: "none", color: "#dc7777", background: "none" }}
        onClick={onClick}
      >
        {mode}
      </button>
    </div>
  </div>
);
