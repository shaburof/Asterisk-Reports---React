import React, { useEffect, useState } from 'react';
import Form1 from '../UI/form1/Form1';
import { debug } from '../../container/App';
import { setDate_withCheck, getData, numberToStringTime } from '../../dev/helpers';
import Spinner from '../UI/spinner/spinner';
import typecommProfile_6 from '../../types/typeTcommProfile_6State';
import Graphics_6Component from './graphics/Graphics_6Component';
import classes from './graph_6.module.scss';
import PhoneDescription from './PhoneDescription';
import { GRADIENT_COLORS } from '../../types/interfaces';


const TcommProfile_6: React.FC<typecommProfile_6> = (props) => {
    const [ready, setReady] = useState<boolean>(false);
    const [rataIsReceive, setDataIsReceive] = useState<boolean>(false);

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
            const { data } = await getData('TcommProfile_6', props.startDate.split('T').join(' '), props.finishDate.split('T').join(' '));
            props.set(prev => ({ ...prev, result: data.content }));
            setDataIsReceive(true);
        } catch (err) {
            debug && console.log('some error in Profile_FCR_8', err);
            props.setError(true);
        }
        props.set(prev => ({ ...prev, loading: false }));
    }

    return <section>
        <div className="container">
            <div className="container">
                <Form1 startDate={props.startDate} finishDate={props.finishDate}
                    setStartDate_withCheck={(date) => setDate(date, 'startDate')}
                    setFinishDate_withCheck={(date) => setDate(date, 'finishDate')}
                    dateTime={true}
                    ready={ready} loading={props.loading} onClickSearchHandler={formSubmitHandler}
                />
            </div>
        </div>
        <div className="container">

            {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
            {rataIsReceive && <section>
                <div className={classes.graphArea}>
                    <Graphics_6Component id="graph_6_1" title='Структура вызовов' position={"UP"}
                        gradientColors={GRADIENT_COLORS.GREENY}
                        data={[
                            { name: 'входящие из очереди', y: props.result.insideCalls.externalCount, time: props.result.insideCalls.externalByTime },
                            { name: 'исходящие абонентам', y: props.result.outsideCalls.externalCount, time: props.result.outsideCalls.externalByTime },
                            { name: 'входящие от сотрудников', y: props.result.insideCalls.internalCount, time: props.result.insideCalls.internalByTime },
                            { name: 'исходящие сотрудникам', y: props.result.outsideCalls.internalCount, time: props.result.outsideCalls.internalByTime },
                        ]} />
                </div>
                <div className={classes.graphAreaSpaceBetween}>
                    <Graphics_6Component id="graph_6_2" title='Входящие от сотрудников' position={"DOWN"}
                        gradientColors={GRADIENT_COLORS.CYANY}
                        data={[
                            { name: 'HD', y: props.result.insideCalls.hdCallsCount },
                            { name: 'MIDDLE', y: props.result.insideCalls.middleCallsCount },
                            { name: 'ОПЕРУ', y: props.result.insideCalls.operuCallsCount },
                            { name: 'ПРОЧИЕ', y: props.result.insideCalls.othersCallsCount },
                        ]} />
                    <Graphics_6Component id="graph_6_3" title='Исходящие сотрудникам' position={"DOWN"}
                        gradientColors={GRADIENT_COLORS.VIOLETY}
                        data={[
                            { name: 'HD', y: props.result.outsideCalls.hdCallsCount },
                            { name: 'MIDDLE', y: props.result.outsideCalls.middleCallsCount },
                            { name: 'ОПЕРУ', y: props.result.outsideCalls.operuCallsCount },
                            { name: 'ПРОЧИЕ', y: props.result.outsideCalls.othersCallsCount },
                        ]} />
                </div>
                <PhoneDescription
                    title={['HD', 'MIDDLE', 'ОПЕРУ', 'ИСКЛЮЧЕНЫ ИЗ РАСЧЕТА']}
                    data={[props.result.hdPhones, props.result.middlePhones, props.result.operuPhones, props.result.excludePhones]} />
            </section>}
        </div>
    </section>
}

export default TcommProfile_6;