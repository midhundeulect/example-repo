import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image,TextInput } from 'react-native';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import { getCities } from '../ducks/cities';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            country: props.navigation.getParam('country', null),
            state: props.navigation.getParam('states', null),
            searchResults : [],
            searching: false
        };
        this.renderItem = this.renderItem.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        let cities = [];
        if (
            props.cities.cities &&
            props.cities.cities[state.country] &&
            props.cities.cities[state.country][state.state]
        )
            cities = props.cities.cities[state.country][state.state];
        return {
            cities: cities
        };
    }

    componentDidMount() {
        if (
            !this.props.cities.cities[this.state.country] ||
            !this.props.cities.cities[this.state.country][this.state.state]
        )
            this.props.getCities(this.state.country, this.state.state);
    }

    searchText(text) {
        this.setState({ searching: text.length > 0 });
        let searchResults = [];
        this.props.cities.cities[this.state.country][this.state.state].map(item => {
            if (item.city.includes(text)) 
                searchResults.push(item);
        });
        this.setState({ searchResults: searchResults });
    }

    keyExtractor(item, index) {
        return item.city + index;
    }

    renderItem(row) {
        const { item, index } = row;
        let slno = index + 1;
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Weather', {
                            country: this.state.country,
                            state: this.state.state,
                            city: item.city
                        });
                    }}>
                    <View style={styles.flatListCell}>
                        <View style={styles.cellText}>
                            <Text>
                                {slno}
                                <Text> . </Text>
                                {item.city}
                            </Text>
                        </View>
                        <View style={styles.cellImage}>
                            <Image
                                source={require('../assets/images/red-arrow-graphic-6.jpg')}
                                style={styles.arrowImageStyle}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    emptyCase = () =>{
        return(
            <View style = {{alignItems:"center",paddingTop:200}}>
                <Text>The City List Is Empty</Text>
            </View>  
        )
    }

    render() {
        return (
            <View>
                <View style={styles.toolBar}>
                    <View style={styles.toolBarTextView}>
                        <Text style={styles.toolBarText}>{this.state.state}'s Cities</Text>
                    </View>
                </View>
                <View
                    style={{
                        height: 50,
                        backgroundColor: '#17CDB1',
                        alignItems: 'center'
                    }}>
                    <TextInput
                        placeholder="Search City"
                        style={{ color: 'black' }}
                        onChangeText={text => this.searchText(text)}
                    />
                </View>
                <View>
                    <FlatList
                        data={this.state.searching?this.state.searchResults:this.state.cities}
                        keyExtractor={this.keyExtractor}
                        ListEmptyComponent={this.emptyCase}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        cities: state.cities
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCities: (country, state) => dispatch(getCities(country, state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City);
