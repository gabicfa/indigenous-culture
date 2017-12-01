import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Tribe from './Tribe';
import Preloader from './Preloader';
import productAccess from '../actions/product';
import emitter from '../actions/category';

class RecommendedTribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            other: false,
            message: '',
            tribes: [],
        }
    }

    componentDidMount() {
        this.getProductList()
    }

    getProductList = () => {
        productAccess.getRecommendedTribe(this.props.user.id,(data) => {
            console.log("aqui")
            this.setState({tribes : [data.tribes]})
            this.setState({loading: false})
        })
    }

    render() {

        const getItems = () => this.state.tribes.map((tribe) => {
            return <Tribe info={tribe} user={this.props.user} />
        });

            return (
                <div>
                    <Card>
                        <CardTitle title="Tribo Recomendada" subtitle={this.state.message} />
                        <div className='recipesItems'>
                            { this.state.loading ? <Preloader /> :  getItems()  }
                        </div>
                    </Card>
                </div>
            );
    }
}
export default RecommendedTribe;