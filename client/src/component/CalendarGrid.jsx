import React from 'react';
import moment from 'moment';

class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {getFirstDayOfMonth, today, chosenDay} = this.props;

    let emptyDaysInMonth = [];
    for (let i = 0; i < getFirstDayOfMonth(); i++) {
      emptyDaysInMonth.push(
        <td key={`emptyDay${i}`} className='calendar-day empty'>{''}</td>
      );
    }

    let daysInMonth = [];
    for (let k = 1; k <= chosenDay.daysInMonth(); k++) {
      let currentDayClass = k == today.format('D') ? 'today' : '';
      let chosenDayClass = k == chosenDay.format('D') ? 'chosen' : '';
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
      return <tr key={`Day${i}`}>{day}</tr>;
    });


    return (
      <tbody>{allDaysInMonth}</tbody>
    )
  }
}

export default CalendarGrid;