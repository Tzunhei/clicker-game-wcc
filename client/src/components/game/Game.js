import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Coins from "./Coins";
import Hero from "./Hero";
import Villain from "./Villain";
import StoreBar from "./StoreBar";
import Characters from "./store/Characters";
import Skins from "./store/Skins";
import Skills from "./store/Skills";
import HealthBar from "./HealthBar";
import NavBar from "../common/NavBar";
import "./Game.css";
import BtnRestart from "./BtnRestart";
// import villains from "../game/villains.json";

import axios from "axios";

export default class Game extends Component {
  state = {
    coins: 0,
    health: 0,
    healthDivisor: 0,
    level: 0,
    villainImg: "",
    store: {
      characters: null,
      skins: null
    },
    storeCharaters: false,
    storeSkins: false,
    storeSkills: false,
    timer: 0,
    villains: ["1","2"],
    blackWidowStoreCharacter: false,
    hulkStoreCharacter: false,
    thorStoreCharacter: false,
    msMarvelStoreCharacter: false,
    spidermanStoreCharacter: false
  };

  addCoins = nbCoins => {
    this.setState({
      coins: this.state.coins + nbCoins
    });
  };

  removeHealth = () => {
    if (this.state.health > 0) {
      this.setState({
        health: this.state.health - 1
      });
    }
  };

  showStoreCharacters = () => {
    this.setState({
      storeCharaters: !this.state.storeCharaters
    });
  };

  showStoreSkins = () => {
    this.setState({
      storeSkins: !this.state.storeSkins
    });
  };

  showStoreSkills = () => {
    this.setState({
      storeSkills: !this.state.storeSkills
    });
  };

  decrement = () => {
    if (this.state.timer > 0) {
        this.setState({timer : this.state.timer -1})
    }
}

Timer = () => {
   setInterval(this.decrement, 1000)
}

resetGame = () => {
  this.setState({
    ...this.state,
    level: 1,
    health: this.state.villains[0].damages,
    healthDivisor: this.state.villains[0].healthDivisor,
    villainImg: this.state.villains[0].image,
    coins: 0,
    timer: 30,
  })
  document.getElementById('game').style.backgroundImage= `url(${this.state.villains[0].bgSrc})`
}

buyCharacter = (character) => {
  if (character === "Black-widow") {
    this.setState({ blackWidowStoreCharacter : true})
  }
  else if (character === "thor") {
    this.setState({ thorStoreCharacter : true})
  }
}

  // Ip address 192.168.1.223
  componentDidMount = () => {
    axios
      .get("http://192.168.1.223:5000/store/characters")
      .then(characters => {
        this.setState({
          store: {
            ...this.state.store,
            characters: characters.data
          }
        });
      })
      .catch(error => console.log(error));

    axios
      .get("http://192.168.1.223:5000/store/skins")
      .then(skins =>
        this.setState({
          store: {
            ...this.state.store,
            skins: skins.data
          }
        })
      )
      .catch(error => console.log(error));

      axios
      .get("http://192.168.1.223:5000/villains")
      .then(villains => (this.setState({
      ...this.state,
      villains: villains.data, 
      level: villains.data[0].idLevel,
      health: villains.data[0].damages,
      healthDivisor: villains.data[0].healthDivisor,
      villainImg: villains.data[0].image,
      timer: 30
    }),
    document.getElementById('game').style.backgroundImage= `url(${villains.data[0].bgSrc})`))
    this.Timer()
    if(this.state.background){
    }
  };


  // componentDidUpdate variant for when we will have a server running 24/7
  componentDidUpdate = () => {
    if (this.state.health === 0 && this.state.level !==0) {
    this.setState({
        ...this.state,
        level: this.state.level + 1,
        health: this.state.villains[this.state.level].damages,
        healthDivisor: this.state.villains[this.state.level].healthDivisor,
        villainImg: this.state.villains[this.state.level].image,
        timer : 30
      })
      this.addCoins(this.state.villains[this.state.level].coinAward)
      document.getElementById('game').style.backgroundImage= `url(${this.state.villains[this.state.level].bgSrc})`
    }
  };

  render() {
    console.log(this.state.villains)
    return (
      <div id="game">
       {this.state.level === 0 ? <div className="loading">Loading Game</div> : <></>} 

        <HealthBar
          health={this.state.health}
          healthDivisor={this.state.healthDivisor}
          timer={this.state.timer}
          level={this.state.level}
        />
        <BtnRestart resetGame={this.resetGame}/>
        <Coins coins={this.state.coins} addCoins={this.addCoins} />
        <NavBar />
        <Hero
          removeHealth={this.removeHealth}
          addCoins={this.addCoins}
        />
      
        <Villain villainImg={this.state.villainImg} level={this.state.level} />
        

        {this.state.storeCharaters ? (
          <Characters
            characters={this.state.store.characters}
            showStoreCharacters={this.showStoreCharacters}
            buyCharacter={this.buyCharacter}
            blackWidowStoreCharacter={this.state.blackWidowStoreCharacter}
          />
        ) : (
          <></>
        )}
        {this.state.storeSkins ? (
          <Skins
            skins={this.state.store.skins}
            showStoreSkins={this.showStoreSkins}
          />
        ) : (
          <></>
        )}
        {this.state.storeSkills ? (
          <Skills showStoreSkills={this.showStoreSkills} />
        ) : (
          <></>
        )}
        <StoreBar
          showStoreCharacters={this.showStoreCharacters}
          showStoreSkins={this.showStoreSkins}
          showStoreSkills={this.showStoreSkills}
        />
      </div>
    );
  }
}