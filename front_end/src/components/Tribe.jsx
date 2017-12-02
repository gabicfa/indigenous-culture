import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText,CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
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
        this.state = {
            open: false,
        }
    }

    handleBuy = () => {
        // alert("Congratulations! You've Donated to " + this.props.info.tribe_name)
        console.log(this.props.info.tribe_name)
        tribeAccess.emitValue("tribe_filter", this.props.info.tribe_name)
        this.handleClose()
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

      
    render() {
        const actions = [
            <FlatButton label="VEJA PRODUTOS" onClick={this.handleBuy}/>
          ];
        return (
            <div style={styles.block} >
                      <div>
                        <Dialog
                        title={ this.props.info.tribe_name }
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}                        
                        >
                        <Card>
                            <CardMedia>
                                <img src={require('../images/tribes/'+this.props.info.tribe_name+'.jpg')} alt="photo" />
                            </CardMedia>
                            <CardText>
                                {this.props.info.description}
                                {this.props.info.extra_description}
                            </CardText>
                        </Card>
                        </Dialog>
                    </div>
                <Card>
                    <CardHeader
                    title={ this.props.info.tribe_name }
                    subtitle={"Tronco Linguístico " + this.props.info.tribe_origin +  " - Estado: " + this.props.info.tribe_state}
                    avatar={require("../images/amazonas.jpg")}
                    />
                    <CardMedia>
                        <img src={require('../images/tribes/'+this.props.info.tribe_name+'.jpg')} alt="photo" />
                    </CardMedia>
                    <CardText>
                        {this.props.info.description}
                    </CardText>
                    <CardActions>
                        <FlatButton label="VEJA PRODUTOS" onClick={this.handleBuy}/>
                        <FlatButton label="CONHEÇA" onClick={this.handleOpen} />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Tribe;