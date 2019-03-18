import React, { Component } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { COLORS } from '../styles/colors';
import { common } from '../styles/common';

class FullscreenLoader extends Component {
    render() {
        return (
            <SafeAreaView style={common.centeredContainer}>
                <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
                <ActivityIndicator color={COLORS.black} size={'large'} />
            </SafeAreaView>
        );
    }
}

export default FullscreenLoader;
