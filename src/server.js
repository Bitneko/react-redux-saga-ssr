import express from "express";
import path from "path";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import createStore, { initialiseApp } from "./store";
import Layout from "./components/Layout";
import sagas from "./redux/sagas";
import { fetchGists } from "./redux/reducers/gists/gists.actions";

const app = express();

app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

app.get( "/*", ( req, res ) => {
    const context = {};
    const {store} = createStore(req.url);
    store.dispatch( initialiseApp() );

    const jsx = (
        <Provider store={ store }>
            <StaticRouter context={ context } location={ req.url }>
                <Layout />
            </StaticRouter>
        </Provider>
    );  

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    store.runSaga( sagas ).done.then( () => {
        const reactDom = renderToString( jsx );
        const reduxState = store.getState();

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( reactDom, reduxState ) );
    } );

    store.dispatch( fetchGists() );
    store.close();
} );

app.listen( 8888 );

function htmlTemplate( reactDom, reduxState ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>SSR Demo</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
