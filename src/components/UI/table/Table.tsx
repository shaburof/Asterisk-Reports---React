import React, { useState, useRef } from 'react';
import classes from './table.module.scss';
import typeTable, { typeBestPosition } from '../../../types/typeTable';
import { COLORS } from '../../../types/typesColors';

const Table: React.FC<typeTable> = (props) => {

    // const [timer, setTimer] = useState<any>();
    let timer: any;
    const refTooltip = useRef<HTMLElement>(null);

    const tooltip = (event: any, index: number) => {
        let tooltipText = props.tooltips[index];
        if (!tooltipText || tooltipText.trim() === '') return false;
        let coord = (event.target as HTMLElement).getBoundingClientRect();

        let left = coord.left;
        let top = coord.top;
        let bottom = coord.bottom;
        let offsetHight = event.target.offsetHeight;

        timer = setTimeout(() => {
            refTooltip.current!.style.display = 'block';
            (refTooltip.current!.childNodes[0] as any).innerText = props.tooltips[index];
            refTooltip.current!.style.left = left - 5 + 'px';

            refTooltip.current!.style.top = (top - refTooltip.current!.offsetHeight + window.scrollY) - 6 + 'px';
        }, 800);
        // setTimer(prev => timer);
    }

    const stopTooltipTimer = () => {
        clearTimeout(timer);
        refTooltip.current && (refTooltip.current!.style.display = 'none');
    }

    // console.log(props.bestPosition2);
    const bestPosition2Handler = (indexRow: number, indexColumn: number, v: any) => {
        let clss = '';
        if (typeof props.bestPosition2 === 'undefined') return clss;
        props.bestPosition2.forEach(bestValue => {
            let row = bestValue.row;
            let column = bestValue.column;
            let color = bestValue.color;
            if (row === indexRow && column === indexColumn) {
                if (color === COLORS.RED) clss = classes.table__columnBestPositionRed;
                if (color === COLORS.GREEN) clss = classes.table__columnBestPositionGreen;
                if (color === COLORS.YELLO) clss = classes.table__columnBestPositionYello;
            }
        });
        return clss
    }


    return <div>
        {props.tooltips.length > 0 &&
            <section ref={refTooltip} className={classes.tooltip}>
                <span className={classes.tooltip__text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, rem doloribus numquam, fugit ipsum.</span>
                <div className={classes.tooltip__arrow}></div>
            </section>}

        <table className={classes.table}>
            <tbody>
                <tr className={classes.titleRow}>
                    {props.names.map((n, i) => {
                        return <th onMouseOver={(event) => tooltip(event, i)} onMouseLeave={stopTooltipTimer} key={i}>{n}</th>
                    })}
                </tr>
                {props.values.map((rowValues, i1) => {
                    let selectRowClass = '';
                    if (props.selectRow?.includes(i1)) {
                        selectRowClass = classes.table__selectRow;
                    }

                    return <tr key={i1} className={classes.dataRow + ' ' + selectRowClass}>
                        {rowValues.map((value, i2) => {
                            // console.log(typeof value);
                            let additionalClass = bestPosition2Handler(i1, i2, value);

                            return <td key={i2} className={additionalClass}>{value}</td>
                            // if (typeof props.bestPosition === 'undefined') return <td key={i2}>{value}</td>;
                            // if (typeof props.bestPosition![i2] !== 'undefined' && typeof props.bestPosition![i2].gtIndex !== 'undefined' && props.bestPosition![i2].gtIndex!.includes(i1)) return <td key={i2} className={props.bestPosition![i2].lgIsBad ? classes.table__columnBestPositionGreen : classes.table__columnBestPositionRed}>{value}</td>
                            // else if (typeof props.bestPosition![i2] !== 'undefined' && typeof props.bestPosition![i2].lgIndex !== 'undefined' && props.bestPosition![i2].lgIndex!.includes(i1)) return <td key={i2} className={!props.bestPosition![i2].lgIsBad ? classes.table__columnBestPositionGreen : classes.table__columnBestPositionRed}>{value}</td>
                            // else return <td key={i2}>{value}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table></div>
}

export default Table;