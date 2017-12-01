import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText,CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import accessProduct from '../actions/product';

const styles = {
    block: {
        maxWidth: 1000,
        marginLeft: "10px",
        marginRight: "10px"
      },
}

class RecommendedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name  : "Product Name!",
            tribe : "Tribe Name"
        }
    }

    handleBuy = () => {
        alert("Congratulations! Product was bought!")
        accessProduct.declareInterest(this.props.user.id,this.props.info.product_id,
                                        this.props.info.category_id,this.props.info.tribe_id, (res) => {
                                            console.log(res)
                                        })
    }

    render() {
        return (
            <div style={styles.block} >
                <Card>
                    <CardHeader
                    title={ this.props.info.product_name }
                    subtitle={this.props.info.tribe_name }
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                    <CardMedia>
                            <img src={require('../images/products/'+this.props.info.product_name+'.jpg')} alt="photo" style={{alignSelf:"left", height: "200", width: "350"}}/>
                    </CardMedia>
                    <CardText expandable={true}>
                        <p>{this.props.info.description}</p>
                    </CardText>
                    <CardActions>
                        <FlatButton label={ "R$" + this.props.info.product_price } />
                        <FlatButton label="VEJA MAIS"/>
                        <FlatButton label="COMPRAR" onClick={this.handleBuy}/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default RecommendedProduct;