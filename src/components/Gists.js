import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGists } from "../redux/reducers/gists/gists.actions";

const GistsList = ( { gists } ) => (
    <ul>
        {gists.map( gist => (
            <li key={ gist.id }>{gist.title}</li>
        ) )}
    </ul>
);

GistsList.propTypes = {
    gists: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

export class GistsClass extends Component {
    componentWillMount() {
        // this.props.loadGists();
    }

    render() {
        const { gists } = this.props;
        return (
            <div>
                <h2>Gists</h2>
                {gists.length > 0 && <GistsList gists={ gists.slice( 0, 10 ) } />}
                <button onClick={ () => {
                    this.props.loadGists();
                } }
                >
                 Fetch Again
                </button>
            </div>
        );
    }
}

GistsClass.propTypes = {
    loadGists: PropTypes.func.isRequired,
    gists: PropTypes.arrayOf( PropTypes.string ).isRequired,
};

const mapStateToProps = ( { gists } ) => ( {
    gists,
} );

export default connect( mapStateToProps, { loadGists: fetchGists } )( GistsClass );
