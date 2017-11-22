import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Product from './Product';
import productAccess from '../actions/product';
import tribeAccess from '../actions/tribes';

class MainItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            filter: [],
        }
    }

    componentWillMount = () => {
        this.getProductList()
        tribeAccess.subscribe("tribe",(res) =>{
            this.setState({filter : res})
            productAccess.getFilteredProducts(res,(data) => {
                console.log(data.products)
                this.setState({products : data.products})
            })
        })   
    }

    getProductList = () => {
        productAccess.getFilteredProducts(this.state.filter,(data) => {
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
                        <CardTitle title="Recomended Products" subtitle={this.state.message} />
                        { getItems() }
                    </Card>
                </div>
            );
    }
}
export default MainItemList;