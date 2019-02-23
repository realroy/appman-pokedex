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
      <div>
        <p>HP</p>
        {hp || 0}
      </div>
      <div>
        <p>STR</p>
        {str || 0}
      </div>
      <div>
        <p>Weak</p>
        {weak || 0}
      </div>
      <div>{happiness || 0}</div>
    </div>
    <div>
      <button onClick={onClick}>{mode}</button>
    </div>
  </div>
);
