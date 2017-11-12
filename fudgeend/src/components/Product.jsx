import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    block: {
        maxWidth: 1000,
        marginLeft: "10px",
        marginRight: "10px"
      },
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name  : "Product Name!",
            tribe : "Tribe Name"
        }
    }

    render() {
        return (
            <div style={styles.block} >
                <Card>
                    <CardHeader
                    title={this.props.name}
                    subtitle={this.props.tribe}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                    <CardActions>
                    <FlatButton label="Ver Mais" />
                    <FlatButton label="Comprar" />
                    </CardActions>
                    <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default Product;