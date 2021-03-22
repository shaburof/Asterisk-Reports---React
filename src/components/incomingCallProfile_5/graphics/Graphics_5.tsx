import React, { useEffect, useState, useMemo } from 'react';
import { interfaceGraphics_5, GRAPH } from '../../../types/interfaces';
import { chart, chart2 } from './graphicsHelper';
import classes from './graphics.module.scss';

const Graphics_5: React.FC<interfaceGraphics_5> = (props) => {

    const [graph, setGraph] = useState<GRAPH.GRAPH1 | GRAPH.GRAPH2>(GRAPH.GRAPH1);
    const [min, max] = useMemo(calculateMinMax, [props.graphicData]);
    const chart2data = useMemo(prepareChart2data, [props.graphicData]);

    useEffect(() => {
        // let d1: [number, number, { [prop: string]: [number, number][] }][] = [[12, 15, { 123: [[1, 2]] }]];chart(d1, 0, 0);
        chart(props.graphicData, min, max);
    }, []);

    const switchGraphicsHandler = () => {
        graph === GRAPH.GRAPH2 ? chart(props.graphicData, min, max) : chart2(chart2data, min, max);
        setGraph(prev => graph === GRAPH.GRAPH1 ? GRAPH.GRAPH2 : GRAPH.GRAPH1);
    }

    function calculateMinMax() {
        let min = 0;
        let max = 0;
        let data1 = new Date(props.startDate).getTime();
        let data2 = new Date(props.finishDate).getTime();
        if (((data2 - data1) / 1000) >= 172740) {
            min = new Date(data2 - 172740000).getTime();
            max = data2
        };

        return [min, max];
    }

    function prepareChart2data() {
        let chart2data: { [prop: string]: [number, number][][] } = {};
        props.graphicData?.forEach(data => {
            Object.keys(data[2]).forEach(queueName => {
                // let [st, ct, name] = data[2][queueName];
                let data2 = data[2][queueName];
                if (typeof chart2data[queueName] === 'undefined') {
                    chart2data[queueName] = [data2];
                } else {
                    chart2data[queueName].push(data2);
                }
            })
        });

        return chart2data;
    }

    return <section className={classes.graphSection}>
        <img onClick={switchGraphicsHandler} className={classes.switchButton} src="/opinion/images/circular_black.png" alt="switch button" />
        <div className={classes.graph} id="incomingCallProfile_5chart"></div>
    </section>
}

export default Graphics_5;

