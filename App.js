import React, {Component} from 'react';
import { LogBox } from 'react-native';
import Router from './source/Router';
import { createStore, applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux'
import reducers from './source/reducers' ;
import thunk from 'redux-thunk';

export default class App extends Component {
    render() {
        const store = createStore(reducers, applyMiddleware(thunk)) ;
        LogBox.ignoreAllLogs();
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}