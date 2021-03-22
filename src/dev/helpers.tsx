import { endpoint, debug } from '../container/App';
declare const Axios: any;

export const getData = async (reportType: string, date1: string, date2: string) => {
    const data = await Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: reportType,
                values: { date1: date1, date2: date2 }
            }
        },
        withCredentials: true,
    });
    return data;
}

export const checkSession = () => {
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'check session',
            }
        },
        withCredentials: true
    }).then((result) => {
        const status = result.data.content;
        if (status.active === false) {
            debug
                ? console.log('session not active REDIRECT TO LOGIN PAGE')
                : window.location.replace("/opinion/auth.html");
        } else debug && console.log('check session: SESSION ACTIVE');
    }).catch((err) => {
        console.log('err: ', err);

    });

}

export const checkPermissions = (permission: string) => {
    return new Promise((resolve, reject) => {
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: endpoint,
            data: {
                params: {
                    param: 'check permissions',
                    values: { permissions: permission }
                }
            },
            withCredentials: true
        }).then((result) => {
            const status = result.data;
            resolve(status.content);

        }).catch((err) => {
            debug && console.log('err: ', err.response);
            resolve(false);
        });
    });
}

export const checkAuthorize = async (permitionName: string) => {
    checkSession();
    let permission = await checkPermissions(permitionName);
    if (!permission) {
        debug
            ? console.log('section "Asterisk Report" not allow for current user: REDIRECT TO LOGIN PAGE')
            : window.location.replace("/opinion/auth.html");
    };
}

export const logout = () => {
    Axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: endpoint,
        data: {
            params: {
                param: 'logout',
            }
        },
        withCredentials: true
    }).then((result) => {
        debug ? console.log('result: ', result.data) : window.location.replace("/opinion/auth.html");

    }).catch((err) => {
        console.log('err: ', err);

    });
}

export const numberToStringTime = (sec_num: number) => {
    if (sec_num === 0) return '0';
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    let hoursString = hours ? hours + 'ч.' : '';
    let minutesString = minutes ? minutes + 'мин.' : hoursString ? '0мин.' : '';
    let secondsString = seconds ? seconds + 'c.' : '';

    return hoursString + minutesString + secondsString;
}


export const getCurrentDateForInputFormat = () => {
    return (new Date()).toISOString().substring(0, 10);
}

// get datetime in format "2020-08-01T07:54"
export const getCurrentDateTimeForInputFormat = (getStartOfDay = false) => {
    let [date, time] = (new Date()).toLocaleString().substr(0, 17).split(', ');
    let [day, month, year] = date.split('.');
    if (getStartOfDay) return [...[year, month, day].join('-'), ...['T00:00']].join('');
    return [...[year, month, day].join('-'), ...['T'], ...time].join('');
}


export const setDate_withCheck = (date: string, getWithTime = false) => {
    if (new Date(date) > (new Date())) return !getWithTime ? getCurrentDateForInputFormat() : getCurrentDateTimeForInputFormat();
    else return date;
}