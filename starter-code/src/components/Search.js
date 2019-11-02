import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <input
        className="search-food"
        onChange={this.searchFood}
        placeholder="SEARCH FOOD"
      ></input>
    );
  }
}
