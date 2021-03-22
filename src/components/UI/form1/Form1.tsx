import React from 'react';
import SubmitButton from '../submitButton/SubmitButton';
import classes from './form1.module.scss';
import typeForm1 from '../../../types/typeForm1';

const Form1: React.FC<typeForm1> = (props) => {

    const buttonClass = (props.loading || !props.ready) ? 'btn btn-sm btn-secondary ' + classes.disabledButton : 'btn btn-sm btn-primary'

    return <form onSubmit={props.onClickSearchHandler} className={classes.form1}>
        <div className="col-sm-12">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="inputDate">Начальная дата:</label>
                        <input type={props.dateTime?'datetime-local':'date'} className="form-control text-center" value={props.startDate}
                            onChange={(e) => props.setStartDate_withCheck(e.target.value)} />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label htmlFor="inputDate">Конечная дата:</label>
                        <input type={props.dateTime?'datetime-local':'date'} className="form-control text-center" value={props.finishDate}
                            onChange={(e) => props.setFinishDate_withCheck(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 centered" style={{ marginTop: '35px' }}>
                    <SubmitButton loading={props.loading} ready={props.ready} text={'ПОИСК'}/>
                </div>
                
            </div>
        </div>
    </form>
}

export default Form1;