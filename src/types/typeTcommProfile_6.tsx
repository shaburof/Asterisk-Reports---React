export default interface typeTcommProfile_6 {
    insideCalls: {
        externalByTime: number,
        externalCount: number,
        hdCallsCount: number,
        internalByTime: number,
        internalCount: number,
        middleCallsCount: number,
        operuCallsCount: number,
        othersCallsCount: number
    },
    outsideCalls: {
        externalByTime: number,
        externalCount: number,
        hdCallsCount: number,
        internalByTime: number,
        internalCount: number,
        middleCallsCount: number,
        operuCallsCount: number,
        othersCallsCount: number
    },
    hdPhones: string[],
    middlePhones: string[],
    operuPhones: string[],
}