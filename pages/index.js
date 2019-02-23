import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import { Pokedex } from "../components/Pokedex";
import { addPokemon, removePokemon, fetchPokemons } from "../store";
import { PokemonCard } from "../components/PokemonCard";

Modal.setAppElement("#__next");
class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    return {};
  }

  state = {
    modalIsOpen: false
  };

  openModal = () => this.setState({ modalIsOpen: true });

  afterOpenModal = () => {};

  closeModal = () => this.setState({ modalIsOpen: false });

  componentDidMount() {
    this.props.fetchPokemons();
  }

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
            <input type="search" id="search" />
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
