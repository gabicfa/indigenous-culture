import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

const styles = {
    block: {
      maxWidth: 150,
      marginLeft: "10px",
      marginRight: "10px"
    },
    block2: {
        maxWidth: 250,
        marginLeft: "10px",
        marginRight: "10px"
      },
    toggle: {
      marginBottom: 16,
    },
    labelStyle: {
     fontSize: 16,
    },
    customWidth: {
        width: 150,
    },
    headline: {
        fontSize: 16,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
      
}

class SettingsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstSlider: 0.5,
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
      };
    

    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title="Filters" subtitle={this.state.message} />
                        <div className='toggle' style={styles.block}>
                            <Toggle
                            label="Activate"
                            style={styles.toggle}
                            labelStyle={styles.labelStyle}                            
                            />
                        </div>
                        <div style={styles.block}>
                            <h2 style={styles.headline}>Tribes</h2>
                            <Checkbox
                            label="Guarani"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Ticuna"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Caingangue"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Macuxi"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Terena"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Guajajara"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Ianomâmi"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Xavanti"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Pataxó"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Potinguara"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                        </div>
                        <div style={styles.block}>
                            <h2 style={styles.headline}>Materiais</h2>
                            <Checkbox
                            label="Vasos"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Pulseiras"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Colares"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Cocares"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Armamento"
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle} 
                            />
                        </div>
                        <div style={styles.block2}>
                            <h2 style={styles.headline}>Preços</h2>
                            <Slider value={this.state.firstSlider} onChange={this.handleFirstSlider} />
                        </div>
                    </Card>
                </div>
            );
    }
}
export default SettingsMenu;