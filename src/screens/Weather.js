import React, { Component } from 'react';
import { View, Text, FlatList ,Image} from 'react-native';
import {
    STATE,
    COUNTRY,
    BASE_URL,
    KEY,
    CITY,
    CITYY
} from '../common/constants';
import styles from '../styles/styles';


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

    componentDidMount() {
        this.getWeather();
    }

    getWeather = async () => {
        const param = [
            `${CITY}=${this.state.city}`,
            `${STATE}=${this.state.state}`,
            `${COUNTRY}=${this.state.country}`,
            `${KEY}`
        ].join('&');

        fetch(`${BASE_URL}${CITYY}?${param}`)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({ weather: responseJson.data });
                console.log(`${BASE_URL}${CITYY}?${param}`);
            });
    };

    getImage(){
        let imageName = "01d";
        if (this.state.weather) imageName = this.state.weather.current.weather.ic;
        const images = {
            '01d':require("../image/01d.png"),
            '01n':require("../image/01n.png"),
            '02d':require("../image/02d.png"),
            '02n':require("../image/02n.png"),
            '03d':require("../image/03d.png"),
            '04d':require("../image/04d.png"),
            '09d':require("../image/09d.png"),
            '10d':require("../image/10d.png"),
            '10n':require("../image/10n.png"),
            '11d':require("../image/11d.png"),
            '13d':require("../image/13d.png"),
            '50d':require("../image/50d.png")
        }
        return images[imageName]
    }

    render() {
        console.log(this.state);
        if (!this.state.weather) return null;
        return (
            <View>
                <View style={styles.toolBar}>
                    <Text style={styles.toolBarText}>
                        Weather of {this.state.city}
                    </Text>
                </View>
                <View>
                    <Text style = {styles.flatListCell}>
                        Time Stamp  :  {this.state.weather.current.weather.ts}
                    </Text>
                    <Text style = {styles.flatListCell}>
                        Temperature in Celcious  :  {this.state.weather.current.weather.tp}
                    </Text>
                    <Text style = {styles.flatListCell}>
                        Humidity  :  {this.state.weather.current.weather.hu}
                    </Text>
                    <Text style = {styles.flatListCell}>
                        Wind Speed  :  {this.state.weather.current.weather.ws}
                    </Text>
                </View>
                <View style={{alignItems:"center",padding:20}}>
                    <Image source = {this.getImage()} style = {{width:200,height:200}}/>    
                </View>
            </View>
        );
    }
}

export default Weather;
