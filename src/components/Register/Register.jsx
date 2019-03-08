import React, { Component } from 'react';
import './Register.css';
import axios from "axios";


class Register extends Component {

    constructor(prop){
        super(prop);
        this.state={
            firstName:"",
            lastName:"",
            phone:"",
            email:"",
            password:""


        };

    }

    componentDidMount() {
        console.log('Did Mount');
    }

    componentWillMount() {
        console.log('will Mount');
    }
    Register(){
        console.log('Login');
        console.log(this.state.email);
        console.log(this.state.password);

        axios.post("http://localhost:3002/users/add", {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }).then(data=> {
            console.log("data", data);
            window.location.href="login"
        })


    }

    render() {
        return(
            <div>
                < div className = "imgcontainer" >
                    < img src = "https://www.w3schools.com/howto/img_avatar2.png"alt = "Avatar" className = "avatar" />

                    <div className="container">
                        <label htmlFor="uname"><b>First Name</b></label>
                        <input type="text" placeholder="Enter First Name" name="fame" required onChange={event=>this.setState({firstName:event.target.value})} />

                        <label htmlFor="uname"><b>Last Name</b></label>
                        <input type="text" placeholder="Enter First Name" name="lame" required onChange={event=>this.setState({lasttName:event.target.value})}/>

                        <label htmlFor="uname"><b>email</b></label>
                        <input type="text" placeholder="Enter First Name" name="lame" required onChange={event=>this.setState({email:event.target.value})}/>

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Last Password" name="psw" required onChange={event=>this.setState({password:event.target.value})}/>

                        <button onClick={this.Register.bind(this)}>Sign in</button>
                    </div>

                    <div className="container">
                        <button type="button" className="cancelbtn">Login</button>
                    </div>
                </div>
            </div>

        )

    }

}

export default Register;