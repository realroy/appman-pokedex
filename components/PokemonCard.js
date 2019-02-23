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
  <>
    <img src={imgUrl} alt="pokemon-card" />
    <button onClick={onClick}>{mode}</button>
    <h4>{name}</h4>
    <div>
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
  </>
);
