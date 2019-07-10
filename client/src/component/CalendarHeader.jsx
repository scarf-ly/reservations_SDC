import React from 'react';
import moment from 'moment';

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const weekdayshort = moment.weekdaysShort();
    const weekdayShortName = weekdayshort.map((day) => {
      return <th key={day} className="week-day">{day}</th>
    });


    return (
      <tr>{weekdayShortName}</tr>
    )
  }
}

export default CalendarHeader;