import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from '../styles/styles';
import {connect} from 'react-redux'
import {getCities} from '../ducks/cities'

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            country: props.navigation.getParam('country', null),
            state: props.navigation.getParam('states', null)
        };
        this.renderItem = this.renderItem.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            cities: props.cities
        };
    }

    componentDidMount() {
        //console.log(this.state.country);
        //console.log(this.state.state);
        this.props.getCities(this.state.country,this.state.state);
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
                        {/* <View style={styles.cellImage}>
                            <Image
                                source={require('../image/red-arrow-graphic-6.jpg')}
                                style={styles.arrowImageStyle}
                            />
                        </View> */}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View style={styles.toolBar}>
                    <View style={styles.toolBarTextView}>
                        <Text style={styles.toolBarText}>
                            {this.state.state}'s Cities
                        </Text>
                    </View>
                    {/* <View style={styles.toolBarImageView}>
                        <Image
                            source={require('../image/plus-hi.png')}
                            style={styles.plusImageStyle}
                        />
                    </View> */}
                </View>
                <View>
                    <FlatList
                        data={this.state.cities.cities}
                        keyExtractor={this.keyExtractor}
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
        getCities: (country,state) => dispatch(getCities(country,state))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(City);
