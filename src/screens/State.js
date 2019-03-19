import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import { getStates } from '../ducks/states';

class State extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: props.navigation.getParam('country', null),
            states: [],
            searchResults: [],
            searching: false
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

    searchText(text) {
        this.setState({ searching: text.length > 0 });
        let searchResults = [];
        this.state.states.states[this.state.country].map(item => {
            if (item.state.includes(text)) searchResults.push(item);
        });
        this.setState({ searchResults: searchResults });
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

    emptyCase = () => {
        if (this.state.states.loading) return null;
        return (
            <View style={{ alignItems: 'center', paddingTop: 200 }}>
                <Text>The State List Is Empty</Text>
            </View>
        );
    };

    render() {
        return (
            <View>
                <View style={styles.toolBar}>
                    <View style={styles.toolBarTextView}>
                        <Text style={styles.toolBarText}>{this.state.country}'s States</Text>
                    </View>
                </View>
                <View
                    style={{
                        height: 50,
                        backgroundColor: '#17CDB1',
                        alignItems: 'center'
                    }}>
                    <TextInput
                        placeholder="Search State"
                        style={{ color: 'black' }}
                        onChangeText={text => this.searchText(text)}
                    />
                </View>
                <View>
                    <FlatList
                        data={
                            this.state.searching
                                ? this.state.searchResults
                                : this.state.states.states[this.state.country]
                        }
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
