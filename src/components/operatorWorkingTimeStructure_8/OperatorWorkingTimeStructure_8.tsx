import React, { useState, useEffect } from 'react';
import typeOperatorWorkingTimeState from '../../types/typeOPeratorWorkingTimeStructure_8State';
import { devQueueList } from '../../dev/data';
import Form2 from '../UI/form2/Form2';
import { setDate_withCheck, numberToStringTime, getData } from '../../dev/helpers';
import Table from '../UI/table/Table';
import { typeBestPosition } from '../../types/typeTable';
import Spinner from '../UI/spinner/spinner';
import { debug } from '../../container/App';

const OperatorWorkingTimeStructure_8: React.FC<typeOperatorWorkingTimeState> = (props) => {

    const [rataIsReceive, setDataIsReceive] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false);
    let queueList: string[] = [];

    useEffect(() => {
        (async () => {
            if (props.queueList.length === 0) {
                props.set(prev => ({ ...prev, loading: true }));
                let { data } = await getData('getQueueList', '', '');
                queueList = data.content;
                preorderQueueList();
                props.set(prev => ({ ...prev, loading: false }));
            }
        })();

        // for testing start
        // props.set(prev => ({ ...prev, result: devDataOperatorWorkingTimeStructure_8 }));
        // props.set(prev => ({ ...prev, bestPosition: 'Updated' }));
        // setDataIsReceive(true);
        // for testing finish
    }, [])


    useEffect(() => {
        //todo remove coment after testing проверяем что данные уже в хранилище, и если до то показываем таблицу
        Object.keys(props.result).length === 0 ? setDataIsReceive(false) : setDataIsReceive(true);
    }, [props.result]);;

    useEffect(() => {
        if (new Date(props.dayTwo) >= new Date(props.day)) {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [props.day, props.dayTwo]);


    const preparedData = (): any[] => {
        let preparedDataValues: any = [];
        for (const operatorName in props.result) {
            let exts = props.result[operatorName];
            for (const ext in exts) {
                if (ext === 'unite' && operatorName.includes('VIP ')) {
                    continue;
                }
                let temp: any = [];
                if (ext === props.queue) {
                    if (Object.keys(exts[ext]).length > 0) {
                        temp.push(operatorName);
                        temp.push(numberToStringTime(exts[ext]['totalOperatorTime_41']));
                        temp.push(numberToStringTime(exts[ext]['$timeSpentByTheOperatorInTheCallSystem_nn_5']));
                        temp.push(numberToStringTime(exts[ext]['$nonOperationalHoursOfTheOperator_nn_2']));
                        temp.push(numberToStringTime(exts[ext]['nightTimeOfTheOperator_nn_3']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnService_40']));
                        temp.push(exts[ext]['$operatorWorkload_14'] + ' %');
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnServicingIncomingCalls_28']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnExternalOutgoingCalls_29']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnInternalOutgoingCalls_30']));
                        temp.push(numberToStringTime(exts[ext]['$totalPostCallTime_31']));
                        temp.push(numberToStringTime(exts[ext]['onlineChatHours_32']));
                        temp.push(numberToStringTime(exts[ext]['totalBreakTime_34']));
                        temp.push(numberToStringTime(exts[ext]['$timeSpentOnImprovingProfessionalCompetencies_nn4']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeWaitingForCall_35']));

                        // temp.push((exts[ext]['totalOperatorTime_41']));
                        // temp.push((exts[ext]['$timeSpentByTheOperatorInTheCallSystem_nn_5']));
                        // temp.push((exts[ext]['$nonOperationalHoursOfTheOperator_nn_2']));
                        // temp.push((exts[ext]['nightTimeOfTheOperator_nn_3']));
                        // temp.push((exts[ext]['$totalTimeSpentOnService_40']));
                        // temp.push(exts[ext]['$operatorWorkload_14'] + ' %');
                        // temp.push((exts[ext]['$totalTimeSpentOnServicingIncomingCalls_28']));
                        // temp.push((exts[ext]['$totalTimeSpentOnExternalOutgoingCalls_29']));
                        // temp.push((exts[ext]['$totalTimeSpentOnInternalOutgoingCalls_30']));
                        // temp.push((exts[ext]['$totalPostCallTime_31']));
                        // temp.push((exts[ext]['onlineChatHours_32']));
                        // temp.push((exts[ext]['totalBreakTime_34']));
                        // temp.push((exts[ext]['$timeSpentOnImprovingProfessionalCompetencies_nn4']));
                        // temp.push((exts[ext]['$totalTimeWaitingForCall_35']));
                        preparedDataValues.push(temp);
                    }
                }
            }

        }

        return preparedDataValues;
    }

    const bestPosition = () => {
        // колличество операторов в выбранной очереди
        // let resultCount = 0;
        // Object.values(props.result).map(value => {
        //     let res = Object.keys(value).find(queue => {
        //         if (queue === props.queue) resultCount++;
        //     });
        // });

        const ifStatments = (arr, result) => {
            for (const item of arr) {
                if (typeof bestPositionDataValues[item.i] === 'undefined') {
                    bestPositionDataValues[item.i] = {
                        lgIndex: item.lg ? [] : undefined, lgValue: item.lg ? null : undefined,
                        gtIndex: item.gt ? [] : undefined, gtValue: item.gt ? null : undefined,
                        lgIsBad: item.lgIsBad
                    };
                }
                if (result[item.name] > bestPositionDataValues[item.i].gtValue!) {
                    bestPositionDataValues[item.i].gtValue = result[item.name];
                    bestPositionDataValues[item.i].gtIndex![0] = index;
                }
                if (typeof bestPositionDataValues[item.i].lgIndex !== 'undefined' && (result[item.name] < bestPositionDataValues[item.i].lgValue!) || bestPositionDataValues[item.i].lgValue === null) {
                    bestPositionDataValues[item.i].lgValue = result[item.name];
                    bestPositionDataValues[item.i].lgIndex![0] = index;
                } else if (typeof bestPositionDataValues[item.i].lgIndex !== 'undefined' && (result[item.name] === bestPositionDataValues[item.i].lgValue!) || bestPositionDataValues[item.i].lgValue === null) {
                    bestPositionDataValues[item.i].lgIndex!.push(index);

                    // если у всех операторов значение имеет одно значение не выделять его
                    // if (bestPositionDataValues[item.i].lgIndex?.length === resultCount) bestPositionDataValues[item.i].lgIndex = [];
                }
            }
        }


        let bestPositionDataValues: typeBestPosition = {};
        let index = 0;
        for (const operatorName in props.result) {
            let exts = props.result[operatorName];
            for (const ext in exts) {
                if (ext === props.queue) {
                    ifStatments([{ i: 3, name: '$operatorWorkload_14', gt: true, lg: true, lgIsBad: true }], exts[ext]);
                    ifStatments([{ i: 9, name: 'totalBreakTime_34', gt: true, lg: false, lgIsBad: false }], exts[ext]);
                    index++;
                }

            }
        }
        // если в результатах меньше 4 позиций не выделять результаты в bestPosition
        if (index < 4) return {};

        return bestPositionDataValues;
    }

    const preorderQueueList = () => {

        if (props.queue.length > 0) return;
        if (queueList.includes('unite')) {
            let index = queueList.indexOf('unite')
            let value = queueList[index];
            queueList.splice(index, 1);
            queueList.unshift(value);
            props.set(prev => { return { ...prev, queue: 'unite', queueList: queueList } });
        }
        else props.set(prev => { return { ...prev, queue: devQueueList[0], queueList: queueList } });
    }

    const selectHandler = (selectValue: string) => {

        props.set(prev => {
            return { ...prev, queue: selectValue };
        });
    }

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setError(false);
        setDataIsReceive(false);
        props.set(prev => ({ ...prev, loading: true }));
        try {
            let { data } = await getData('operatorWorkingTimeStructure_8', props.day, props.dayTwo);
            let { operators, liveTex } = data.content;

            props.set(prev => ({ ...prev, result: operators, liveTex: liveTex }));
        } catch (err) {
            debug && console.log('some err 3', err);
            props.setError(true);
        }
        props.set(prev => ({ ...prev, loading: false }));
        // setDataIsReceive(true);
    }

    const names = () => {
        return [
            'ФИО оператора',
            'общее время работы оператора',
            'время нахождения оператора в системе вызовов',
            'внеоперационное время работы оператора',
            'ночное время работы оператора',
            'время, затраченное на обслуживание',
            'уровень загруженности оператора, %',
            'время, затраченное на обслуживание входящих вызовов',
            'время, затраченное на исходящие вызовы (внешние, клиентам)',
            'время, затраченное на внутренние вызовы (разговоры внутри банка)',
            'время, затраченное оператором на обработку запроса клиента после завершения вызова',
            'время работы в онлайн-чате',
            'время перерыва',
            'время, затраченное на повышение профессиональных компетенций',
            'время в ожидании вызова',
        ];
    }

    const tooltips = () => {
        let tooltip = [
            '',
            'сумма времени работы оператора в системе КЦ в интервале от входа в систему до выхода из нее',
            'общее время работы оператора – внеоперационное время работы оператора - ночное время работы оператора - время перерыва',
            'время работы оператора в период «тишины» с 6-00 до 9-00 и 21-00 до 22-00',
            'время работы оператора в ночь, период с 22-00 до 6-00',
            'время, затраченное на обслуживание входящих вызовов + время, затраченное на исходящие вызовы + время, затраченное на внутренние вызовы + время работы в онлайн-чате',
            'время, затраченное на обслуживание / время нахождения оператора в системе вызовов (если значение столбца «время нахождения оператора в системе вызовов» меньше или равно 2 часа, то для расчета нагрузки применяется значение столбца «общее время работы в оператора',
            'общее время затраченное оператором на обработку всех входящих вызовов',
            'общее время затраченное оператором на исходящие вызовы в т.ч. несостоявшиеся (только внешние вызовы)',
            'общее время затраченное оператором на исходящие вызовы в т.ч. несостоявшиеся (только звонки внутри банка)',
            'время затраченное оператором на обработку запроса клиента после завершения разговора (регистрация обращения, внесение информации в БД ид.',
            'время работы оператора в онлайн-чатах (чат www.emb.ru; Whatsapp; Viber; vk.com; Fасеbook) (данные получены от liveTex)',
            'время, предоставленное для отдыха и питания ст. 108 ТК РФ',
            'время присутствия сотрудника на обучении, утренней «летучке», оценка результатов и обратная связь руководителя',
            'общее время нахождения оператора на линии в «простое»',
        ];
        if (!props.liveTex) tooltip[11] = 'время работы оператора в онлайн-чатах (чат www.emb.ru; Whatsapp; Viber; vk.com; Fасеbook) (данные получены из типа паузы "ЧАТ")';
        return tooltip;
    }

    const liveTexNotAvailableError = () => <div style={{ fontSize: '12px', margin: 'unset', color: 'orangered', textAlign: 'center' }}>
        <svg style={{ width: '30px' }} viewBox="0 0 16 16" className="bi bi-exclamation-diamond" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
        </svg>
        <p style={{ margin: 'unset', marginTop: '-7px', color: 'gray' }}>сервер livetex недоступен</p>
        <p style={{ margin: 'unset', marginTop: '-5px' }}>данные по времени работы в онлайн-чате беруться из типа паузы "ЧАТ"</p>
    </div>;

    return <>
        <Form2 onClickSearchHandler={formSubmitHandler}
            data={props.day}
            dataTwo={props.dayTwo}
            loading={props.loading}
            queue={props.queue}
            queueList={props.queueList}
            selectHandler={selectHandler}
            setDate_withCheck={(data: string) => props.set(prev => ({ ...prev, day: setDate_withCheck(data) }))}
            setDate_withCheckTwo={(data2: string) => props.set(prev => ({ ...prev, dayTwo: setDate_withCheck(data2) }))}
            ready={ready}
        />
        <div style={{ padding: '0 20px' }}>
            {rataIsReceive && <>
                {!props.liveTex ? liveTexNotAvailableError() : ''}
                <p style={{ fontSize: '12px', margin: 'unset', color: 'gray', fontStyle: 'italic' }}><b>Примечание:</b> операторы не вошедшие в очередь в течении выбранного периода не учавствуют в расчете</p>
                <Table
                    // bestPosition={bestPosition()}
                    tooltips={tooltips()}
                    names={names()}
                    values={preparedData()}
                />
            </>}
            {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
        </div>
    </>
}

export default OperatorWorkingTimeStructure_8;