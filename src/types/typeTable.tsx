import { COLORS } from './typesColors';

interface typeTable {
    names: string[],
    tooltips: string[],
    values: (string | number)[][]
    bestPosition?: typeBestPosition,
    bestPosition2?: typeBestPosition2,
    selectRow?: typeSelectRow
}

export interface typeBestPosition {
    [prop: string]: {
        gtIndex: null | undefined | number[],
        gtValue: null | undefined | number,
        lgIndex: null | undefined | number[],
        lgValue: null | undefined | number,
        lgIsBad: boolean
    }
}

export type typeBestPosition2 = {
    column: number,
    row: number,
    color: COLORS
}[];



export type typeSelectRow = number[];

export default typeTable;
