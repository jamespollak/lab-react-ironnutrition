import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import foods from "./foods.json";
import FoodBox from "./components/FoodBox";
import Modal from "./components/Modal";
import Search from "./components/Search";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allFoods: foods,
      toggleModal: false
    };
  }

  allFoods = () => {
    return this.state.allFoods.map((food, i) => {
      return (
        <FoodBox
          key={i}
          name={food.name}
          calories={food.calories}
          image={food.image}
        />
      );
    });
  };

  toggleModal = () => {
    this.setState({ toggleModal: !this.state.toggleModal });
  };

  addFood = food => {
    this.setState({ allFoods: this.state.allFoods.concat(food) });
    this.toggleModal();
  };

  searchFood = e => {
    // list of food = this.state.allFoods
    const userInput = e.target.value;
    // filter look up doc of filter => returns a new array with filter elements.
    var resultOfFilter = this.state.allFoods.filter(
      e => e.name.toLowerCase().indexOf(userInput.toLowerCase()) == 0
    );
    // with new array call this.setState({allFoods : resultOfFilter })
    this.setState({ allFoods: resultOfFilter });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button className="add-food" onClick={this.toggleModal}>
            ADD FOOD
          </button>
          <input
            className="search-food"
            onChange={this.searchFood}
            placeholder="SEARCH FOOD"
          ></input>
          {this.state.toggleModal && (
            <Modal toggleModal={this.toggleModal} addFood={this.addFood} />
          )}
        </header>
        {this.allFoods()}
      </div>
    );
  }
}

export default App;
