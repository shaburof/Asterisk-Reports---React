import React, { useState, useEffect } from 'react';
import Table from '../UI/table/Table';
import { numberToStringTime, setDate_withCheck, getData } from '../../dev/helpers';
import Form1 from '../UI/form1/Form1';
import typeOperationReportState from '../../types/typeOPerationReportState';
import { typeBestPosition } from '../../types/typeTable';
import Spinner from '../UI/spinner/spinner';
import Logout from '../UI/logout/Logout';
import { debug } from '../../container/App';
import { COLORS } from '../../types/typesColors';


const OperationReport_2: React.FC<typeOperationReportState> = (props) => {

    const [ready, setReady] = useState<boolean>(false);
    const [rataIsReceive, setDataIsReceive] = useState<boolean>(false);

    useEffect(() => {
        // for testing
        // props.set(prev => { return { ...prev, result: devData } });
        // setReady(true);
        // setDataIsReceive(true);
        // for testing
        // (async () => {
        //     let { data } = await getData('operationreport_2', 'd1', 'd2');
        //     console.log(data.content);

        //for testing2
        // (async () => {
        // let { data } = await getData('operationreport_2', '2020-08-03', '2020-08-07');
        //     props.set(prev => { return { ...prev, result: devData } });
        //     setDataIsReceive(true);
        // })();

    }, []);

    useEffect(() => {
        setReady(prev => chechReady());
    }, [props.startDate, props.finishDate]);

    useEffect(() => {
        Object.keys(props.result).length === 0 ? setDataIsReceive(false) : setDataIsReceive(true);
    }, [props.result]);

    let names = () => {
        return ['дата', 'всего входящих вызовов, шт.', 'обслуженные вызовы, шт.', 'средняя скорость ответа',
            'максимальная задержка с ответом', 'среднее время обслуживания', 'уровень обслуживания, %',
            'потерянные вызовы, шт.', 'процент потерянных вызовов, %', 'вызовы, получившие законченный ответ с первой попытки, шт.',
            'процент вызовов получивших законченный ответ с первой попытки, %', 'процент вызовов с оценкой качества разговора (%)',
            'средняя оценка качества разговора']
    }
    let values = (): (string | number)[][] => {
        let data: any = [];
        for (const item in props.result) {
            let a: any = [];

            let indicators = props.result[item];

            a.push(item);
            a.push(indicators.totalIncomingCalls_1);
            a.push(indicators.$servedCalls_2);
            a.push(numberToStringTime(indicators.$averageResponseRate_6));
            a.push(numberToStringTime(indicators.$maximumResponseDelay_7));
            a.push(numberToStringTime(indicators.$averageServiceTime_10));
            a.push(indicators.$serviceLevel_5 + '%');
            a.push(indicators.$abandonedCalls_4);
            a.push(indicators.$thePercentageOfMissedCalls_8 + '%');
            a.push(indicators.$finishedEffectOnTheFirstTry_16 ? indicators.$finishedEffectOnTheFirstTry_16 : 0);
            a.push(indicators.$percentageOfFinishedEffectOnTheFirstTry_15 ? indicators.$percentageOfFinishedEffectOnTheFirstTry_15 + '%' : '0%');
            a.push(indicators.$percentageOfCallWithOpinion_18 + '%');
            a.push(indicators.$averageCallQualityRating_17);
            data.push(a);
        }
        return data;
    }
    let tooltips = () => {
        return [
            '', 'обслуженные вызовы + потерянные вызовы',
            'вызовы, на которые абоненты получили ответ оператора',
            'среднее время, в течение которого абонент ждет ответа оператора = общее время, проведенное вызовами в очереди / обслуженные вызовы',
            'максимальное время ожидание в очереди (только для отвеченных вызовов)',
            'средняя скорость ответа + среднее время разговора с клиентом + среднее время поствызывной обработки',
            'процент вызовов, обслуженных с заданной скоростью ответа 20 сек = ( число вызовов, получивших ответ оператора в течении 20 сек. / (обслуженные вызовы  + потерянные вызовы )) * 100 (в скорость ответа не входит время ivr меню)',
            'вызовы, абоненты которых повесили трубку, не дождавшись ответа оператора (рассчитывается по звонкам, находившимся в очереди дольше одной секунды)',
            'потерянные вызовы / всего входящих вызовов * 100',
            'обслуженные вызовы – вызовы повторного взаимодействия: 1)абонент перезвонил в банк в течение текущего дня после состоявшегося (обслуженного) вызова 2) оператор перезвонил абоненту в течение текущего дня после первого состоявшегося (обслуженного) вызова 3) абонент оценил работу оператора ниже 5 баллов',
            'вызовы, получившие законченный ответ с первой попытки / обслуженные вызовы * 100',
            'количество обращений с оценкой / обслуженные вызовы * 100',
            'сумма всех оценок операторов / кол-во вызовов в оценкой',
        ];
    }

    let chechReady = () => {
        if (props.startDate <= props.finishDate) return true;
        return false;
    }

    let setDate = (date: string, dateType: string) => {
        props.set(prev => {
            return { ...prev, [dateType]: setDate_withCheck(date) }
        });
    }

    let formSubmitHandler = async (event) => {
        event.preventDefault();
        props.setError(false);
        setDataIsReceive(false);
        props.set(prev => ({ ...prev, loading: true }));
        try {
            let { data } = await getData('operationreport_2', props.startDate, props.finishDate);
            props.set(prev => { return { ...prev, result: data.content } });
            setDataIsReceive(true);
        } catch (err) {
            debug && console.log('some error 2', err);
            props.setError(true);
        }
        props.set(prev => ({ ...prev, loading: false }));
    }

    const bestPosition = () => {

        const ifStatments = (arr, result) => {
            for (const item of arr) {
                if (typeof bestPositionDataValues[item.i] === 'undefined') {
                    bestPositionDataValues[item.i] = {
                        lgIndex: item.lg ? [] : undefined, lgValue: item.lg ? null : undefined,
                        gtIndex: item.gt ? [] : undefined, gtValue: item.gt ? null : undefined,
                        lgIsBad: item.lgIsBad
                    };
                }
                if (typeof bestPositionDataValues[item.i].gtIndex !== 'undefined' && result[item.name] > bestPositionDataValues[item.i].gtValue!) {
                    bestPositionDataValues[item.i].gtValue = result[item.name];
                    bestPositionDataValues[item.i].gtIndex![0] = index;
                }
                if (typeof bestPositionDataValues[item.i].lgIndex !== 'undefined' && (result[item.name] < bestPositionDataValues[item.i].lgValue!) || bestPositionDataValues[item.i].lgValue === null) {
                    bestPositionDataValues[item.i].lgValue = result[item.name];
                    bestPositionDataValues[item.i].lgIndex![0] = index;
                }
            }

        }


        let bestPositionDataValues: typeBestPosition = {};

        let index = 0;

        // если всего в результатах меньше трех позиций не выделять bestPostion
        if (Object.keys(props.result).length < 3) return;
        for (const date in props.result) {
            let result = props.result[date];
            ifStatments([{ i: 4, name: '$maximumResponseDelay_7', gt: true, lg: false, lgIsBad: false }], result)
            ifStatments([{ i: 8, name: '$thePercentageOfMissedCalls_8', gt: true, lg: false, lgIsBad: false }], result)
            ifStatments([{ i: 10, name: '$percentageOfFinishedEffectOnTheFirstTry_15', gt: true, lg: true, lgIsBad: true }], result)
            ifStatments([{ i: 12, name: '$averageCallQualityRating_17', gt: false, lg: true, lgIsBad: true }], result)
            ifStatments([{ i: 6, name: '$serviceLevel_5', gt: true, lg: true, lgIsBad: true }], result)
            index++;
        }

        return bestPositionDataValues;
    }

    let bestPosition2 = () => {

        let bestResultObjectArray = {
            'totalIncomingCalls_1': { column: 1, comparison: 'gt', from: 500, color: COLORS.RED },
            '$averageResponseRate_6': { column: 3, comparison: 'gt', from: 13, color: COLORS.RED },
            '$maximumResponseDelay_7': { column: 4, comparison: 'gt', from: 300, color: COLORS.RED },
            '$serviceLevel_5': { column: 6, comparison: 'lg', from: 80, color: COLORS.RED },
            '$percentageOfCallWithOpinion_18': { column: 11, comparison: 'lg', from: 10, color: COLORS.RED },
            '$averageCallQualityRating_17': { column: 12, comparison: 'lg', from: 4.9, color: COLORS.RED },
            '$thePercentageOfMissedCalls_8': { column: 8, comparison: 'gtbetween', from: 3, to: 5, color: COLORS.YELLO, colorTwo: COLORS.RED },
            // '$averageResponseRate_6': { column: 3, comparison: 'lg', from: 8, color: COLORS.GREEN },
            // '$averageResponseRate_6': { column: 3, comparison: 'between', from: 7, to: 7, color: COLORS.GREEN },
        };

        let resultBestPosition: { column: number, row: number, color: COLORS }[] = [];

        let index = 0;
        for (const date in props.result) {
            let result = props.result[date];

            for (const item in result) {
                // console.log('item: ', item);
                if (bestResultObjectArray[item]) {
                    // console.log(bestResultObjectArray[item]);
                    if (bestResultObjectArray[item].comparison === 'gt' && result[item] >= bestResultObjectArray[item].from) {
                        resultBestPosition.push({ column: bestResultObjectArray[item].column, row: index, color: bestResultObjectArray[item].color });
                    } else if (bestResultObjectArray[item].comparison === 'lg' && result[item] <= bestResultObjectArray[item].from) {
                        resultBestPosition.push({ column: bestResultObjectArray[item].column, row: index, color: bestResultObjectArray[item].color });
                    }
                    else if (bestResultObjectArray[item].comparison === 'between' && result[item] >= bestResultObjectArray[item].from && result[item] <= bestResultObjectArray[item].to) {
                        resultBestPosition.push({ column: bestResultObjectArray[item].column, row: index, color: bestResultObjectArray[item].color });
                    }
                    else if (bestResultObjectArray[item].comparison === 'gtbetween') {
                        if (result[item] > bestResultObjectArray[item].from && result[item] < bestResultObjectArray[item].to) {
                            resultBestPosition.push({ column: bestResultObjectArray[item].column, row: index, color: bestResultObjectArray[item].color });
                        } else if (result[item] > bestResultObjectArray[item].to) {
                            resultBestPosition.push({ column: bestResultObjectArray[item].column, row: index, color: bestResultObjectArray[item].colorTwo });
                        }
                        //    resultBestPosition.push({ column: bestResultObjectArray[item].column, row: index, color: bestResultObjectArray[item].color });
                    }
                }

            }
            index++;
        }

        // console.log(resultBestPosition);

        return resultBestPosition;
        return [
            { column: 1, row: 0, color: COLORS.RED },
            { column: 3, row: 1, color: COLORS.GREEN },
        ];
    }

    const selectRows = () => {
        let selectedRows: number[] = [];
        let index = 0;
        for (const date in props.result) {
            let dateTime = new Date(date);
            if (dateTime.getDay() === 6 || dateTime.getDay() === 0) selectedRows.push(index);
            index++;
        }

        return selectedRows;
    }

    return (<section className='container'>
        <Logout />
        <Form1 startDate={props.startDate} finishDate={props.finishDate}
            setStartDate_withCheck={(date) => setDate(date, 'startDate')}
            setFinishDate_withCheck={(date) => setDate(date, 'finishDate')}
            ready={ready} loading={props.loading} onClickSearchHandler={formSubmitHandler}
        />
        {
            rataIsReceive && <Table
                names={names()}
                // bestPosition={bestPosition()}
                bestPosition2={bestPosition2()}
                tooltips={tooltips()}
                values={values()}
                selectRow={selectRows()}
            />
        }
        {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
    </section>)
}

export default OperationReport_2;