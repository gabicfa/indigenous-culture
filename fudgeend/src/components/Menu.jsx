import React, { Component } from 'react';
import MainItemList from './MainItemList';
import SettingsMenu from './SettingsMenu';
import RecomendedProducts from './RecomendedProducts';


class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
            return (
                <div className="row">
                    <div className="col s12 m4 l2"><SettingsMenu /></div>
                    <div className="col s12 m4 l7"><MainItemList /></div>
                    <div className="col s12 m4 l3"><RecomendedProducts /></div>
                </div>
            );
        }
}

export default componentName;