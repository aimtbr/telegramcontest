import {connect} from "react-redux";
import React, {Component} from 'react';
import './App.css';
import {getData} from '../../actions/chartActions'
import {changeRange} from '../../actions/chartActions.js';
import Chart from "../../components/Chart/Chart.js";

class App extends Component {
    constructor(props){
        super(props);
        this.props.getData();
    }

    render() {
        const chart = this.props.charts[0];
        return (
            <div className="App">
                {chart && <Chart chart={chart} changeRange={this.props.changeRange}/>}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        charts: store.charts.charts
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getData: () => getData(dispatch),
        changeRange: (chartTitle, range, axisX, lines) =>
            changeRange(dispatch, chartTitle, range, axisX, lines),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
