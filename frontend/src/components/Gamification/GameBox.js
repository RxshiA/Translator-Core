import React, { Component }  from "react";
import { generate, count } from "random-words";

class GameBox extends Component {

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

  render() {
    const { englishWord, userTranslation, feedback, points } = this.state;

    return (
      <>
        <div className="w-full xl px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                    Current 
                  </h6>
                  <h2 className="text-blueGray-700 text-xl font-semibold">
                    Points : {points}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-7 flex-auto">
              <div className="">
                <div className="flex justify-between items-center mb-4">
                  <input
                    className="w-5/12 h-12 p-2 border rounded"
                    type="text"
                    value={englishWord}
                    readOnly
                    placeholder="English Word"
                  />
                  <input
                    className="w-5/12 h-12 p-2 border rounded"
                    type="text"
                    value={userTranslation}
                    onChange={(e) => this.setState({ userTranslation: e.target.value })}
                    placeholder="Your Translation"
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <button 
                    className="ml-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={this.checkTranslation}>Check Translation</button>
                  <div>{feedback}</div>
                  <button 
                    className="mr-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={this.fetchRandomWord}>Generate New Word</button>
                </div><br/>
                <div className="text-center">
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block"
                    onClick={this.endGame}>End Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GameBox;