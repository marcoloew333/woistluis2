import React, { Component } from "react";
import './App.css';

class App extends Component {

  state = {
    bets: [],
    bet: {
      person_name: "Peter Pan",
      time_bet: "10:17 Uhr"
    }
  };

  componentDidMount() {
    this.getBets();
  }

  getBets = _ => {
    fetch("http://www.woistluis.moodlions.de/bets")
        .then(response => response.json())
        .then(response => this.setState({bets: response.data}))
        .catch(err => console.error(err))
  };

  addBet = _ => {
    const { bet } = this.state;

    fetch(`http://www.woistluis.moodlions.de/bets/add?name=${bet.person_name}&bet=${bet.time_bet}`)
        .then(response => response.json())
        .then(this.getProducts)
        .catch(err => console.error(err))
  };

  renderBets = ({ bet_id, name, bet}) =>
      <div key={bet_id}>
        <p>{name}</p>
        <p>{bet}</p>
      </div>;

    render() {
    const { bets, bet } = this.state;

        return (
            <div>
              {bets.map(this.renderBets)}
              <div>
                <input
                    value={bet.person_name}
                    onChange={e => this.setState({bet: { ...bet, person_name: e.target.value}})}
                />
                <input
                    value={bet.time_bet}
                    onChange={e => this.setState({bet: { ...bet, time_bet: e.target.value}})}
                />
                <button onClick={this.addBet}>Wette abgeben</button>
              </div>
            </div>
        )
    }
}

export default App;
