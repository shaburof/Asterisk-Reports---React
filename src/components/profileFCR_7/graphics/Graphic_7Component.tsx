import React, { useEffect } from 'react';
import classes from './graph_7.module.scss';
import { GRADIENT_COLORS } from '../../../types/interfaces';

declare const Highcharts: any;

interface graphics_7Interface {
    data: number[],
    id: string,
    title: string,
    categories: string[],
    gradientColors: GRADIENT_COLORS
}

const Graphic_7Component: React.FC<graphics_7Interface> = (props) => {

    let chartColors: string[] = getchartBarColors();

    useEffect(() => {
        buildGraph();
    }, []);

    function getchartBarColors() {
        let chartColors: string[] = [];
        if (props.gradientColors === GRADIENT_COLORS.VIOLETY) {
            chartColors = ['#796197', '#c1a0c7', '#d7c0da', '#e9dfec'];
        } else if (props.gradientColors === GRADIENT_COLORS.GREENY) {
            chartColors = ['#8aa653', '#abd79b', '#c7e4bc', '#c7e4bc'];
        } else if (props.gradientColors === GRADIENT_COLORS.REDDY) {
            chartColors = ['#a84d4b', '#da94af', '#e6b7ca', '#f2dbe4'];
        } else if (props.gradientColors === GRADIENT_COLORS.CYANY) {
            chartColors = ['#489aae', '#92aedc', '#b7cae8', '#dae4f3'];
        }

        return chartColors;
    }

    const buildGraph = () => {
        Highcharts.chart(props.id, {
            chart: {
                width: 300,
                height: 300,
            },
            title: {
                text: props.title
            },
            // subtitle: {
            //     text: 'Plain'
            // },
            xAxis: {
                labels: {
                    enabled: true
                },
                categories: props.categories
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                title: {
                    text: '',
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: props.title === 'FCR' ? '{y} %' : '{y}'
                    },
                    pointPadding: 0,
                    groupPadding: 0
                },
                column: {
                    dataLabels: {
                        enabled: true,
                        borderRadius: 0,
                        y: -5,
                        shape: 'callout'
                    }
                }
            },
            series: [{
                type: 'column',
                colorByPoint: true,
                colors: chartColors,
                data: props.data,
                showInLegend: false
            }]
        });
    }


    return <div style={{ width: 'unset' }} className={classes.graph} id={props.id}></div>
}

export default Graphic_7Component;

