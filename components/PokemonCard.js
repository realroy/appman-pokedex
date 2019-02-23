import React from "react";

export const PokemonCard = ({
  imgUrl,
  name,
  hp,
  str,
  weak,
  happiness,
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
      <h4>{name}</h4>
      <div>
        <p>HP</p>
        {hp}
      </div>
      <div>
        <p>STR</p>
        {str}
      </div>
      <div>
        <p>Weak</p>
        {weak}
      </div>
      <div>{happiness}</div>
    </div>
    <div>
      <button onClick={onClick}>{mode}</button>
    </div>
  </div>
);
