import typeQueryReport_3 from '../types/typeQueryReport_3';
import typeLiveTexReport_3 from '../types/typeLiveTexReport_3';


export const devQueueList = ['0909', '0993', '0990', '0995'];


export const devQueueReport_3: typeQueryReport_3 = {
    // test report
};

export const devLiveText_3: typeLiveTexReport_3 = {
    "total": 4,
    "result": {
        "$abandonedCalls_4": 0,
        "$averageNumberOfCallPerHour_20": 0.2,
        "$averagePostCallTime_13": 0,
        "$averageResponseRate_6": 20,
        "$averageServiceTime_10": 679,
        "$averageTalkTime_11": 659,
        "$averageTimeToAbandon_9": 0,
        "$datetimeOfCallsPerBusyHour_nn1": {
            "date": "2020-11-3",
            "start": "12:00",
            "finish": "13:00"
        },
        "$maximumResponseDelay_7": 42,
        "$numberOfCallsPerBusyHour_21": 3,
        "$numberOfCustomersWaitingForTheOperatorResponse_nn2": 1,
        "$percentageOfImmediateResponse_22": 0,
        "$servedCalls_2": 4,
        "$serviceLevel_5": 50,
        "$queueName": "liveTex"
    }
};