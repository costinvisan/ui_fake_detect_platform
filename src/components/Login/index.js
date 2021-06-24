import React, { Component } from 'react';
import './style.scss';
import Footer from '../Footer/index';
import api from '../../services/Api/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        let self = this;
        api.post('/u/login', self.state)
            .then(function (response) {
                //---set Authorization header ---

                //token store in session storage
                localStorage.setItem('user_id', response.data.ID)
                self.props.history.push('/check');
            })
            .catch(function (error) {
                console.log("login error response :: ", error);
            });
    }

    onUsernameChange = u => {
        this.setState({ username: u.target.value });
    };

    onPasswordChange = p => {
        this.setState({ password: p.target.value });
    };
    render() {
        return (
            <div className="login">
                <button2 type="button" onClick={event => window.location.href = '/register'}>
                    Register here.
                </button2>
                <div className="title">
                    <h8>Login</h8>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div class="container">
                        <label for="email"><b>E-mail</b></label>
                        <input type="text" placeholder="Enter E-mail" name="email" required onChange={this.onUsernameChange} />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required onChange={this.onPasswordChange} />

                        <button type="submit">Login</button>
                    </div>
                </form>
                <Footer />
            </div>
        );
    };


}

export default Login;
