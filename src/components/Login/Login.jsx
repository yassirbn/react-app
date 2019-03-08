import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import {Link} from 'react-router-dom'


class Login extends Component {
    
    constructor(prop){
        super(prop);
        this.state={
            email:"",
            password:""

        };


    }

    componentDidMount() {
        console.log('Did Mount');
        console.log(this.state.email);
    }

    componentWillMount() {
        console.log('will Mount');
    }
    login(){
        console.log('Login');
        console.log(this.state.email);
        console.log(this.state.password);

        axios.post("http://localhost:3002/users/login", {
            email: this.state.email,
            password: this.state.password
        }).then(item=> {
            console.log(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(item)).data)))
            console.log(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(item)).data)).data)
            console.log(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(item)).data)).data)).token)

            localStorage.setItem("token",JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(item)).data)).data)).token)

            //window.location.href="dashboard"

            this.props.history.push('/path')
        })


    }
    render() {
        return(
            <div>
                    < div className = "imgcontainer" >
                    < img src = "https://www.w3schools.com/howto/img_avatar2.png"alt = "Avatar" className = "avatar" />

                    <div className="container">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required onChange={event=>this.setState({email:event.target.value})}/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required onChange={event=>this.setState({password:event.target.value})} />

                            <button onClick={this.login.bind(this)}>Login</button>
                            <label>
                                <input type="checkbox" checked="checked" name="remember"/> Remember me
                            </label>
                    </div>

                    <div className="container">
                        <button type="button"><Link to={'/Register'} >Register</Link></button>
                        <button type="button" className="cancelbtn">Cancel</button>
                        <span className="psw">Forgot <a href="#">password?</a></span>
                    </div>
                    </div>
            </div>

        )

    }

}

export default Login;