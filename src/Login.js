import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            apiKey: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //LOGIN API
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('https://dev.teledirectasia.com:3092/login', this.state)
            .then(response => {
                //console.log(response)
                var users = [response.data.token.name, response.data.image, response.data.token.token]
                if (response.status == '200') {
                    this.props.history.push({
                        pathname: '/dashboard',
                        data: users // data array of objects
                    })
                } else {
                    console.log("Login failed");
                }
            })
            .catch(error => {
                console.log(error)
                alert('Incorrect API Key');
            })
    }

    render() {
        const { name, apiKey } = this.state
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1> Login</h1><br></br>
                    <form onSubmit={this.submitHandler}>
                        <div className="id">
                            <input type="text" placeholder="ID" name="apiKey" value={apiKey} onChange={this.changeHandler} required></input>
                        </div>
                        <div className="name">
                            <input type="text" placeholder="Name" name="name" value={name} onChange={this.changeHandler} required></input>
                        </div>
                        <div className="loginPage">
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login