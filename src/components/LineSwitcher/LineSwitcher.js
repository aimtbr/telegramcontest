import React from 'react';

const LineSwitcher = props => {
    const {chart, lineName, mode, switchLine, redrawChart, drawMiniChart} = props;
    const {chartTitle, series_names, colors} = chart;
    const lineValue = series_names[lineName];
    const color = colors[lineName];
    const dayColor = mode ? '#FFF' : '#000';
    let active = true;
    return (
        <button id={`${chartTitle}-${lineName}`} className='btn line-switcher' type='button'
                style={{background: color, color: dayColor}}
                onClick={async e => {
                    e.preventDefault();
                    const but = document.getElementById(`${chartTitle}-${lineName}`);
                    but.style.backgroundColor = active ? 'transparent' : color;
                    active = !active;
                    await switchLine(chartTitle, lineName, props.chart.rangeToShow,
                        props.chart.disabled, active);
                    redrawChart();
                    drawMiniChart();
                }}>
            {lineValue}
        </button>
    );
};

export default LineSwitcher;