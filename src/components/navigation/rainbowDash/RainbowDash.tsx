import React, { useEffect, useState } from 'react';
// import rainbowDash from '../../../images/Rainbow_Dash.png';
import classes from './rainbowDash.module.scss';

const RainbowDash = (props) => {
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        Math.floor(Math.random() * 10) === 5 && setShow(true);
    }, []);

    return <>
        {show && <img className={classes.rainbow__img} src="/opinion/images/rainbow_dash.png" alt="rainbow dash" />}
    </>
}

export default RainbowDash;