import { routeTypes } from './types/routeTypes';

export const routes = [
    { name: 'Оперативный отчет', link: '/operationReport_2', type: routeTypes.operationReport_2 },
    { name: 'Очереди в разрезе операторских групп', link: '/queuereport_3', type: routeTypes.queryResult_3 },
    { name: 'Структура рабочего времени операторов', link: '/operatorWorkingTimeStructure_8', type: routeTypes.operatorWorkingTimeStructure_8 },
    { name: 'Профиль входящих вызовов', link: '/incomingCallProfile_5', type: routeTypes.incomingCallProfile_5 },
    { name: 'Профиль FCR', link: '/profilefcr_7', type: routeTypes.profileFCR_7 },
    { name: 'Профиль телефонных коммуникаций', link: '/tcommprofile_6', type: routeTypes.tcommProfile_6 },
];