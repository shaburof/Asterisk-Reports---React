import React, { useEffect } from 'react';
import { numberToStringTime } from '../../../dev/helpers';
import classes from '../graph_6.module.scss';
import { GRADIENT_COLORS } from '../../../types/interfaces';
import { updateFor } from 'typescript';
declare const Highcharts: any;

interface graphics_6Interface {
    id: string,
    position: 'UP' | 'DOWN',
    gradientColors: GRADIENT_COLORS
    data: {
        name: string,
        y: number,
        time?: number,
        sliced?: boolean,
        selected?: boolean
    }[],
    title: string,
}

const Graphics_6Component: React.FC<graphics_6Interface> = (props) => {

    let localData: {
        name: string,
        y: number | string,
        time?: number,
        sliced?: boolean,
        selected?: boolean,
        plotOptions?: any,
    }[] = [];

    useEffect(() => {
        sortData();

        buildGraph();
    }, []);


    function getchartBarColors() {
        let chartColors: string[] = [];
        if (props.gradientColors === GRADIENT_COLORS.VIOLETY) {
            chartColors = ['#796197', '#c1a0c7', '#d7c0da', '#e9dfec'];
        } else if (props.gradientColors === GRADIENT_COLORS.GREENY) {
            chartColors = ['#8aa653', '#abd79b', '#c7e4bc', '#d2e4d0'];
        } else if (props.gradientColors === GRADIENT_COLORS.REDDY) {
            chartColors = ['#a84d4b', '#da94af', '#e6b7ca', '#f2dbe4'];
        } else if (props.gradientColors === GRADIENT_COLORS.CYANY) {
            chartColors = ['#489aae', '#92aedc', '#b7cae8', '#dae4f3'];
        }

        return chartColors;
    }


    const sortData = () => {
        localData = props.data.sort((a, b) => {
            if (a.y > b.y) return -1;
            if (a.y < b.y) return 1;
            return 0;
        });
        localData[0] = { ...localData[0], sliced: true, selected: true };
        // localData[0] = { ...localData[0], sliced: true, selected: true };
    }

    const buildGraph2 = () => {
        Highcharts.chart(props.id, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Browser<br>shares<br>2017',
                align: 'center',
                verticalAlign: 'middle',
                y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: 0,
                    endAngle: 360,
                    // center: ['50%', '75%'],
                    // size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '50%',
                data: [
                    ['Chrome', 58.9],
                    ['Firefox', 13.29],
                    ['Internet Explorer', 13],
                    ['Edge', 3.78],
                    ['Safari', 3.42],
                    {
                        name: 'Other',
                        y: 7.61,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
        });

    }

    const buildGraph = () => {
        // Build the chart
        Highcharts.chart(props.id, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: props.title
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            // accessibility: {
            //     point: {
            //         valueSuffix: '%'
            //     }
            // },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            let _this = this as any;

                            let title = _this.key;
                            let y = _this.y;
                            if (y === 0) return;
                            let time = _this.point.time ? `<br />${numberToStringTime(_this.point.time)}` : '';
                            return `<span style="font-weight:bold;">${title}</span><br/>${y} шт.${time}`;
                        },
                        style: {
                            fontWeight: 'normal',
                        }
                    },
                }
            },
            series: [{
                name: '',
                // innerSize: '30%',
                colors: getchartBarColors(),
                colorByPoint: true,
                data: localData
            }]
        });
    }

    return props.position === 'UP'
        ? <div className={classes.graph} id={props.id}></div>
        : <div className={classes.graph2} id={props.id}></div>
}

export default Graphics_6Component;