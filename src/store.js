import {createStore, combineReducers, compose} from 'redux';

export const initialiseApp = () => ({
    type: 'INITIALISE_APP',
});

const appReducer = (state = false, action) => {
    switch (action.type) {
        case 'INITIALISE_APP':
            return ({
                initialised: true 
            });
        default: return state;
    }
};

const reducer = combineReducers({
    app: appReducer,
});

const reduxDevtools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = reduxDevtools || compose;

export default (initialState) => createStore(
    reducer,
    initialState,
    composeEnhancers
);