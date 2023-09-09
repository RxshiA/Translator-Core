import React, { Component } from "react";
import { generate, count } from "random-words";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      englishWord: "",
      userTranslation: "",
      points: 0,
      feedback: "",
      email: ''
    };
  }

  componentDidMount(){
    fetch("http://localhost:4500/user/profile",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type":"application/json",
            Accept:'application/json',
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            token:localStorage.getItem("token")
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        this.setState({email:data.data.email})
        if(data.data=='token expired'){
            alert("Login Again");
            localStorage.clear();
            window.location.href="./login";
        }
    })
  }

  fetchRandomWord = () => {
    const englishWord = generate();
    const { points } = this.state;
    this.setState({ englishWord, userTranslation: "", feedback: "" });

    fetch("http://localhost:4500/game/"+this.state.email,{
      method:"GET",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:'application/json',
        "Access-Control-Allow-Origin":"*",
      },
    })
    .then((res)=>res.json())
    .then((data) => {
      this.setState({
        points: data[0].points,
      });
      console.log(data);
    });

    fetch("http://localhost:4500/game/"+this.state.email,{
      method:"PUT",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:'application/json',
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        points:points
      })
    })

  };

  checkTranslation = () => {
    const { userTranslation, englishWord, points } = this.state;

    fetch("http://localhost:4500/translate",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:'application/json',
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        text:englishWord,
        language:'si'
      })
    })
    .then((res)=>res.json())
      .then((data) => {
        if (data.translation === userTranslation) {
          // Correct translation
          this.setState({
            points: points + 10,
            feedback: "Correct translation! You earned 10 points.",
          });
        } else {
          // Incorrect translation
          this.setState({
            points: points - 10,
            feedback: "Incorrect translation! You lost 10 points.",
          });
        }
      })
  };

  endGame = () => {
    const { points } = this.state;
    alert("Game ended! Your score is " + points);
    fetch("http://localhost:4500/game/"+this.state.email,{
      method:"PUT",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:'application/json',
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        points:points
      })
    })
  };

  generateLeaderboard = () => {
    fetch("http://localhost:4500/game/",{
      method:"GET",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:'application/json',
        "Access-Control-Allow-Origin":"*",
      },
    })
    .then((res)=>res.json())
    .then((data) => {
      this.setState({
        leaderboard: data,
      });
      console.log(data);
    });
  };

  render() {
    const { englishWord, userTranslation, feedback, points, leaderboard } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            value={englishWord}
            readOnly
            placeholder="English Word"
          />
          <input
            type="text"
            value={userTranslation}
            onChange={(e) => this.setState({ userTranslation: e.target.value })}
            placeholder="Your Translation"
          />
        </div>
        <div>{feedback}</div>
        <div>Points: {points}</div>
        <button onClick={this.checkTranslation}>Check Translation</button>
        <button onClick={this.fetchRandomWord}>Generate New Word</button>
        <button onClick={this.endGame}>End Game</button>
        <br />
        <br /><text onClick={this.generateLeaderboard}>View the Leaderboard here -> </text>
        {leaderboard && (
          <div>
            <h2>Leaderboard</h2>
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item) => (
                  <tr key={item.email}>
                    <td>{item.email}</td>
                    <td>{item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Game;