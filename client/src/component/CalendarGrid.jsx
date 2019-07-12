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
      let renderDayYearMonth = renderDay.format('YYYY MM');
      let currentYearMonthMatch = moment().format('YYYY MM') === renderDayYearMonth;
      let chosenYearMonthMatch = chosenDay.format('YYYY MM') === renderDayYearMonth;
      let currentDayClass = k == moment().format('D') && currentYearMonthMatch ? 'today' : '';
      let chosenDayClass = k == chosenDay.format('D') && chosenYearMonthMatch ? 'chosen' : '';
      let value = moment(`${renderDayYearMonth} ${k}`, 'YYYY MM D').unix();
      daysInMonth.push(
        <td key={`nonEmptyDay${k}`} className={`calendar-day ${currentDayClass} ${chosenDayClass}`} value={value}>
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
      return <tr key={`Day${i}`} onClick={(event) => {this.props.onChosenHandler(event.target.attributes.value.value)}}>{day}</tr>;
    });


    return (
      <tbody>{allDaysInMonth}</tbody>
    )
  }
}

export default CalendarGrid;