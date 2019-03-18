import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Country from '../screens/Country';
import State from '../screens/State';
import City from '../screens/City';
import Weather from '../screens/Weather';

const MainNavigator = createStackNavigator(
    {
        Country: {
            screen: Country
        },
        State : {
            screen:State
        },
        City:{
            screen:City
        },
        Weather : {
            screen:Weather
        }
    },
    {
        initialRouteName: 'Country',
        headerMode: 'none'
    }
);

const Router = createAppContainer(MainNavigator);
export default Router;
