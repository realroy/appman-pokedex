import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
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
    return (
      <>
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
              onChange={this.handleSearchChange}
              value={this.state.search}
              id="search"
            />
            <div>
              {this.props.all.map(x => (
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
        <button onClick={this.openModal}>+</button>
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
