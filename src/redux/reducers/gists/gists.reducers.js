import { FETCH_GISTS__SUCCEEDED } from "./gists.actions";

const initialState = [];

const gists = ( previousState = initialState, { type, payload } ) => {
    switch ( type ) {
        case FETCH_GISTS__SUCCEEDED:
            return payload.gists;
        default:
            return previousState;
    }
};

export default gists;
