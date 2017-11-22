import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Product from './Product';
import productAccess from '../actions/product';

class MainItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
        }
    }

    componentWillMount = () => {
        this.getProductList()        
    }

    getProductList = () => {
        productAccess.getProducts((data) => {
            console.log(data.products)
            this.setState({products : data.products})
        })
    }

    render() {

        const getItems = () => this.state.products.map((product) => {
            return <Product name={product.product_name} tribe={product.tribe_name}/>
        });
        
            return (
                <div>
                    <Card>
                        { getItems() }
                    </Card>
                </div>
            );
    }
}
export default MainItemList;