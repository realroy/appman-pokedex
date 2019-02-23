import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const initialState = {
  all: [],
  pokedex: []
};

export const actionTypes = {
  ADD: "ADD",
  DELETE: "DELETE",
  FETCH_POKEMONS: "FETCH_POKEMON",
  FETCH_POKEMONS_SUCCESS: "FETCH_POKEMON_SUCCESS",
  FETCH_POKEMONS_FAILURE: "FETCH_POKEMONS_FAILURE"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return { ...state, pokedex: [...state.pokedex, action.payload] };
    case actionTypes.DELETE:
      return {
        ...state,
        pokedex: state.pokedex.filter(({ id }) => id !== action.payload)
      };
    case actionTypes.FETCH_POKEMONS_SUCCESS:
      return {
        ...state,
        all: action.payload
      };
    default:
      return state;
  }
};

// ACTIONS
export const addPokemon = pokemon => ({
  type: actionTypes.ADD,
  payload: pokemon
});
export const removePokemon = id => ({
  type: actionTypes.DELETE,
  payload: id
});

const calcHp = hp => (hp > 100 ? 100 : hp);
const calcStr = _ => 100;
const calcWeakness = (weaknesses = []) =>
  weaknesses.reduce((prev, curr) => {
    let val = 0;
    if (parseInt(curr) == 1) {
      val = 100;
    }
    return prev + val * 100;
  }, 0);
const calcDamage = (attacks = []) =>
  attacks.reduce((prev, curr) => {
    const val = parseInt(curr) || 0;
    return prev + val;
  }, 0);

const calsHappiness = (hp, damage, weak) =>
  (hp / 10 + damage / 10 + 10 - weak) / 5;
export const preprocess = (cards = []) =>
  cards.map(c => ({
    id: c.id,
    name: c.name,
    imgUrl: c.imageUrl,
    str: calcStr(),
    hp: calcHp(c.hp),
    weak: calcWeakness(c.weaknesses),
    happiness: calsHappiness(c.hp, calcDamage(c.damage), calcWeakness(c.weak))
  }));

export const fetchPokemons = (search = "") => dispatch => {
  let url;
  if (search === "") {
    url = "http://localhost:3030/api/cards";
  } else {
    url = `http://localhost:3030/api/cards?name=${search}&type=${search}`;
  }
  dispatch({ type: actionTypes.FETCH_POKEMONS });
  fetch(url)
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: actionTypes.FETCH_POKEMONS_SUCCESS,
        payload: preprocess(json.cards)
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: actionTypes.FETCH_POKEMONS_FAILURE });
    });
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
