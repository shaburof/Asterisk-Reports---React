import React from 'react';
import classes from './profileFCR_7.module.scss';


const FcrInPersent = (props: { value: number }) => {

    let iconClass = classes.fcrIcon + ' ';
    iconClass += props.value >= 80 ? classes.fcrIconGreen : props.value < 80 && props.value > 69 ? classes.fcrIconYello : props.value !== 0 ? classes.fcrIconRed : '';

    return <section className={classes.fcr}>
        <div className={classes.fcrIconArea}>
            <div className={iconClass}></div>
        </div>
        <div className={classes.fcrTitle}>FCR</div>
        <div className={classes.fcrValue}>{props.value > 0 ? props.value + '%' : '0'}</div>
    </section >
}

export default FcrInPersent;