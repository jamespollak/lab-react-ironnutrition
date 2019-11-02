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
      toggleModal: false,
      todaysFood: []
    };
  }

  allFoods = () => {
    return this.state.allFoods.map((food, i) => {
      return (
        <FoodBox
          addTodaysFood={this.addTodaysFood}
          // quantity={food.quantity}
          // changeQuantity={food.changeQuantity}
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
    var resultOfFilter = foods.filter(
      e => e.name.toLowerCase().indexOf(userInput.toLowerCase()) == 0
    );
    // with new array call this.setState({allFoods : resultOfFilter })
    this.setState({ allFoods: resultOfFilter });
  };

  addTodaysFood = food => {
    const todaysFood = [...this.state.todaysFood];
    const foodExists = todaysFood.some(elem => elem.name === food.name);
    if (!foodExists) {
      todaysFood.push(food);
    }
    for (let i = 0; i < todaysFood.length; i += 1) {
      if (todaysFood[i].name === food.name) {
        todaysFood[i].quantity = food.quantity;
      }
    }
    this.setState({ todaysFood: todaysFood });
  };

  removeFood(index) {
    const todaysFood = [...this.state.todaysFood];
    todaysFood.splice(index, 1);
    this.setState({ todaysFood });
  }

  render() {
    const { todaysFood } = this.state;
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
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="all-foods">{this.allFoods()}</div>
            </div>
            <div className="column">
              <div className="food">
                <strong>Todays Food</strong>
                <ul>
                  {this.state.todaysFood.map((food, index) => (
                    <li key={index} id={index}>
                      {food.quantity} {food.name} ={" "}
                      {food.calories * food.quantity} cal{" "}
                      <button onClick={() => this.removeFood(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <h2>
                  Total Calories:{" "}
                  {todaysFood.reduce(
                    (acc, food) => (acc += food.calories * food.quantity),
                    0
                  )}{" "}
                  cal
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
