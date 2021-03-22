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

    const preparedData = (): any[] => {
        let preparedDataValues: any = [];
        for (const operatorName in props.result) {
            let exts = props.result[operatorName];
            for (const ext in exts) {
                let temp: any = [];
                if (ext === props.queue) {
                    if (Object.keys(exts[ext]).length > 0) {
                        temp.push(operatorName);
                        temp.push(numberToStringTime(exts[ext]['totalOperatorTime_41']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnService_40']));
                        temp.push(exts[ext]['$operatorWorkload_14'] + ' %');
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnServicingIncomingCalls_28']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnExternalOutgoingCalls_29']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeSpentOnInternalOutgoingCalls_30']));
                        temp.push(numberToStringTime(exts[ext]['$totalPostCallTime_31']));
                        temp.push(numberToStringTime(exts[ext]['onlineChatHours_32']));
                        temp.push(numberToStringTime(exts[ext]['totalBreakTime_34']));
                        temp.push(numberToStringTime(exts[ext]['$totalTimeWaitingForCall_35']));
                        // temp.push((exts[ext]['totalOperatorTime_41']));
                        // temp.push((exts[ext]['$totalTimeSpentOnService_40']));
                        // temp.push(exts[ext]['$operatorWorkload_14']+' %');
                        // temp.push((exts[ext]['$totalTimeSpentOnServicingIncomingCalls_28']));
                        // temp.push((exts[ext]['$totalTimeSpentOnExternalOutgoingCalls_29']));
                        // temp.push((exts[ext]['$totalTimeSpentOnInternalOutgoingCalls_30']));
                        // temp.push((exts[ext]['$totalPostCallTime_31']));
                        // temp.push((exts[ext]['onlineChatHours_32']));
                        // temp.push((exts[ext]['totalBreakTime_34']));
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
        if (queueList.includes('0993')) {
            let index = queueList.indexOf('0993')
            let value = devQueueList[index];
            queueList.splice(index, 1);
            queueList.unshift(value);
            props.set(prev => { return { ...prev, queue: '0993', queueList: devQueueList } });
        }
        else props.set(prev => { return { ...prev, queue: devQueueList[0], queueList: devQueueList } });
    }

    const selectHandler = (selectValue: string) => {
        props.set(prev => {
            return { ...prev, queue: selectValue };
        });
    }

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setError(false);
        props.set(prev => ({ ...prev, loading: true }));
        try {
            let { data } = await getData('operatorWorkingTimeStructure_8', props.day, '');
            props.set(prev => ({ ...prev, result: data.content }));
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
            'время затраченное на обслеживание',
            'уровень загруженности оператора, %',
            'время затраченное на обслужевание входящих вызовов',
            'время затраченное на исходящие вызовы (внешние, клиентам)',
            'время затраченное на внутренние вызовы (разговоры внутри банка)',
            'время затраченное на поствызывную обработку вызова',
            'время работы в онлайн-чате',
            'время перерыва',
            'время в ожидании вызова',
        ];
    }

    const tooltips = () => {
        return [
            '',
            'cумма времени работы оператора в системе КЦ в интервале от входа в систему до выхода из нее, в течении дня может быть несколько таких интервалов из-за сбоя',
            'время затраченное на обслужевание входящих вызовов + время затраченное на исходящие вызовы (внешние, клиентам) + время затраченное на внутренние вызовы (разговоры внутри банка) + время затраченное на поствызывную обработку вызова + время работы в онлайн-чате',
            'общее время всех разговоров оператора (входящие + исходящие внешние в внутренние) + общее время поствызывной обработки + время рабты в онлайн-чате / время пребывания в системе - время на обед',
            'общее время входящих вызовов которые поступили в указанные очереди (учитываются звонки только в очередь, т.е. звонки напрямую оператору не расчитываются)',
            'расчитывается как общее время на линии (только звонки на внешние номера),также учитывается время не отвеченных вызовов',
            'расчитывается как общее время на линии  (только звонки на внутренние номера), также учитывается время не отвеченных вызовов',
            'время поствызывной обработки (берется из типа паузы "Обработка звонка" и "Регистрация обращения в Directum")',
            'сумма времени в чате (берется из типа пауз "Чат" и "WhatsUp")',
            'сумма времени затраченное на перерывы в работе, обеденное время + технологические (берется из типа паузы "Перерыв" и "Обед")',
            'время нахождения сотрудника на линии в готовности принять звонок (сумма всего времени между тем как оператор положил трубку и ему позвонили в следующий раз (при этом оператор не должен находяться на паузе). Учитываются исходящие звонки оператора во время ожидания вызова. Время исходящего звонка вычитается из времени удержания, если оно попадает на время ожидания)',
        ]
    }

    return <>
        <Form2
            onClickSearchHandler={formSubmitHandler}
            data={props.day}
            loading={props.loading}
            queue={props.queue}
            queueList={props.queueList}
            selectHandler={selectHandler}
            setDate_withCheck={(data: string) => props.set(prev => ({ ...prev, day: setDate_withCheck(data) }))}
        />
        <div className="container">
            {rataIsReceive && <Table
                bestPosition={bestPosition()}
                tooltips={tooltips()}
                names={names()}
                values={preparedData()}
            />}
            {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
        </div>
    </>
}

export default OperatorWorkingTimeStructure_8;