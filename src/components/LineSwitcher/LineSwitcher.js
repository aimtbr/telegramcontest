import React from 'react';

const LineSwitcher = props => {
    const {chart, lineName, mode, switchLine, redrawChart} = props;
    const {chartTitle, series_names, colors} = chart;
    const lineValue = series_names[lineName];
    const color = colors[lineName];
    const dayColor = mode ? '#FFF' : '#000';
    let active = true;
    return (
        <div className='col-lg-4 col-md-4 col-sm-12 line-switcher-wrapper'>
            <button className='btn line-switcher' type='button'
                    style={{background: color, color: dayColor}}
                    onClick={async e => {
                        e.preventDefault();
                        active = await switchLine(chartTitle, lineName, props.chart.rangeToShow, props.chart.disabled);
                        redrawChart();
                    }}>
                {lineValue}
            </button>
        </div>
    );
};

export default LineSwitcher;