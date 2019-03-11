import {connect} from "react-redux";
import React, {Component} from 'react';
import './App.css';
import {getData} from '../../actions/chartActions'

class App extends Component {
    componentWillMount() {
        this.props.getData();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h3>{this.props.chartTitle}</h3>
                </header>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        charts: store.charts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getData: () => getData(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
