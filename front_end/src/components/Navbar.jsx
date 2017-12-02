import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import Subheader from 'material-ui/Subheader';
import auth from '../actions/auth.js';
import emitter from '../actions/category';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            setting: false,
            err: '',
            err_email: '',
            err_name: '',
            err_password: '',
            dialogState: 'login',
            textFields: {
                name: '',
                email: '',
                password: '',
            },
        }
    }
    
    componentWillMount() {
        emitter.subscribe("login", (user) => {
            this.setState({user: user})
        })
        this.setState({user: JSON.parse(localStorage.getItem("user"))});
    }

    logout = () => {
        localStorage.removeItem('user');
        this.setState({user: null})
        this.props.loggedOut();
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">
                        <img src={require('../images/logo.jpeg')} alt="photo" height="63" width="150" />
                        </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.state.user === null ? null :
                                <div>
                                    <li>{this.state.user.name}</li>
                                    <li><a onClick={this.logout}>Sign Out</a></li>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

export default Navbar;