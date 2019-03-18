import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationService from './src/common/navigationService';
import Router from './src/common/router';
import Store from './src/common/store';
import FullscreenLoader from './src/components/FullscreenLoader';

class App extends Component {
    render() {
        return (
            <Provider store={Store.store}>
                <PersistGate loading={<FullscreenLoader />} persistor={Store.persistor}>
                    <Router
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
