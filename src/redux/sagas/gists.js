import { call, put, takeLatest } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import {
    FETCH_GISTS_REQUESTED,
    FETCH_GISTS__SUCCEEDED,
    FETCH_GISTS__FAILED,
} from "../reducers/gists/gists.actions";

export const fetchUrl = () => fetch( "https://api.github.com/gists", {
    method: "get",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
} ).then( ( response ) => {
    if ( !response.ok ) {
        throw new Error();
    }

    return response.json();
} );

export function* fetchGists() {
    try {
        const gists = yield call( fetchUrl );

        yield put( {
            type: FETCH_GISTS__SUCCEEDED,
            payload: {
                gists: gists.map( gist => ( {
                    id: gist.id,
                    title: gist.description || "---",
                } ) ),
            },
        } );
    } catch ( error ) {
        yield put( {
            type: FETCH_GISTS__FAILED,
            payload: error,
        } );
    }
}

export default function* () {
    yield takeLatest( FETCH_GISTS_REQUESTED, fetchGists );
}
