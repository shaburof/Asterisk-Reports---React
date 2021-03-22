import React, { useState } from 'react';

import classes from './navigation.module.scss';
import RainbowDash from './rainbowDash/RainbowDash';
import { routes } from '../../routes';
import { routeTypes } from '../../types/routeTypes';

interface navigationType {
    currentRouteUrl: routeTypes,
    setCurrentRouteUrl: Function
}

const Navigation: React.FC<navigationType> = ({ currentRouteUrl, setCurrentRouteUrl }) => {

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    let throttled = (delay: number, fn: Function) => {
        let lastCall = 0;
        return function (...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) return;
            lastCall = now;
            return fn(...args);
        }
    }
    window.addEventListener('resize', throttled(100, () => {
        setWindowWidth(window.innerWidth);
    }));

    const smallMenuChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let type: number = parseInt(event.target.value);
        setCurrentRouteUrl(type);
    }

    const routeClickHandler = (type) => {
        setCurrentRouteUrl(type);
    }

    return <nav>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 centered" style={{ marginTop: '35px', position: 'relative' }}>
                    {routes.map(r => {
                        if (r.type === currentRouteUrl) return <h2 key={r.link}>{r.name}</h2>
                    })}
                    <RainbowDash />
                    <hr style={{ marginBottom: '4px' }} />
                    {
                        windowWidth > 1300
                            ? <nav className={classes.submenu}>
                                {routes.map((r, index) => {
                                    let color = index < 7 ? index : 7 - index;
                                    return <a
                                        onClick={() => { routeClickHandler(r.type) }}
                                        key={r.link}
                                        className={classes.submenu__item + ' ' + classes['subMunuColor' + color] + ' ' + (r.type === currentRouteUrl ? classes.submenu_pressed : '')}
                                    >{r.name}</a>
                                })}
                            </nav>
                            : <div className="form-group">
                                <select
                                    value={currentRouteUrl}
                                    className="form-control"
                                    onChange={smallMenuChangeHandler}>
                                    {routes.map(route => {
                                        return <option
                                            key={route.type}
                                            // selected={currentRouteUrl === route.type}
                                            value={route.type}>{route.name}</option>
                                    })}
                                </select>
                            </div>
                    }

                </div>
            </div>
        </div>

    </nav>;
}

export default Navigation;