import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Product from './Product';
import productAccess from '../actions/product';
import tribeAccess from '../actions/tribes';
import Preloader from './Preloader';
import categoryAccess from '../actions/category';
import selectedCategories from '../actions/category';

class MainItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            products: [],
            filtered_tribes: [],
            filtered_categories: [],
        }
    }

    componentWillMount = () => {
        this.getProductList()
        tribeAccess.subscribe("tribe",(res) =>{
            this.setState({filtered_tribes : res})
            productAccess.getFilteredProducts(res,this.state.filtered_categories,(data) => {
                console.log(data.products)
                this.setState({products : data.products})
            })
        })
        categoryAccess.subscribe("category",(res) =>{
            this.setState({filtered_categories : res})
            productAccess.getFilteredProducts(this.state.filtered_tribes,res,(data) => {
                console.log(data.products)
                this.setState({products : data.products})
            })
        })   
    }

    getProductList = () => {
        productAccess.getFilteredProducts(this.state.filtered_tribes, this.state.filtered_categories,(data) => {
            this.setState({products : data.products})
            this.setState({loading: false})           
        })
    }

    render() {

        const getItems = () => this.state.products.map((product) => {
            return <Product info={product} user={this.props.user}/>
        });
        
            return (
                <div>
                    <Card>
                        <CardTitle title="Produtos" subtitle={this.state.message} />
                        { this.state.loading ? <Preloader /> :  getItems()  }
                    </Card>
                </div>
            );
    }
}
export default MainItemList;