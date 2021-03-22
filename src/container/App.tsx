import React, { useState, useEffect } from 'react';
import Navigation from '../components/navigation/Navigation';
import typeOperationReportState from '../types/typeOPerationReportState';
import typeOperatorWorkingTimeState from '../types/typeOPeratorWorkingTimeStructure_8State';
import typeQueryReport_3State from '../types/typeQueryReport_3State';
import typeIncomingCallProfile_5State from '../types/typeIncomingCallProfile_5State';
import { getCurrentDateForInputFormat, getCurrentDateTimeForInputFormat, checkAuthorize } from '../dev/helpers';
import './app.scss';
import Logout from '../components/UI/logout/Logout';
import OperationReport_2 from '../components/operationReport_2/OperationReport_2';
import OperatorWorkingTimeStructure_8 from '../components/operatorWorkingTimeStructure_8/OperatorWorkingTimeStructure_8';
import QueueReport_3 from '../components/queueReport_3/QueueReport_3';
import IncomingCallProfile_5 from '../components/incomingCallProfile_5/IncomingCallProfile_5';
import { routeTypes } from '../types/routeTypes';
import Route from '../components/route/Route';
import Message from '../components/UI/message/Message';
import ProfileFCR_7 from '../components/profileFCR_7/ProfileFCR_7';
import typeProfileFCR_7State from '../types/typeProfileFCR_7State';
import TcommProfile_6 from '../components/tcommProfile_6/TcommProfile_6';
import typeTcommProfile_6State from '../types/typeTcommProfile_6State';

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [route, setRoute] = useState<routeTypes>(routeTypes.operatorWorkingTimeStructure_8);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        checkAuthorize('lysova_otchet');
    }, []);

    //when change the route, set error to false and hidden error message
    useEffect(() => setError(prev => false), [route]);

    const dataOperationReport_2 = {
        result: {},
        startDate: getCurrentDateForInputFormat(),
        finishDate: getCurrentDateForInputFormat(),
        set: () => { },
        loading: loading,
        setLoading: setLoading,
        setError: setError
    };
    const dataOperatorWorkingTimeStructure_8 = {
        result: {},
        day: getCurrentDateForInputFormat(),
        dayTwo: getCurrentDateForInputFormat(),
        set: () => { },
        loading: loading,
        setLoading: setLoading,
        queue: '',
        queueList: [],
        setError: setError,
        liveTex: true
    }

    const dataQueryResult_3 = {
        result: {},
        liveTexResult: {},
        set: () => { },
        loading: loading,
        setLoading: setLoading,
        startDate: getCurrentDateTimeForInputFormat(true),
        finishDate: getCurrentDateTimeForInputFormat(),
        setError: setError
    }

    const dataIncomingCallProfine_5 = {
        result: {},
        set: () => { },
        loading: loading,
        setLoading: setLoading,
        startDate: getCurrentDateTimeForInputFormat(true),
        finishDate: getCurrentDateTimeForInputFormat(),
        setError: setError
    }

    const dataProfileFCR_7 = {
        result: {},
        set: () => { },
        loading: loading,
        setLoading: setLoading,
        startDate: getCurrentDateTimeForInputFormat(true),
        finishDate: getCurrentDateTimeForInputFormat(),
        setError: setError
    }

    const dataTcommProfile_6 = {
        result: {},
        set: () => { },
        loading: loading,
        setLoading: setLoading,
        startDate: getCurrentDateTimeForInputFormat(true),
        finishDate: getCurrentDateTimeForInputFormat(),
        setError: setError
    }

    const [operationReport_2, setOperationReport_2] =
        useState<typeOperationReportState>(dataOperationReport_2);

    const [operatorWorkingTimeStructure_8, setOperatorWorkingTimeStructure_8] =
        useState<typeOperatorWorkingTimeState>(dataOperatorWorkingTimeStructure_8);

    const [queryResult_3, setQueryResult_3] = useState<typeQueryReport_3State>(dataQueryResult_3);

    const [incomingCallProfile_5, setIncomingCallProfile_5] = useState<typeIncomingCallProfile_5State>(dataIncomingCallProfine_5);

    const [profileFCR_7, setProfileFCR_7] = useState<typeProfileFCR_7State>(dataProfileFCR_7);
    const [tcommProfile_6, setTcommProfile_6] = useState<typeTcommProfile_6State>(dataTcommProfile_6);

    return (
        <main>
            <Logout />
            <Navigation currentRouteUrl={route} setCurrentRouteUrl={setRoute} />
            <Route
                TcommProfile_6={
                    <TcommProfile_6
                        result={tcommProfile_6.result}
                        startDate={tcommProfile_6.startDate}
                        finishDate={tcommProfile_6.finishDate}
                        set={setTcommProfile_6}
                        loading={tcommProfile_6.loading}
                        setLoading={setLoading}
                        setError={setError}
                    />
                }

                ProfileFCR_7={
                    <ProfileFCR_7
                        result={profileFCR_7.result}
                        startDate={profileFCR_7.startDate}
                        finishDate={profileFCR_7.finishDate}
                        set={setProfileFCR_7}
                        loading={profileFCR_7.loading}
                        setLoading={setLoading}
                        setError={setError}
                    />
                }

                OperationReport_2={
                    <OperationReport_2
                        result={operationReport_2.result}
                        startDate={operationReport_2.startDate}
                        finishDate={operationReport_2.finishDate}
                        set={setOperationReport_2}
                        loading={operationReport_2.loading}
                        setLoading={setLoading}
                        setError={setError}
                    />
                }
                OperatorWorkingTimeStructure_8={
                    <OperatorWorkingTimeStructure_8
                        result={operatorWorkingTimeStructure_8.result}
                        day={operatorWorkingTimeStructure_8.day}
                        dayTwo={operatorWorkingTimeStructure_8.dayTwo}
                        loading={operatorWorkingTimeStructure_8.loading}
                        setLoading={operatorWorkingTimeStructure_8.setLoading}
                        set={setOperatorWorkingTimeStructure_8}
                        queue={operatorWorkingTimeStructure_8.queue}
                        queueList={operatorWorkingTimeStructure_8.queueList}
                        setError={setError}
                        liveTex={operatorWorkingTimeStructure_8.liveTex}
                    />
                }
                QueueReport_3={
                    <QueueReport_3
                        result={queryResult_3.result}
                        liveTexResult={queryResult_3.liveTexResult}
                        startDate={queryResult_3.startDate}
                        finishDate={queryResult_3.finishDate}
                        set={setQueryResult_3}
                        loading={queryResult_3.loading}
                        setLoading={setLoading}
                        setError={setError}
                    />
                }

                IncomingCallProfile_5={
                    <IncomingCallProfile_5
                        result={incomingCallProfile_5.result}
                        startDate={incomingCallProfile_5.startDate}
                        finishDate={incomingCallProfile_5.finishDate}
                        set={setIncomingCallProfile_5}
                        loading={incomingCallProfile_5.loading}
                        setLoading={setLoading}
                        setError={setError}
                    />
                }

                route={route}
            />
            {error && <Message mainText='что-то пошло не так' subText='обновите страницу и попробуйте еще раз' />}

        </main>
    );
}

export default App;

const debug = true;
const devEndpoint = 'http://localhost:8080/opinion/test.php';
const devEndpoint2 = 'http://opinion.local/opinion/router/web.php';
const productionEndpoint = 'http://192.168.0.60/opinion/router/web.php';
const productionEndpoint2 = '/opinion/router/web.php';
const endpoint = true ? devEndpoint2 : productionEndpoint;

export { debug, endpoint };

