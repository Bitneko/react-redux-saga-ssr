import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGists } from "../redux/reducers/gists/gists.actions";

const GistsList = ({ gists }) => (
    <ul>
        {gists.map(gist => (
            <li key={gist.id}>{gist.title}</li>
        ))}
    </ul>
);

export class Gists extends Component {
    componentWillMount() {
        this.props.loadGists();
    }

    render() {
        const { gists } = this.props;
        return (
            <div>
                <h2>Gists</h2>
                {gists.length > 0 && <GistsList gists={gists.slice(0, 10)} />}
                <button onClick={()=>{this.props.loadGists();}}>
                 Fetch Again</button>
            </div>
        );
    }
}

const mapStateToProps = ({ gists }) => ({
    gists,
});

export default connect(mapStateToProps, { loadGists: fetchGists })(Gists);