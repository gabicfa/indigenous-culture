import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import AutoComplete from 'material-ui/AutoComplete';
import tribeAccess from '../actions/tribes'
import categoryAccess from '../actions/category'
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
            searchTextTribe: '',
            searchTextCategory: '',
            selectedTribes: [],
            selectedCategories: [],
            tribes: [],
            categories: [],
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
      };
    
    componentWillMount = () => {
            tribeAccess.subscribe("tribe_filter", (value) => {
            var selected_list = this.state.selectedTribes
            selected_list.push(value)
            this.setState({selectedTribes : selected_list})
            tribeAccess.emitValue("tribe", this.state.selectedTribes)
            // this.setState({searchTextTribe: ""})
        })
        tribeAccess.getTribes((data) => {
            var tribe_list = []
            data.forEach((item) => {
                tribe_list.push(item[0])
            })
            this.setState({tribes: tribe_list})
        })
        categoryAccess.getCategory((data) => {
            var category_list = []
            data.forEach((item) => {
                category_list.push(item[0])
            })
            this.setState({categories: category_list})
        })
        
    }
    handleUpdateInputTribe = (searchText) => {
        this.setState({
            searchTextTribe: searchText,
        });
    }
    
    handleUpdateInputCategory = (searchText) => {
        this.setState({
            searchTextCategory: searchText,
        });
    }

    handleAddTribes = () => {
        var selected_list = this.state.selectedTribes
        selected_list.push(this.state.searchTextTribe)
        this.setState({selectedTribes : selected_list})
        tribeAccess.emitValue("tribe", this.state.selectedTribes)
    }
    handleRequestDeleteTribe = (text) => {
        var selected_list = this.state.selectedTribes
        var index = selected_list.indexOf(text)
        selected_list.splice(index, 1)
        this.setState({selectedTribes : selected_list})
        tribeAccess.emitValue("tribe", this.state.selectedTribes)
    }

    handleAddCategory = () => {
        var selected_list = this.state.selectedCategories
        selected_list.push(this.state.searchTextCategory)
        this.setState({selectedCategories : selected_list})
        categoryAccess.emitValue("category", this.state.selectedCategories)
    }
    handleRequestDeleteCategory = (text) => {
        var selected_list = this.state.selectedCategories
        var index = selected_list.indexOf(text)
        selected_list.splice(index, 1)
        this.setState({selectedCategories : selected_list})
        categoryAccess.emitValue("category", this.state.selectedCategories)
    }
      
    handleTouchTap = () => {
    alert('You clicked the Chip.');
    }

    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title="Filtros" subtitle={this.state.message} />
                        <div style={styles.block2}>
                            <h2 style={styles.headline}>Tribos</h2>
                            {
                                this.state.tribes.length > 0 ?
                                <div>
                                <AutoComplete
                                floatingLabelText="Tribos"
                                searchText={this.state.searchText}
                                onUpdateInput={this.handleUpdateInputTribe}
                                fullWidth={true}                
                                menuProps={menuProps}                                
                                openOnFocus={true}
                                dataSource={this.state.tribes} />
                                <FlatButton
                                    label="Adicionar"
                                    primary={true}
                                    keyboardFocused={true}
                                    onClick={this.handleAddTribes}
                                />
                                {this.state.selectedTribes.map((tribe) => 
                                    <Chip
                                    onRequestDelete={this.handleRequestDeleteTribe}
                                    onClick={this.handleTouchTap}
                                    style={styles.chip}>
                                    {tribe}
                                  </Chip>
                                )} </div> : null
                            }
                        </div>
                        <div style={styles.block2}>
                        <h2 style={styles.headline}>Categorias</h2>
                        {
                            this.state.tribes.length > 0 ?
                            <div>
                            <AutoComplete
                            floatingLabelText="Categorias"
                            searchText={this.state.searchTextCategory}
                            onUpdateInput={this.handleUpdateInputCategory}
                            fullWidth={true}                
                            menuProps={menuProps}                                
                            openOnFocus={true}
                            dataSource={this.state.categories} />
                            <FlatButton
                                label="Adicionar"
                                primary={true}
                                keyboardFocused={true}
                                onClick={this.handleAddCategory}
                            />
                            {this.state.selectedCategories.map((tribe) => 
                                <Chip
                                onRequestDelete={this.handleRequestDeleteCategory}
                                onClick={this.handleTouchTap}
                                style={styles.chip}>
                                {tribe}
                              </Chip>
                            )} </div> : null
                        }
                    </div>
                    <br/>
                    </Card>
                </div>
            );
    }
}
export default SettingsMenu;