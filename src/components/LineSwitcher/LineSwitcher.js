import React from 'react';

const LineSwitcher = props => {
    const { chartTitle, lineName, lineValue, color, mode } = props;
    const dayColor = mode ? '#FFF' : '#000';
    let active = true;
    return (
        <div className='col-lg-4 col-md-4 col-sm-12 line-switcher-wrapper'>
            <button className='btn line-switcher' type='button'
                    style={{background: color, color: dayColor}}
                    // onClick={() => active = props.switchLine(chartTitle, lineName)}
            >
                {lineValue}
            </button>
        </div>
    );
};

export default LineSwitcher;