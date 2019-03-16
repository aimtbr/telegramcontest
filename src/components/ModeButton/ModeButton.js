import React from 'react';

const ModeButton = props => {
    return (
        <div id="switcher" className="col-lg-12 col-md-12 col-sm-12">
            <button id='switch-mode' className="btn" type='button' onClick={() => props.switchMode(props.mode)}>
                Switch to {props.mode ? 'Day' : 'Night'} Mode
            </button>
        </div>
    );
};

export default ModeButton;