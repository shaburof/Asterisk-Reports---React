export interface interfaceGraphics_5 {
    graphicData: [number, number, { [prop: string]: [number, number][] }][] | undefined,
    startDate: string,
    finishDate: string,
}

export interface interfaceGraphicsHelper {
    (
        data1: [number, number, { [prop: string]: [number, number][] }][] | undefined,
        min: number,
        max: number
    ): void
}

export interface interfaceGraphicsHelper2 {
    (
        data: { [prop: string]: [number, number][][] } | undefined,
        min: number,
        max: number
    ): void
}

export enum GRAPH { 'GRAPH1', 'GRAPH2' }

export enum GRADIENT_COLORS { VIOLETY, GREENY, REDDY, CYANY };