import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import AutoComplete from 'material-ui/AutoComplete';
import tribeAccess from '../actions/tribes'
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton'

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
    chip: {
        margin: 4,
      },
      
}

const menuProps = {
    desktop: true,
    disableAutoFocus: true,
  };
  
class SettingsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstSlider: 0.5,
            searchText: '',
            selected: [],
            tribes: [],

        };
    }

    handleChange = (event, index, value) => this.setState({value});

    handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
      };
    
    componentWillMount = () => {
        tribeAccess.getTribes((data) => {
            var tribe_list = []
            data.forEach((item) => {
                tribe_list.push(item[0])
            })
            this.setState({tribes: tribe_list})
        })
    }
    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    }
    
    handleAdd = () => {
        var selected_list = this.state.selected
        selected_list.push(this.state.searchText)
        this.setState({selected : selected_list})
        tribeAccess.emitValue("tribe", this.state.selected)
    }

     handleRequestDelete = () => {
        var selected_list = this.state.selected
        var index = selected_list.indexOf(this.state.searchText)
        selected_list.splice(index, 1)
        this.setState({selected : selected_list})
        tribeAccess.emitValue("tribe", this.state.selected)
    }
      
      handleTouchTap = () => {
        alert('You clicked the Chip.');
      }

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
                        <div style={styles.block2}>
                            <h2 style={styles.headline}>Tribes</h2>
                            {
                                this.state.tribes.length > 0 ?
                                <div>
                                <AutoComplete
                                floatingLabelText="Tribes"
                                searchText={this.state.searchText}
                                onUpdateInput={this.handleUpdateInput}
                                fullWidth={true}                
                                menuProps={menuProps}                                
                                filter={AutoComplete.caseInsensitiveFilter}
                                openOnFocus={true}
                                dataSource={this.state.tribes} />
                                <FlatButton
                                    label="Add"
                                    primary={true}
                                    keyboardFocused={true}
                                    onClick={this.handleAdd}
                                />
                                {this.state.selected.map((tribe) => 
                                    <Chip
                                    onRequestDelete={this.handleRequestDelete}
                                    onClick={this.handleTouchTap}
                                    style={styles.chip}>
                                    {tribe}
                                  </Chip>
                                )} </div> : null
                            }
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