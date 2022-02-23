import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import Reducers from "./Reducers";
import thunk from "redux-thunk";
import Index from "./Index/Redux";

export const store = createStore(
    Reducers,
    applyMiddleware(thunk)
);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root/>, document.getElementById('root'));
}
