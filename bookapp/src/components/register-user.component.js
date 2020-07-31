import React, { Component } from 'react';
import axios from 'axios';

export default class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            displayName: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeDisplayName(e) {
        this.setState({
            displayName: e.target.value
        });
    }

    // Submit book to database
    onSubmit(e) {
        e.preventDefault();
        
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            displayName: this.state.displayName
        }
        console.log('User added.\n' + newUser.username); 

        axios.post('http://localhost:4001/api/register', newUser)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            password: '',
            displayName: ''
        })
    }

    // Render user form on page
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUserName}
                                required
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Password (8 characters minimum): </label>
                        <input  type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                minlength="8"
                                required
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Display Name (Greeting): </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.displayName}
                                onChange={this.onChangeDisplayName}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}