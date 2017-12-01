import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText,CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import accessProduct from '../actions/product';
import tribeAccess from '../actions/tribes'

const styles = {
    block: {
        maxWidth: 1000,
        marginLeft: "10px",
        marginRight: "10px"
      },
}

class Tribe extends Component {
    constructor(props) {
        super(props);
    }

    handleBuy = () => {
        // alert("Congratulations! You've Donated to " + this.props.info.tribe_name)
        console.log(this.props.info.tribe_name)
        tribeAccess.emitValue("tribe_filter", this.props.info.tribe_name)
    }

    render() {
        return (
            <div style={styles.block} >
                <Card>
                    <CardHeader
                    title={ this.props.info.tribe_name }
                    subtitle={"Origin in " + this.props.info.tribe_origin +  " - State of " + this.props.info.tribe_state}
                    avatar={require("../images/amazonas.jpg")}
                    />
                    <CardMedia>
                        <img src={require('../images/tribes/'+this.props.info.tribe_name+'.jpg')} alt="photo" />
                    </CardMedia>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="CONHEÇA" onClick={this.handleBuy}/>
                        <FlatButton label="DOE"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Tribe;