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
            cat_products: [],
            most_products: [],
        }
    }
    
    componentWillMount() {
        this.getProductList()
    }
    
    getProductList = () => {
        productAccess.getRecommendedMost(this.props.user.id,(data) => {
            this.setState({most_products : [data.products]})
            this.setState({loading: false})
        })
        productAccess.getRecommendedByCategory(this.props.user.id,(data) => {
            this.setState({cat_products : [data.products]})
            this.setState({loading: false})
        })
        productAccess.getRecommendedByProduct(this.props.user.id,(data) => {
            this.setState({products : [data.products]})
            this.setState({loading: false})
        })
    }

    render() {

        const getItems = () => this.state.products.map((product) => {
            return <RecommendedProduct info={product} user={this.props.user} recommendation={"Recomendação por produto"}/>
        });
        const getCatItems = () => this.state.cat_products.map((product) => {
            return <RecommendedProduct info={product} user={this.props.user} recommendation={"Recomendação por categoria"}/>
        });
        const getMostItems = () => this.state.most_products.map((product) => {
            return <RecommendedProduct info={product} user={this.props.user} recommendation={"MAIS VENDIDO!"}/>
        });

            return (
                <div>
                    <Card>
                        <CardTitle title="Produtos Recomendados" subtitle={this.state.message} />
                        <div className='recipesItems'>
                        <div className="row">
                    <div className="col s12 m4 l4">{ this.state.loading ? <Preloader /> :  getItems()  }</div>
                    <div className="col s12 m4 l4">
                    { this.state.loading ? <Preloader /> :  getCatItems()  }
                    </div>
                    <div className="col s12 m4 l4">
                    { this.state.loading ? <Preloader /> :  getMostItems()  }
                    </div>
                    </div>    
                        </div>
                    </Card>
                </div>
            );
    }
}
export default RecommendedProducts;