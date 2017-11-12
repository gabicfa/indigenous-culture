import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import Subheader from 'material-ui/Subheader';
import auth from '../actions/auth.js'

var user = {
    name : "Gabi Almeida"
};

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">INDIAN CULTURE</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {user === null ? null :
                                <div>
                                    <li>{user.name}</li>
                                    <li><a onClick={this.logoout}>Sign Out</a></li>
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