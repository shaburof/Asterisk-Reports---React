import React from 'react';
import SubmitButton from '../submitButton/SubmitButton';
import classes from './form2.module.scss';
import typeForm2 from '../../../types/typeForm2';

const Form1: React.FC<typeForm2> = (props) => {

    return <form
        onSubmit={(e) => props.onClickSearchHandler(e)}
        className={classes.form1}>
        <div className="col-sm-12">
            <div className="row justify-content-center">
                <div className="col-sm-8 ">
                    <div className="form-group">
                        <label htmlFor="inputDate">выбор очереди</label>
                        <select className="form-control text-center"
                            value={props.queue}
                            onChange={(e) => props.selectHandler(e.target.value)}
                        >
                            {props.queueList.map(queue => {
                                return <option key={queue} value={queue}>{queue === 'unite' ? 'общие показатели' : queue}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-12">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="inputDate">дата:</label>
                        <input type="date" className="form-control text-center"
                            value={props.data}
                            onChange={(e) => props.setDate_withCheck(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-sm-2 text-center">
                    <div className="form-group" style={{ marginTop: '35px' }}>
                        <SubmitButton loading={props.loading} ready={props.ready as boolean} text={'ПОИСК'} />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label htmlFor="inputDate">дата:</label>
                        <input type="date" className="form-control text-center"
                            value={props.dataTwo}
                            onChange={(e) => props.setDate_withCheckTwo(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>
}

export default Form1;