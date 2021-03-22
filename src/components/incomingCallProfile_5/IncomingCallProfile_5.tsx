import React, { useEffect, useState } from 'react';
import { getCurrentDateTimeForInputFormat, setDate_withCheck, numberToStringTime, getData } from '../../dev/helpers';
import Form1 from '../UI/form1/Form1';
import Spinner from '../UI/spinner/spinner';
import Table from '../UI/table/Table';
import { debug } from '../../container/App';
import typeIncomingCallProfile_5State from '../../types/typeIncomingCallProfile_5State';
import classes from './IncomingCallProfile_5.module.scss';
import { COLORS } from '../../types/typesColors';
import Graphics_5 from './graphics/Graphics_5';

const IncomingCallProfile_5: React.FC<typeIncomingCallProfile_5State> = (props) => {
    const [ready, setReady] = useState<boolean>(false);
    const [rataIsReceive, setDataIsReceive] = useState<boolean>(false);

    // useEffect(() => {
    //     (async () => {
    //         let { data } = await getData('incomingCallProfile_5', props.startDate.split('T').join(' '), props.finishDate.split('T').join(' '));
    //         props.set(prev => ({ ...prev, result: data.content }));
    //         setDataIsReceive(true);
    //     })();
    // }, []);
    // useEffect(() => {
    //     bestPosition2();
    // }, [props.result]);

    useEffect(() => {
        //todo remove coment after testing проверяем что данные уже в хранилище, и если до то показываем таблицу
        Object.keys(props.result).length === 0 ? setDataIsReceive(false) : setDataIsReceive(true);
    }, []);;


    useEffect(() => {
        setReady(prev => chechReady());
    }, [props.startDate, props.finishDate]);

    let chechReady = () => {
        if (props.startDate < props.finishDate) return true;
        return false;
    }

    let setDate = (date: string, dateType: string) => {
        props.set(prev => {
            return { ...prev, [dateType]: setDate_withCheck(date, true) }
        });
    }

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        props.set(prev => ({ ...prev, loading: true }));
        props.setError(false);
        setDataIsReceive(false);
        try {
            let { data } = await getData('incomingCallProfile_5', props.startDate.split('T').join(' '), props.finishDate.split('T').join(' '));
            props.set(prev => ({ ...prev, result: data.content }));
            setDataIsReceive(true);
        } catch (err) {
            debug && console.log('some error in INcomingCallProgile_5', err);
            props.setError(true);
        }
        props.set(prev => ({ ...prev, loading: false }));

    }

    let names = () => {
        return [
            'время ожидания ответа оператора (секунды)',
            'до 15',
            'до 30',
            'до 45',
            'до 60',
            'до 90',
            'до 120',
            'до 180',
            'до 240',
            'до 300',
            'более 300',
        ]
    }

    let values = () => {
        let data: any = [];
        let helpedNamesArray =
        {
            names: ['обслуженные вызовы, шт.', 'процент обслуженных вызовов, %', 'потерянные вызовы, шт.', 'процент потерянных вызовов, %'],
            nameParams: ['upTo15', 'upTo30', 'upTo45', 'upTo60', 'upTo90', 'upTo120', 'upTo180', 'upTo240', 'upTo300', 'moreThen300'],
            nameValues: ['servedCalls_2', 'percentageOfServedCalls', 'abandonInQueueAndIvr', 'percentOfAbandonCalls'],
        };

        helpedNamesArray.names.forEach((name, index) => {
            let a: any = [];
            a.push(name);
            helpedNamesArray.nameParams.forEach(param => {
                let nameValue = helpedNamesArray.nameValues[index];
                let value = props.result[param][nameValue];
                if (value !== 0 && (index === 1 || index === 3)) a.push(value + '%');
                else a.push(value);
            });
            data.push(a);
        });

        return data;
    }

    let values2 = () => {
        let data: any = [];
        let helpedNamesArray =
        {
            names: [
                'в очереди, шт.',
                'в ИВР меню (только одна попытка дозвониться), шт.',
                'потерянные вызовы на этапе голосового меню, дозвонившиеся со второй (и более) попытки, шт.',
                'потерянные вызовы на этапе ожидания в очереди, дозвонившиеся со второй (и более) попытки'
            ],
            nameParams: ['upTo15', 'upTo30', 'upTo45', 'upTo60', 'upTo90', 'upTo120', 'upTo180', 'upTo240', 'upTo300', 'moreThen300'],
            nameValues: ['abandonCalls', 'abandonInIvr', 'abandonInIvrButCallersFromTheSecondOrMoreAttempts', 'abandonInQueueButCallersFromTheSecondOrMoreAttempts'],
        };

        helpedNamesArray.names.forEach((name, index) => {
            let a: any = [];
            a.push(name);
            helpedNamesArray.nameParams.forEach(param => {
                let nameValue = helpedNamesArray.nameValues[index];
                let value = props.result[param][nameValue];
                a.push(value);
            });
            data.push(a);
        });

        return data;
    }

    let bestPosition2 = () => {
        let resultBestPosition: { column: number, row: number, color: COLORS }[] = [];
        let temp: { column: null | number, row: null | number, value: null | number } = { column: null, row: 0, value: null };
        let index = 1;
        for (const date in props.result) {
            let result = props.result[date];
            if (temp.column === null) {
                temp.column = index;
                temp.value = result.abandonCalls;
            }
            else {
                if (result.abandonCalls > (temp.value as number)) {
                    temp.value = result.abandonCalls;
                    temp.column = index;
                }
            }

            index++;
        }
        if (temp.value !== null && temp.value !== 0) {
            resultBestPosition.push({ column: (temp.column as number), row: (temp.row as number), color: COLORS.RED });
            return resultBestPosition;
        }

        return [];
    }

    return <section>
        <div className="container">
            <Form1 startDate={props.startDate} finishDate={props.finishDate}
                setStartDate_withCheck={(date) => setDate(date, 'startDate')}
                setFinishDate_withCheck={(date) => setDate(date, 'finishDate')}
                dateTime={true}
                ready={ready} loading={props.loading} onClickSearchHandler={formSubmitHandler}
            />
        </div>
        {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
        {rataIsReceive && <>
            <Graphics_5 graphicData={props.result.dataForBuildingGraphic} startDate={props.startDate} finishDate={props.finishDate} />
            <section className={classes.tablesArea}>
                <Table
                    names={names()}
                    values={values()}
                    tooltips={[]}
                />
                <p className={classes.title}>структура потерянных вызовов в процессе обслуживания</p>
                <Table
                    names={names()}
                    values={values2()}
                    tooltips={[]}
                    bestPosition2={bestPosition2()}
                />
            </section>
        </>}
    </section>
}

export default IncomingCallProfile_5;