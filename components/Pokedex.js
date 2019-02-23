import React from "react";
import { PokemonCard } from "./PokemonCard";

export const Pokedex = props => (
  <>
    <h1>My Pokedex</h1>
    {props.pokedex.map(x => (
      <PokemonCard
        key={x.id}
        {...x}
        onClick={_ => props.removePokemon(x.id)}
        mode="X"
      />
    ))}
  </>
);
