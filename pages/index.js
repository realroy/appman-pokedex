import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Head from "next/head";
import { debounce } from "lodash";

import { Pokedex } from "../components/Pokedex";
import { addPokemon, removePokemon, fetchPokemons } from "../store";
import { PokemonCard } from "../components/PokemonCard";

Modal.setAppElement("#__next");
class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    return {};
  }

  state = {
    modalIsOpen: false,
    search: ""
  };

  openModal = () => this.setState({ modalIsOpen: true });

  afterOpenModal = () => {};

  closeModal = () => this.setState({ modalIsOpen: false });

  componentDidMount() {
    this.props.fetchPokemons();
  }

  handleSearchChange = ({ target: { value } }) => {
    this.setState({ search: value });
    debounce(() => this.props.fetchPokemons(value), 300)();
  };

  render() {
    const pokedexIds = this.props.pokedex.map(({ id }) => id) || [];
    return (
      <>
        <Head>
          <title>My Pokedex</title>
        </Head>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Pokedex {...this.props} />
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div>
              <input
                type="search"
                placeholder="Find Pokemon"
                onChange={this.handleSearchChange}
                value={this.state.search}
                id="search"
              />
              <div>
                {this.props.all
                  .filter(({ id }) => !pokedexIds.includes(id))
                  .map(x => (
                    <PokemonCard
                      key={x.id}
                      {...x}
                      onClick={_ => this.props.addPokemon(x)}
                    />
                  ))}
              </div>
            </div>
          </Modal>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ec5656",
              color: "white",
              border: "none"
            }}
          >
            <button
              style={{
                backgroundColor: "#ec5656",
                color: "white",
                border: "none"
              }}
              onClick={this.openModal}
            >
              +
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ all, pokedex }) => ({
  all,
  pokedex
});

const mapDispatchToProps = {
  addPokemon,
  removePokemon,
  fetchPokemons
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
