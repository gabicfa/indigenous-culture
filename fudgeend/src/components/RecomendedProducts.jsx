import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Product from './Product';



class RecomendedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
        }
    }


    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title="Recomended Products" subtitle={this.state.message} />
                        <div className='recipesItems'>
                            <Product name="Product" tribe="Tribo"/>
                            <Product name="Product" tribe="Tribo"/>
                            <Product name="Product" tribe="Tribo"/>
                            <Product name="Product" tribe="Tribo"/>
                        </div>
                    </Card>
                </div>
            );
    }
}
export default RecomendedProducts;