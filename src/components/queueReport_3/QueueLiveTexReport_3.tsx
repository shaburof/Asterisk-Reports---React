import React, { useEffect, useState } from 'react';
import { getCurrentDateTimeForInputFormat, setDate_withCheck, numberToStringTime, getData } from '../../dev/helpers';
import { devLiveText_3 } from '../../dev/data';
import Form1 from '../UI/form1/Form1';
import typeLiveTexReport_3State from '../../types/typeLiveTexReport_3State';
import Spinner from '../UI/spinner/spinner';
import Table from '../UI/table/Table';
import { debug } from '../../container/App';

const QueueReport_3: React.FC<typeLiveTexReport_3State> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [rataIsReceive, setDataIsReceive] = useState<boolean>(false);

    useEffect(() => {

        Object.keys(props.result).length !== 0 ?? setDataIsReceive(true);

        // TODO для тестирования, получения fake данных, 03.11.2020
        // setLoading(true);
        // props.set(prev => ({ ...prev, liveTexResult: devLiveText_3 }));
        // setDataIsReceive(true);
        // setLoading(false);
        // getDataHandler();
        // TODO для тестирования, получения fake данных, 03.11.2020

    }, []);

    useEffect(() => {
        if (props.getData.get === true) {
            getDataHandler();
            props.getData.set(prev => false);
        }
    }, [props.getData.get]);

    useEffect(() => {
        if (Object.keys(props.result).length > 0) {
            setDataIsReceive(true);
        }
    }, [props.result]);

    const getDataHandler = async () => {
        setDataIsReceive(false)
        setLoading(true);
        props.setError(false);
        try {
            let { data } = await getData('getLiveTexReport_3', props.startDate.split('T').join(' '), props.finishDate.split('T').join(' '));
            props.set(prev => ({ ...prev, liveTexResult: data.content.result }));

            // props.set(prev => ({ ...prev, liveTexResult: devLiveText_3 }));

            // setDataIsReceive(true);
            setLoading(false);
        } catch (err) {
            debug && console.log('some error 5', err);
            setLoading(false);
            props.setError(true);
        }
    }


    let names = () => {
        return [
            'операторские группы',
            'обслуженные чаты, шт',
            'потерянные чаты, шт',
            'уровень обслуживания, %',
            'среднее число чатов в час, шт',
            'число чатов в час наибольшей нагрузки, шт',
            'час самой наибольшей нагрузки',
            'средняя скорость ответа',
            'процент немедленного ответа, %',
            'максимальная задержка с ответом',
            'число чатов, ожидавших ответа более 20 секунд, шт.',
            'среднее время, после которого клиенты закрывают чат, не дождавшись ответа, шт',
            'среднее время обслуживания',
            'среднее время чата с клиентом ',
        ]
    }
    let values = () => {
        let data: any = [];
        let indicators = props.result as any;

        let a: any = [];
        a.push(<span>{indicators.$queueName}</span>);
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

        data.push(a);

        return data;
    }

    let tooltip = () => {
        return [
            '',
            'чаты, на которые абоненты получили ответ оператора',
            'чаты, абоненты которых закрыли окно, не дождавшись ответа оператора',
            'процент чатов, обслуженных с заданной скоростью ответа 10 сек = ( число вызовов, получивших ответ оператора в течение 10 сек. / (обслуженные чаты  + потерянные чаты )) * 100',
            'среднее число обслуженных чатов в час, среднее считается по количеству часовых диапазонов (00:00-00:59; 01:00-01:59…23:00-23:59)',
            'наибольшее количество обслуженных чатов в час',
            'время наибольшей нагрузки',
            'среднее время, в течение которого абонент ждет ответа оператора = общее время, проведенное вызовами в ожидании ответа / обслуженные чаты',
            'оператор ответил в течение двух секунд',
            'максимальное время ожидания ответа',
            '',
            'общее время ожидания по всем чатам, абоненты которых не дождались ответа / потрерянные вызовы',
            'средняя скорость ответа + среднее время чата с клиентом',
            '',
        ];
    }

    return <section>
        {loading && <div className="col-sm-12 centered"><Spinner liveTexSpinner /></div>}
        {rataIsReceive && <section style={{ margin: '0 30px' }}><Table
            names={names()}
            values={values()}
            tooltips={tooltip()}
        /></section>
        }

        {/* <Form1 startDate={props.startDate} finishDate={props.finishDate}
                setStartDate_withCheck={(date) => setDate(date, 'startDate')}
                setFinishDate_withCheck={(date) => setDate(date, 'finishDate')}
                dateTime={true}
                ready={ready} loading={props.loading} onClickSearchHandler={formSubmitHandler}
            /> */}
        {/* {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
        {rataIsReceive && <section style={{ margin: '0 30px' }}><Table
            names={names()}
            values={values()}
            tooltips={tooltip()}

        /></section>} */}
    </section>
}

export default QueueReport_3;