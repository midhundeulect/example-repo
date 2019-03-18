import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import { getCities } from '../ducks/cities';

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

    render() {
        return (
            <View>
                <View style={styles.toolBar}>
                    <View style={styles.toolBarTextView}>
                        <Text style={styles.toolBarText}>{this.state.state}'s Cities</Text>
                    </View>
                    <View style={styles.toolBarImageView}>
                        <Image
                            source={require('../assets/images/plus-hi.png')}
                            style={styles.plusImageStyle}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={this.state.cities}
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
        getCities: (country, state) => dispatch(getCities(country, state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City);
