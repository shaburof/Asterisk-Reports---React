import { interfaceGraphicsHelper, interfaceGraphicsHelper2 } from '../../../types/interfaces';

declare const Highcharts: any;


export const chart: interfaceGraphicsHelper = (data1, min, max) => {
    Highcharts.setOptions({
        lang: {
            weekdays: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
        }
    });

    Highcharts.chart('incomingCallProfile_5chart', {
        time: {
            timezoneOffset: -5 * 60
        },
        chart: {
            type: 'area',
            // type: 'areaspline',
            zoomType: 'x',
        },
        title: {
            text: 'график вызовов'
        },
        subtitle: {
            // text: 'шаг выборки 30 минут'
            text: 'входящие вызовы в интервале 30 минут, обслуженные и потерянные'
        },
        xAxis: [
            {
                "type": "datetime",
                "labels": {
                    "format": "{value:%e %b<br>%H:%M}",
                },
                min: min !== 0 ? min : undefined,
                max: max !== 0 ? max : undefined,
                scrollbar: {
                    enabled: min !== 0 || max !== 0 ? true : false
                },
            }
        ],
        yAxis: {
            title: {
                text: 'колличество'
            }
        },
        tooltip: {
            shared: true,
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#1d96b2'],
                        [1, Highcharts.color('#1d96b2').setOpacity(0).get('rgba')]
                    ]
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const y = (this as any).y;
                        return (y != 0) ? y : "";
                    }
                },
                enableMouseTracking: false
            },
            areaspline: {
                fillOpacity: 0.2,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const Y = (this as any).y;
                        return Y != 0 ? Y : "";
                    },
                },
            }
        },
        series: [
            {
                color: '#1d96b2',
                name: '',
                data: data1,
                showInLegend: false
            },
            // {
            //     color: 'rgb(134,34,34,.1)',
            //     name: 'входящие2',
            //     data: data2
            // }
        ]
    });
};



export const chart2: interfaceGraphicsHelper2 = (data, min, max) => {
    let seriesArray = makeSeries(data!);


    Highcharts.setOptions({
        lang: {
            weekdays: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
        }
    });

    Highcharts.chart('incomingCallProfile_5chart', {
        time: {
            timezoneOffset: -5 * 60
        },
        chart: {
            // type: 'area',
            type: 'areaspline',
            zoomType: 'x',
        },
        title: {
            text: 'график вызовов (по очередям)'
        },
        subtitle: {
            // text: 'шаг выборки 30 минут'
            text: 'входящие вызовы в интервале 30 минут, обслуженные и потерянные'
        },
        xAxis: [
            {
                "type": "datetime",
                "labels": {
                    "format": "{value:%e %b<br>%H:%M}",
                },
                min: min !== 0 ? min : undefined,
                max: max !== 0 ? max : undefined,
                scrollbar: {
                    enabled: min !== 0 || max !== 0 ? true : false
                },
            }
        ],
        yAxis: {
            title: {
                text: 'колличество'
            }
        },
        tooltip: {
            shared: true,
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const y = (this as any).y;
                        return (y != 0) ? y : "";
                    }
                },
                enableMouseTracking: false
            },
            areaspline: {
                fillOpacity: 0.2,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const Y = (this as any).y;
                        return Y != 0 ? Y : "";
                    },
                },
            }
        },
        series: seriesArray
    });
};


function makeSeries(data: { [prop: string]: [number, number][][] }) {
    let seriesArray: any = [];

    Object.keys(data!).map(item => {
        seriesArray.push({
            name: item === 'ivr' ? 'ИВР' : item,
            data: data![item]
        });
    });

    return seriesArray;
}