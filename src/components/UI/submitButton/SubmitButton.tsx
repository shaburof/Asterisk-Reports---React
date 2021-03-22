import React from 'react';
import classes from './submitButton.module.scss';
import typeButton from '../../../types/typeButton';


const SubmitButton: React.FC<typeButton> = (props) => {
    const buttonClass = (props.loading || !props.ready) 
    ? 'btn btn-sm btn-secondary ' + classes.disabledButton 
    : 'btn btn-sm btn-primary'

    return <input type="submit"
        className={buttonClass}
        disabled={props.loading || !props.ready}
        value={props.text} />
}

export default SubmitButton;