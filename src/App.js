import React from 'react';
import './App.css';

const url = "http://localhost:3000/pups/"
class App extends React.Component {
  
state = {
  pups: [],
  currentPup: {},
  filter: "OFF"
}

componentDidMount(){
  fetch(url)
  .then(res => res.json())
  .then(pups => this.setState({
    pups
  }))
}

handleClick = (pup) => {
  this.setState({currentPup: pup})
}

handleButton = (pup) => {
  
  let pupStatus = null 
  if (pup.isGoodDog){
    pupStatus = false
  }
  else if (pup.isGoodDog === false){
    pupStatus = true
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: pupStatus
    })
  }

  fetch(url + pup.id, configObj)
  .then(res => res.json())
  .then(pup => this.setState({
    pups: this.state.pups.map(puppy => {
      if (puppy.id === pup.id){
        puppy.isGoodDog = pupStatus
      }
      return puppy
    })
  }))
}

filter = () => {
  if (this.state.filter === "OFF"){ 
    this.setState({filter: "ON"})
  }
  else {
    this.setState({filter: "OFF"})
  }
}

displayDogs = () => {
  let filteredDogs = this.state.pups
  if (this.state.filter === "ON"){ 
    filteredDogs = this.state.pups.filter(pup => pup.isGoodDog === true)
  }
  return filteredDogs
}

render(){
  let displayDogs = this.displayDogs()

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={this.filter} id="good-dog-filter">Filter good dogs: {this.state.filter}</button>
      </div>
      <div id="dog-bar">
      {displayDogs.map(pup => <span onClick={() => this.handleClick(pup)}>{pup.name}</span>)}
      </div>
        {this.state.currentPup.id ? 
        <div id="dog-summary-container">
        <h1>DOGGO:</h1>
            <div id="dog-info">
              <img src={this.state.currentPup.image}></img>
              <h2>{this.state.currentPup.name}</h2>
              <button onClick={() => this.handleButton(this.state.currentPup)} >{this.state.currentPup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button> 
          </div>
      </div>
          : null}
    </div>
  );
  }
}

export default App;
