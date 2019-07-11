import React from 'react';
import moment from 'moment';

class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  getFirstDayOfMonth() {
    const {renderDay} = this.props;
    const firstDay = moment(renderDay).startOf("month").format("d"); 
    return firstDay;
  };

  render() {
    const {chosenDay, renderDay} = this.props;

    let emptyDaysInMonth = [];
    for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
      emptyDaysInMonth.push(
        <td key={`emptyDay${i}`} className='calendar-day empty'>{''}</td>
      );
    }

    let daysInMonth = [];
    for (let k = 1; k <= renderDay.daysInMonth(); k++) {
      let currentYearMonthMatch = moment().format('YYYY MM') === renderDay.format('YYYY MM');
      let chosenYearMonthMatch = chosenDay.format('YYYY MM') === renderDay.format('YYYY MM');
      let currentDayClass = k == moment().format('D') && currentYearMonthMatch ? 'today' : '';
      let chosenDayClass = k == chosenDay.format('D') && chosenYearMonthMatch ? 'chosen' : '';
      daysInMonth.push(
        <td key={`nonEmptyDay${k}`} className={`calendar-day ${currentDayClass} ${chosenDayClass}`}>
          {k}
        </td>
      );
    }

    var totalSlots = [...emptyDaysInMonth, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows 
        cells = []; // empty container 
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) { // when end loop we add remain date
        rows.push(cells);
      }
    });

    let allDaysInMonth = rows.map((day, i) => {
      return <tr key={`Day${i}`} onClick={(event) => {this.props.onChosenHandler(event.target.innerText)}}>{day}</tr>;
    });


    return (
      <tbody>{allDaysInMonth}</tbody>
    )
  }
}

export default CalendarGrid;