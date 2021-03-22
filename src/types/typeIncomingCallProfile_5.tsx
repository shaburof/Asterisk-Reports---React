interface callsInfo {
    abandonCalls: number,
    percentOfAbandonCalls: number,
    servedCalls_2: number,
    percentageOfServedCalls: number,
    abandonInIvr: number,
    abandonInQueueAndIvr: number,
    abandonInIvrButCallersFromTheSecondOrMoreAttempts: number,
    abandonInQueueButCallersFromTheSecondOrMoreAttempts: number,
    abandonCallsInfo: {
        datetime: string,
        originalPosition: string,
        positionWhenHungup: string,
        queue: string
    }[]
}

export default interface typeIncomingCallProfile_5 {
    'upTo15'?: callsInfo,
    'upTo30'?: callsInfo,
    'upTo45'?: callsInfo,
    'upTo60'?: callsInfo,
    'upTo90'?: callsInfo,
    'upTo120'?: callsInfo,
    'upTo180'?: callsInfo,
    'upTo240'?: callsInfo,
    'upTo300'?: callsInfo,
    'moreThen300'?: callsInfo,
    'dataForBuildingGraphic'?: [number, number, { [prop: string]: [number, number][] }][],
}