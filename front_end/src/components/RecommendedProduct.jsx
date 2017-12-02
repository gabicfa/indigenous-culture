import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText,CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import accessProduct from '../actions/product';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
            tribe : "Tribe Name",
            open:false,
            open_pay:false,
            open_pd:false,
        }
    }

    handleBuy = () => {
        accessProduct.declareInterest(this.props.user.id,this.props.info.product_id,
                                        this.props.info.category_id,this.props.info.tribe_id, (res) => {
                                            console.log(res)
                                        })
        this.handleClosePay()
        this.handleClosePaymentDone()
    }
    handleOpen = () => {
        this.setState({open: true});
      };

    handleClose = () => {
        this.setState({open: false});
    };
    handleOpenPaymentDone = () => {
        this.handleClosePay()        
        this.setState({open_pd: true});
      };

    handleClosePaymentDone = () => {
        this.setState({open_pd: false});
    };

    handleOpenPay = () => {
        this.setState({open_pay: true});
      };

    handleClosePay = () => {
        this.setState({open_pay: false});
    };

    render() {
        const actions = [
            <FlatButton label="VEJA PRODUTOS" onClick={this.handleBuy}/>
          ];
        const action_pay = [
            <FlatButton backgroundColor="#a4c639" label="COMPRAR" onClick={this.handleOpenPaymentDone}/>
          ];
        const action_pd = [
            <div>
                <FlatButton label="CANCELAR" onClick={this.handleClosePaymentDone}/>
                <FlatButton backgroundColor="#a4c639" label={"FINALIZAR ( R$"+this.props.info.product_price+")"} onClick={this.handleBuy}/>
            </div>
          ];
        return (
            <div style={styles.block} >
                <div>
                    <Dialog
                    title={ "Finalizar compra de " + this.props.info.product_name }
                    actions={action_pd}
                    modal={false}
                    open={this.state.open_pd}
                    onRequestClose={this.handleClose}
                    >
                    <Card>
                            <CardHeader
                            title={ this.props.info.product_name }
                            subtitle={this.props.info.tribe_name }
                            />
                            <CardMedia>
                                <div style={{height:"200"}}>
                                    <div className="row">
                                        <div className="col s12 m4 l5"><img src={require('../images/products/'+this.props.info.product_name+'.jpg')} alt="photo" style={{alignSelf:"left", height: "150", width: "275"}}/></div>
                                        <div className="col s12 m4 l7" style={{marginTop: -20}}><p>{this.props.info.description}</p></div>  
                                    </div>                          
                                </div>
                            </CardMedia>
                        </Card>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                    title={ "Comprar " + this.props.info.product_name }
                    actions={action_pay}
                    modal={false}
                    open={this.state.open_pay}
                    onRequestClose={this.handleClosePay}
                    autoScrollBodyContent={true}                        
                    >
                        <Card>
                            <CardHeader
                            title={ this.props.info.product_name }
                            subtitle={this.props.info.tribe_name }
                            />
                            <CardMedia>
                                <div style={{height:"200"}}>
                                    <div className="row">
                                        <div className="col s12 m4 l5"><img src={require('../images/products/'+this.props.info.product_name+'.jpg')} alt="photo" style={{alignSelf:"left", height: "150", width: "275"}}/></div>
                                        <div className="col s12 m4 l7" style={{marginTop: -20}}><p>{this.props.info.description}</p></div>  
                                    </div>                          
                                </div>
                            </CardMedia>
                            <CardActions>
                                <FlatButton disabled={true} label={ "R$" + this.props.info.product_price } />
                            </CardActions>
                        </Card>
                        <br/>
                        <Card>
                            <CardHeader
                            title="Informações do cartão"
                            />
                            <CardText>
                                BANDEIRA DO CARTÃO
                                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                    <RadioButton
                                        value="light"
                                        label="VISA"
                                        style={styles.radioButton}
                                    />
                                    <RadioButton
                                        value="not_light"
                                        label="MASTERCARD"
                                        style={styles.radioButton}
                                    />
                                </RadioButtonGroup>
                                NOME NO CARTÃO
                                <br/>
                                <TextField hintText={this.props.user.name}/>
                                <br/>
                                #CARTÃO
                                <br/>
                                <TextField hintText="XXXX.XXXX.XXXX.XXXX"/>
                                <br/>
                                EXPIRAÇÃO
                                <br/>
                                <TextField hintText="MM/YY"/>
                                <br/>
                                CVV
                                <br/>
                                <TextField hintText="*** atrás do cartão"/>
                                <br/>
                                (Esse formulário é apenas um Mock, nenhum dado colocado será armazenado - Não coloque suas informações pessoais)
                            </CardText>
                        </Card>
                    </Dialog>
                </div>
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
                        <FlatButton backgroundColor="#a4c639" label="COMPRAR" onClick={this.handleOpenPay}/>
                        <FlatButton disabled={true} label={ "R$" + this.props.info.product_price } />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default RecommendedProduct;