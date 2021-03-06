import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams, deleteStream, editStream, fetchStream } from '../../redux/actions/index'
import { Link } from 'react-router-dom';
import history from '../../history';


class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    editSelectedStream = (streamId) => { // BIR COMPONENTAN in func nin icinde baska bir func gectiginde bunu arrow funct yapman lazim yoksa alamiyor
        this.props.fetchStream(streamId)
        this.props.history.push("/streams/edit/"+ streamId);
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            
            return (
                <div className="right floated content">
                    <button className="ui button primary" onClick={() => this.editSelectedStream(stream.id)}>
                        Edit
                    </button>
                    {/* <button className="ui button negative" onClick={() => this.props.history.push('/streams/delete/'+stream.id)}>
                        Delete
                    </button> */}
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative"> 
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header"> 
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div> 
                    </div>
                </div>
            )
        })
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
                <button onClick={() => history.push("/streams/new")}>bas</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // (state)
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId, 
        isSignedIn: state.auth.isSignedIn,
    };
}

export default connect(mapStateToProps, 
    {
        fetchStreams, deleteStream, editStream, fetchStream
    }) (StreamList);