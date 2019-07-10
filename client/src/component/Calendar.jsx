import React from 'react';
import moment from 'moment';

const weekdayshort = moment.weekdaysShort();

const weekdayshortname = weekdayshort.map(day => {
  return (
    <th key={day} className="week-day">
     {day}
    </th>
  );
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObject: moment()
    };
  }

  firstDayOfMonth() {
    const dateObject = this.state.dateObject;
    const firstDay = moment(dateObject).startOf("month").format("d"); 
    return firstDay;
  };

  render() {
    
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={`emptyDay${i}`} className='calendar-day empty'>{''}</td>
      );
    }

    let daysInMonth = [];
    for (let k = 1; k <= this.state.dateObject.daysInMonth(); k++) {
      daysInMonth.push(
        <td key={`nonEmptyDay${k}`} className="calendar-day">
          {k}
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
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

    let allDaysInMonth = rows.map((d, i) => {
      return <tr key={`Day${i}`}>{d}</tr>;
    });

    return (
      <table className="calendar-day">
        <thead>
          <tr>{weekdayshortname}</tr>
        </thead>
        <tbody>{allDaysInMonth}</tbody>
      </table>
    )
  }
}

export default Calendar;