import {connect} from 'react-redux';
import React, {Component} from 'react';
import './App.css';
import {getData} from '../../actions/chartActions';
import {changeRange} from '../../actions/chartActions.js';
import {switchMode} from '../../actions/chartActions.js';
import {switchLine} from "../../actions/chartActions.js";
import Chart from '../../components/Chart/Chart.js';
import ModeButton from '../../components/ModeButton/ModeButton.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.getData();
    }

    repaintApp() {
        const {mode} = this.props;
        let docBodyStyle = document.body.style;
        docBodyStyle.color = mode ? '#FFF' : '#000';
        docBodyStyle.backgroundColor = mode ? '#1d2333' : '#FFF';
    }

    displayCharts(){
        const {mode, charts} = this.props;
        return charts.map(chart => <Chart chart={chart} mode={mode} changeRange={this.props.changeRange}
                                                    switchLine={this.props.switchLine}/>);
    }

    render() {
        this.repaintApp();
        return (
            <div className='container-fluid'>
                <div className='row'>
                    {this.displayCharts()}
                    <ModeButton switchMode={this.props.switchMode} mode={this.props.mode}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        charts: store.charts.charts,
        mode: store.charts.nightMode,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getData: () => getData(dispatch),
        changeRange: (chartTitle, range, axisX, lines, disabled) =>
            changeRange(dispatch, chartTitle, range, axisX, lines, disabled),
        switchMode: mode => switchMode(dispatch, mode),
        switchLine: (chartTitle, lineName, rangeToShow, disabled) =>
            switchLine(dispatch, chartTitle, lineName, rangeToShow, disabled),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
