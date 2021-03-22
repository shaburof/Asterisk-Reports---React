import typeOperationReport_2 from './typeOperationReport_2';

interface typeOperationReportState {
    result: typeOperationReport_2,
    startDate: string,
    finishDate: string,
    set: Function,
    loading: boolean,
    setLoading: Function,
    setError: Function
}

export default typeOperationReportState;