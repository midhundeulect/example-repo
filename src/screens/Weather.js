import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import { getWeather } from '../ducks/weather';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            country: props.navigation.getParam('country', null),
            state: props.navigation.getParam('state', null),
            city: props.navigation.getParam('city', null)
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            weather: props.weather.data
        };
    }

    componentDidMount() {
        this.props.getWeather(this.state.country, this.state.state, this.state.city);
    }

    getImage() {
        let imageName = '01d';
        if (this.state.weathers) imageName = this.state.weathers.current.weather.ic;
        const images = {
            '01d': require('../assets/images/01d.png'),
            '01n': require('../assets/images/01n.png'),
            '02d': require('../assets/images/02d.png'),
            '02n': require('../assets/images/02n.png'),
            '03d': require('../assets/images/03d.png'),
            '04d': require('../assets/images/04d.png'),
            '09d': require('../assets/images/09d.png'),
            '10d': require('../assets/images/10d.png'),
            '10n': require('../assets/images/10n.png'),
            '11d': require('../assets/images/11d.png'),
            '13d': require('../assets/images/13d.png'),
            '50d': require('../assets/images/50d.png')
        };
        return images[imageName];
    }

    render() {
        if (!this.state.weather) return null;
        return (
            <View>
                <View style={styles.toolBar}>
                    <Text style={styles.toolBarText}>Weather of {this.state.city}</Text>
                </View>
                <View>
                    <Text style={styles.flatListCell}>
                        Time Stamp : {this.state.weather.current.weather.ts}
                    </Text>
                    <Text style={styles.flatListCell}>
                        Temperature in Celcious : {this.state.weather.current.weather.tp}
                    </Text>
                    <Text style={styles.flatListCell}>
                        Humidity : {this.state.weather.current.weather.hu}
                    </Text>
                    <Text style={styles.flatListCell}>
                        Wind Speed : {this.state.weather.current.weather.ws}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', padding: 20 }}>
                    <Image source={this.getImage()} style={{ width: 200, height: 200 }} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weather
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getWeather: (country, state, city) => dispatch(getWeather(country, state, city))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);
