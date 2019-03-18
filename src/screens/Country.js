import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';
import { getCountries } from '../ducks/countries';
import { connect } from 'react-redux';

class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        };
        this.renderItem = this.renderItem.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            countries: props.countries
        };
    }

    componentDidMount() {
        if (this.props.countries.countries.length === 0) this.props.getCountries();
    }

    keyExtractor(item, index) {
        return item.country + index;
    }

    renderItem(row) {
        const { item, index } = row;
        let slno = index + 1;
        return (
            <View>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('State', {
                            country: item.country
                        })
                    }>
                    <View style={styles.flatListCell}>
                        <View style={styles.cellText}>
                            <Text>
                                {slno}
                                <Text> . </Text>
                                {item.country}
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
                        <Text style={styles.toolBarText}>Country List</Text>
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
                        showsVerticalScrollIndicator={false}
                        data={this.state.countries.countries}
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
        countries: state.countries
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCountries: () => dispatch(getCountries())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Country);
