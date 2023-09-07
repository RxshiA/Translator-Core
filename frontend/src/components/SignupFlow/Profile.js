import React, { Component } from 'react'

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            userData: ''
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
            console.log(data, "userData");
            this.setState({userData:data.data})
            if(data.data=='token expired'){
                alert("Login Again");
                localStorage.clear();
                window.location.href="./login";
            }
        })
    }

    logOut=()=>{
        localStorage.clear();
        window.location.href="./login";
    }

    render(){
        return(
            <div>
                <h1>Profile</h1>
                <h3>First Name: {this.state.userData.first_name}</h3>
                <h3>Last Name: {this.state.userData.last_name}</h3>
                <h3>Email: {this.state.userData.email}</h3><br/>
                <button onClick={this.logOut}>
                    Log Out
                </button>
            </div>
        )
    }
}