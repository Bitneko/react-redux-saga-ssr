import { createBrowserHistory, createMemoryHistory } from "history";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware, { END } from "redux-saga";
import gists from "./redux/reducers/gists/gists.reducers";

export const initialiseApp = () => ( {
    type: "INITIALISE_APP",
} );

const appReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALISE_APP":
            return ( {
                initialised: true,
            } );
        default: return state;
    }
};

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers( {
    app: appReducer,
    gists,
} );

const windowDefined = typeof window !== "undefined";

const reduxDevtools = windowDefined && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = reduxDevtools || compose;

export const createHistory = ( url ) =>
    ( windowDefined ? createBrowserHistory() : createMemoryHistory( { initialEntries: [ url ] } ) );

export default ( url = "/" ) => {
    const history = createHistory( url );
    const initialState = windowDefined ? ( window.REDUX_DATA || {} ) : {};
    const store = createStore(
        connectRouter( history )( reducer ),
        initialState,
        composeEnhancers( applyMiddleware( routerMiddleware( history ), sagaMiddleware ) ),
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch( END );

    return {
        store,
        history,
    };
};
