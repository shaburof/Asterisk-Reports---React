import React, { useEffect, useState } from 'react';
import { getCurrentDateTimeForInputFormat, setDate_withCheck, numberToStringTime, getData } from '../../dev/helpers';
import { devQueueReport_3 } from '../../dev/data';
import Form1 from '../UI/form1/Form1';
import typeQueryReport_3State from '../../types/typeQueryReport_3State';
import Spinner from '../UI/spinner/spinner';
import Table from '../UI/table/Table';
import { debug } from '../../container/App';
import QueueLiveTexReport_3 from './QueueLiveTexReport_3';


const QueueReport_3: React.FC<typeQueryReport_3State> = (props) => {

    const [ready, setReady] = useState<boolean>(false);
    const [rataIsReceive, setDataIsReceive] = useState<boolean>(false);
    const [showLiveTex, setShowLiveTex] = useState<boolean>(false);
    const [getLiveTexData, setGetLiveTexData] = useState<boolean>(false);



    useEffect(() => {


        Object.keys(props.result).length === 0
            ? setDataIsReceive(false)
            : (() => {
                setDataIsReceive(true);
                setShowLiveTex(true);
            })();

        // TODO для тестирования, получения fake данных, 03.11.2020
        // setShowLiveTex(true);
        // props.set(prev => ({ ...prev, result: devQueueReport_3 }));
        // setDataIsReceive(true);
        // props.set(prev => ({ ...prev, loading: false }));
        // TODO для тестирования, получения fake данных, 03.11.2020

        // return () => {
        //     props.setLoading(false);
        // }
    }, []);

    useEffect(() => {
        setReady(prev => chechReady());
    }, [props.startDate, props.finishDate]);


    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        props.set(prev => ({ ...prev, loading: true }));
        props.setError(false);
        setDataIsReceive(false);
        try {
            setShowLiveTex(true);
            setGetLiveTexData(true);
            let { data } = await getData('queuereport_3', props.startDate.split('T').join(' '), props.finishDate.split('T').join(' '));
            props.set(prev => ({ ...prev, result: data.content }));
            // values();
            setDataIsReceive(true);
        } catch (err) {
            debug && console.log('some error 5', err);
            props.setError(true);
        }
        props.set(prev => ({ ...prev, loading: false }));
    }

    let chechReady = () => {
        if (props.startDate < props.finishDate) return true;
        return false;
    }
    let setDate = (date: string, dateType: string) => {
        props.set(prev => {
            return { ...prev, [dateType]: setDate_withCheck(date, true) }
        });
    }
    let names = () => {
        return [
            'операторские группы',
            'обслуженные вызовы, шт',
            'потерянные вызовы, шт',
            'уровень обслуживания, %',
            'среднее число вызовов в час, шт',
            'число вызовов в час наибольшей нагрузки, шт',
            'час самой наибольшей нагрузки',
            'средняя скорость ответа',
            'процент немедленного ответа, %',
            'максимальная задержка с ответом',
            'число вызовов, ожидавших ответа более 40 секунд, шт.',
            'среднее время, после которого абоненты кладут трубку, не дождавшись ответа, шт',
            'среднее время обслуживания',
            'среднее время разговора с клиентом ',
            'среднее время поствызывной обработки',
        ]
    }
    let values = () => {
        let data: any = [];
        for (const item in props.result) {
            let a: any = [];

            let indicators = props.result[item];

            a.push(<span>{item}<p style={{ margin: '0', fontSize: '10px' }}>{indicators.$queueName}</p></span>);
            a.push(indicators.$servedCalls_2);
            a.push(indicators.$abandonedCalls_4);
            a.push(indicators.$serviceLevel_5 + ' %');
            a.push(indicators.$averageNumberOfCallPerHour_20);
            a.push(indicators.$numberOfCallsPerBusyHour_21);
            a.push(<span>{indicators.$datetimeOfCallsPerBusyHour_nn1.date}<p style={{ margin: '0', fontSize: '12px' }}>{indicators.$datetimeOfCallsPerBusyHour_nn1.start}-{indicators.$datetimeOfCallsPerBusyHour_nn1.finish}</p></span>);
            a.push(numberToStringTime(indicators.$averageResponseRate_6));
            a.push(indicators.$percentageOfImmediateResponse_22 + ' %');
            a.push(numberToStringTime(indicators.$maximumResponseDelay_7));
            a.push(indicators.$numberOfCustomersWaitingForTheOperatorResponse_nn2);
            a.push(numberToStringTime(indicators.$averageTimeToAbandon_9));
            a.push(numberToStringTime(indicators.$averageServiceTime_10));
            a.push(numberToStringTime(indicators.$averageTalkTime_11));
            a.push(numberToStringTime(indicators.$averagePostCallTime_13));

            data.push(a);
        }
        // setVal(prev => data);

        return data;
    }
    let tooltip = () => {
        return [
            '',
            'вызовы, на которые абоненты получили ответ оператора',
            'вызовы, абоненты которых повесили трубку, не дождавшись ответа оператора (рассчитывается по звонкам, находившимся в очереди дольше одной секунды)',
            'процент вызовов, обслуженных с заданной скоростью ответа 20 сек = ( число вызовов, получивших ответ оператора в течение 20 сек. / (обслуженные вызовы  + потерянные вызовы )) * 100 (в скорость ответа не входит время ivr меню)',
            'среднее число обслуженных вызовов в час, среднее считается по количеству часовых диапазонов (00:00-00:59; 01:00-01:59…23:00-23:59)',
            'наибольшее количество обслуженных вызовов в час',
            'время наибольшей нагрузки (по вхоящим вызовам)',
            'среднее время, в течение которого абонент ждет ответа оператора = общее время, проведенное вызовами в очереди / обслуженные вызовы',
            'оператор ответил в течение 1-го гудка (двух секунд)',
            'максимальное время ожидание в очереди (только для отвеченных вызовов)',
            '',
            'общее время ожидания по всем звонкам, абоненты которых положили трубку, не дождавшись ответа оператора / потрерянные вызовы',
            'средняя скорость ответа + среднее время разговора с клиентом + среднее время поствызывной обработки',
            '',
            'время затраченное оператором на обработку запроса клиента после завершения разговора (регистрация обращения, внесение информации в БД ид.)',
        ];
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
            <section style={{ margin: '0 30px' }}><Table
                names={names()}
                // values={val}
                values={values()}
                tooltips={tooltip()}
            /></section>
        </>}
        {showLiveTex &&
            <QueueLiveTexReport_3
                getData={{ get: getLiveTexData, set: setGetLiveTexData }}
                result={props.liveTexResult}
                set={props.set}
                startDate={props.startDate}
                finishDate={props.finishDate}
                setError={props.setError}
            />}
    </section>
}

export default QueueReport_3;