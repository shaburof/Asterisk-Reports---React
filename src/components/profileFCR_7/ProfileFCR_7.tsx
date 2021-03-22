import React, { useState, useEffect } from 'react';
import Form1 from '../UI/form1/Form1';
import { debug } from '../../container/App';
import { setDate_withCheck, getData } from '../../dev/helpers';
import typeProfileFCR_7State from '../../types/typeProfileFCR_7State';
import Spinner from '../UI/spinner/spinner';
import Graphic_7Component from './graphics/Graphic_7Component';
import classes from './profileFCR_7.module.scss';
import FcrInPersent from './FcrInPersent';
import { GRADIENT_COLORS } from '../../types/interfaces';


const ProfileFCR_7: React.FC<typeProfileFCR_7State> = (props) => {
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
            let { data } = await getData('profileFCR_7', props.startDate.split('T').join(' '), props.finishDate.split('T').join(' '));
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
            <Form1 startDate={props.startDate} finishDate={props.finishDate}
                setStartDate_withCheck={(date) => setDate(date, 'startDate')}
                setFinishDate_withCheck={(date) => setDate(date, 'finishDate')}
                dateTime={true}
                ready={ready} loading={props.loading} onClickSearchHandler={formSubmitHandler}
            />
        </div>
        {/* <Graphic_7Component data={[30, 70, 95]} id='graph1' title='test' categories={['one', 'two', 'three']} gradientColors={GRADIENT_COLORS.VIOLETY} /> */}
        <div className="container">
            {props.loading && <div className="col-sm-12 centered"><Spinner /></div>}
            {rataIsReceive && <>
                <div className={classes.graphAreaColumn}>
                    <FcrInPersent value={props.result.fcr.fcrResultPercent} />
                    <Graphic_7Component data={[props.result.fcr.uniqueRepeatedCallsInPercentageTerms, props.result.fcr.whenTheOperatorCalledBackInPercentageTerms, props.result.fcr.opinionInPercentageTerms]}
                        id='graph1' title='FCR'
                        categories={['повторное обращение абонента', 'оператор перезвонил абоненту', 'вызовы с оценкой ниже 5-ти баллов']}
                        gradientColors={GRADIENT_COLORS.VIOLETY} />
                </div>
                <div className={classes.graphArea}>
                    <Graphic_7Component data={[props.result.uniqueRepeatedCallsMetric[1], props.result.uniqueRepeatedCallsMetric[2], props.result.uniqueRepeatedCallsMetric[3], props.result.uniqueRepeatedCallsMetric[4]]} id='graph2' title='повторное обращение клиента'
                        categories={['1', '2', '3', '4+']} gradientColors={GRADIENT_COLORS.GREENY} />
                    <Graphic_7Component data={[props.result.whenTheOperatorCalledBackMetric[1], props.result.whenTheOperatorCalledBackMetric[2], props.result.whenTheOperatorCalledBackMetric[3], props.result.whenTheOperatorCalledBackMetric[4]]} id='graph3' title='оператор перезвонил абоненту'
                        categories={['1', '2', '3', '4+']} gradientColors={GRADIENT_COLORS.REDDY} />
                    <Graphic_7Component data={[props.result.opinionMetric[5], props.result.opinionMetric[4], props.result.opinionMetric[3], props.result.opinionMetric[2]]} id='graph4' title='удовлетворенность абонента'
                        categories={['5', '4', '3', '<=2']} gradientColors={GRADIENT_COLORS.CYANY} />
                </div>
            </>}
        </div>


    </section>
}

export default ProfileFCR_7;