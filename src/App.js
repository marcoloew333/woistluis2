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
    fetch("http://192.168.178.198:4000/products")
        .then(response => response.json())
        .then(response => this.setState({bets: response.data}))
        .catch(err => console.error(err))
  };

  addBet = _ => {
    const { bet } = this.state;

    fetch(`http://192.168.178.198:4000/products/add?name=${bet.person_name}&bet=${bet.time_bet}`)
        .then(response => response.json())
        .then(this.getProducts)
        .catch(err => console.error(err))
  };

  renderBets = ({ bet_id, name}) => <div key={bet_id}>{name}</div>;

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
