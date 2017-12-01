import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RecommendedProduct from './RecommendedProduct';
import Preloader from './Preloader';
import productAccess from '../actions/product';

class RecommendedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            message: '',
            products: [],
        }
    }
    
    componentWillMount() {
        this.getProductList()
    }
    
    getProductList = () => {
        productAccess.getRecommendedProducts(this.props.user.id,(data) => {
            this.setState({products : [data.products]})
            this.setState({loading: false})
        })
    }

    render() {

        const getItems = () => this.state.products.map((product) => {
            return <RecommendedProduct info={product} user={this.props.user}/>
        });

            return (
                <div>
                    <Card>
                        <CardTitle title="Produtos Recomendados" subtitle={this.state.message} />
                        <div className='recipesItems'>
                            { this.state.loading ? <Preloader /> :  getItems()  }
                        </div>
                    </Card>
                </div>
            );
    }
}
export default RecommendedProducts;