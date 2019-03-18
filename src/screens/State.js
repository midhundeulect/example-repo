import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import { getStates } from '../ducks/states';

class State extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: props.navigation.getParam('country', null),
            states: []
        };

        this.renderItem = this.renderItem.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            states: props.states
        };
    }

    componentDidMount() {
        
        if (!this.props.states.states[this.state.country]) this.props.getStates(this.state.country);
    }

    keyExtractor(item, index) {
        return item.state + index;
    }

    renderItem(row) {
        const { item, index } = row;
        let slno = index + 1;
        return (
            <View>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('City', {
                            states: item.state,
                            country: this.state.country
                        })
                    }>
                    <View style={styles.flatListCell}>
                        <View style={styles.cellText}>
                            <Text>
                                {slno}
                                <Text> . </Text>
                                {item.state}
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
                        <Text style={styles.toolBarText}>{this.state.country}'s States</Text>
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
                        data={this.state.states.states[this.state.country]}
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
        states: state.states
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStates: country => dispatch(getStates(country))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(State);
