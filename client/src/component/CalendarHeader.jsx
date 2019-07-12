import React from 'react';
import moment from 'moment';

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  getMonthAndYear() {
    const month = this.props.renderDay.format('MMMM');
    const year = this.props.renderDay.format('Y')
    return `${month} ${year}`;
  }

  render() {

    const {onPreHandler, onNextHandler} = this.props;
    const weekdayshort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weekdayShortName = weekdayshort.map((day, index) => {
      return <th key={`${index}day`} className="week-day">{day}</th>
    });


    return (
      <thead>
        <tr>
          <td id='prevButton' colSpan='1' onClick={onPreHandler}>«</td>
          <td colSpan='5'>{this.getMonthAndYear()}</td>
          <td id='nextButton' colSpan='1' onClick={onNextHandler}>»</td>
        </tr>
        <tr>{weekdayShortName}</tr>
      </thead>
    )
  }
}

export default CalendarHeader;