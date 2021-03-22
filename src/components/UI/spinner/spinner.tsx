import React from 'react';

interface spinnerInterface { liveTexSpinner?: boolean };

const Spinner: React.FC<spinnerInterface> = (props) => {

    let spiner = props.liveTexSpinner
        ? <><img src="/opinion/images/barlivetex.gif" /><p style={{ fontSize: '15px', marginTop: '-15px' }}>loading...</p></>
        : <img src="/opinion/images/bar.gif" />;

    return spiner
}

export default Spinner;


// <div className="col-sm-12 centered"><Spinner /></div>