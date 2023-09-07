import React, { Component } from 'react'

export default class Home extends Component {
    render(){
        return(
            <div>
                <h1>Home</h1>
                <button onClick={()=>{window.location.href="./profile"}}>
                    My Profile
                </button>
            </div>
        )
    }
}