import React, { Component } from 'react'
import './App.css'
import Popup from "reactjs-popup"

const WORDS = ['poulpe', 'dauphin', 'lanterne', 'oreille', 'oiseau', 'livre', 'iphone', 'orange', 'entreprise', 'japon', 'universite', 'casquette', 'lapin', 'merveille', 'manger', 'eau', 'vert', 'chemin', 'lynx', 'image', 'construire', 'personne', 'croire', 'emballer']
const LETTERS = "abcdefghijklmnopqrstuvwxyz"

class App extends Component {

  constructor (props) {
    super(props)
    const word = this.generateWTF()
    this.state = { wordToFind: word, display: "_".repeat(word.length), countDown: 8, indexUsed: [] }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  generateWTF() {
    return WORDS[this.getRandomInt(WORDS.length)]
  }

  handleLetterClick(index) {
    const { wordToFind, countDown, indexUsed } = this.state
    var displayAsTab = this.state.display.split('')
    const letter = LETTERS[index]
    const regex = new RegExp(letter, 'gi')
    var result

    if (!wordToFind.match(regex)) {
      this.setState({ countDown: countDown - 1 })
    }
    while ( (result = regex.exec(wordToFind)) ) {
        displayAsTab[result.index] = letter
    }
    this.setState({ display: displayAsTab.join(''), indexUsed: [...indexUsed, index] })
  }

  handleRetry() {
    const word = this.generateWTF()
    this.setState({ wordToFind: word, display: "_".repeat(word.length), countDown: 8, indexUsed: [] })
  }

  render() {
    const { display, countDown, indexUsed } = this.state
    const won = display.indexOf('_') === -1
    const loss = countDown <= 0

    return (
      <div className="App">
        <span role='img' aria-label="octopus" className="poulpe">🐙</span>
        <p>Nombre de coup restant : { countDown }</p>
        <p className="displayWord">{ display }</p>
        <div className="alphabet">
        {LETTERS.split('').map((letter, index) => (
            <span className={`letters ${indexUsed.includes(index) ? "indexUsed" : "" }`} onClick={() => {this.handleLetterClick(index)}} key={index}>
              { letter }
            </span>
          ))}
        </div>
        <br/>
        <Popup open={won} modal closeOnDocumentClick={false} >
          <div className="modal">
            <p>Bien joué t'es poulpement fortiche toi</p>
            <button type="button" onClick={() => this.handleRetry()}>Encore ?</button>
          </div>
        </Popup>

        <Popup open={loss} modal closeOnDocumentClick={false} >
          <div className="modal">
            <p>C'est raté</p>
            <button type="button" onClick={() => this.handleRetry()}>Non d'un encrier <br />Je veux ré essayer</button>
          </div>
        </Popup>


      </div>
    )
  }
}

export default App
