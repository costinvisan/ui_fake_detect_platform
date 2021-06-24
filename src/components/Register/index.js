import './style.scss';
import Footer from '../Footer';
import { Component } from 'react';
import api from '../../services/Api';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onUsernameChange = u => {
        this.setState({ username: u.target.value });
    };

    onPasswordChange = p => {
        this.setState({ password: p.target.value });
    };

    handleSubmit = (e) => {
        console.log(this.state.registration);
        e.preventDefault();
        let self = this;
        api.post('/u/register', self.state)
            .then(function (response) {
                console.log('user registration success response :: ', response);
                //self.setEmptyRegistrationState();
                //self.handleDlgClose();
                self.props.history.push('/login');
            })
            .catch(function (error) {
                console.log("user registration error response  :: ", error.response);
            });
    };

    render() {
        return (
            <div className="register">
                <button2 type="button" onClick={event => window.location.href = '/login'}>
                    Login here.
                </button2>
                <div className="inner-container">
                    <div className="title">
                        <h9>Register</h9>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div class="container">
                            <label for="email"><b>E-mail</b></label>
                            <input type="text" placeholder="Enter E-mail" name="email" required onChange={this.onUsernameChange} />

                            <label for="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required onChange={this.onPasswordChange} />

                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }


}

export default Register;
