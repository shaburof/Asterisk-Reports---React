import React from 'react';
import { logout } from '../../../dev/helpers';
import classes from './logout.module.scss';

const Logout = (props) => {

    const onClickHandler = () => {
        logout();
    }

    return <div className={classes.autorization}>
        <a onClick={onClickHandler} id="logout" href="#">выход</a>
    </div>
}

export default Logout;