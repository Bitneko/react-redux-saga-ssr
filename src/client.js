import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import sagas from "./redux/sagas";

import Layout from "./components/Layout";
import createStore from "./store";

const { store, history } = createStore();

const jsx = (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <Layout />
        </ConnectedRouter>
    </Provider>
);
store.runSaga( sagas );

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
