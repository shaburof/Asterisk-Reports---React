import React from 'react';
import { routeTypes } from '../../types/routeTypes';
import typeOperationReportState from '../../types/typeOPerationReportState';

interface routeInterface {
    OperationReport_2: any,
    OperatorWorkingTimeStructure_8: any,
    QueueReport_3: any,
    IncomingCallProfile_5: any,
    ProfileFCR_7: any,
    TcommProfile_6: any,
    route: routeTypes
}

const Route: React.FC<routeInterface> = (props) => {

    return <>
        {(() => {
            if (props.route === routeTypes.operationReport_2) {
                return props.OperationReport_2;
            } else if (props.route === routeTypes.operatorWorkingTimeStructure_8) {
                return props.OperatorWorkingTimeStructure_8;
            } else if (props.route === routeTypes.queryResult_3) {
                return props.QueueReport_3
            }
            else if (props.route === routeTypes.incomingCallProfile_5) {
                return props.IncomingCallProfile_5;
            }
            else if (props.route === routeTypes.profileFCR_7) {
                return props.ProfileFCR_7;
            }
            else if (props.route === routeTypes.tcommProfile_6) {
                return props.TcommProfile_6;
            }
            else {

            }
        })()
        }
    </>
}

export default Route;