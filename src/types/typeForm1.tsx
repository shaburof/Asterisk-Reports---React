import React from 'react';

interface typeForm1{
    startDate: string,
    finishDate: string,
    setStartDate_withCheck: Function,
    setFinishDate_withCheck: Function,
    ready: boolean,
    loading: boolean,
    onClickSearchHandler: (e: React.FormEvent) => void,
    dateTime?:boolean
}

export default typeForm1;