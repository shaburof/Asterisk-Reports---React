import operatorWorkingTimeStructure_8 from './typeOperatorWorkingTimeStructure_8';

interface typeOperationReportState {
    result: operatorWorkingTimeStructure_8,
    day: string,
    dayTwo: string,
    set: Function,
    loading: boolean,
    setLoading: Function,
    queue: string,
    queueList: string[],
    setError: Function,
    liveTex: boolean
}

export default typeOperationReportState;