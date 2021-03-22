import React from 'react';
import classes from './graph_6.module.scss';

interface interfacePhoneDescription {
    title: string[],
    data: string[][]
}

const PhoneDescription: React.FC<interfacePhoneDescription> = (props) => {


    return <div className={classes.phoneArea}>
        {props.data.map((description, index) => <p key={index} className={classes.phoneLine}><span className={classes.phoneTitle}>{props.title[index]}:</span><span className={classes.phones}>{description.map(ph => ph + ', ')}</span></p>)}
    </div>
}

export default PhoneDescription;