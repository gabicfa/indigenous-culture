import React, { Component } from 'react';
import MainItemList from './MainItemList';
import SettingsMenu from './SettingsMenu';
import RecommendedProducts from './RecommendedProducts';
import RecommendedTribe from './RecommendedTribe';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recommended_tribe: true,
            user: {},
        };
    }

    componentWillMount() {
        this.setState({user:JSON.parse(localStorage.getItem("user"))});  
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    render() {
            return (
                <div className="row">
                    <div className="col s12 m4 l2"><SettingsMenu /></div>
                    <div className="col s12 m4 l7">
                        <RecommendedProducts user={this.state.user}/>
                        <MainItemList user={this.state.user}/></div>
                    <div className="col s12 m4 l3">
                        <RecommendedTribe user={this.state.user}/>
                    </div>
                </div>
            );
        }
}

export default Menu;