import React from 'react';
import moment from 'moment';
import CalendarGrid from './CalendarGrid.jsx';
import CalendarHeader from './CalendarHeader.jsx';



class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      today: moment(),
      chosenDay: moment()
    };

    this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this);
    this.getMonth = this.getMonth.bind(this);
  }

  getFirstDayOfMonth() {
    const firstDay = moment(this.state.chosenDay).startOf("month").format("d"); 
    return firstDay;
  };

  getMonth() {
    const month = this.state.chosenDay.format('MMMM');
    return month
  }

  render() {
    return (
      <table className="calendar-day">
        <thead>
          <CalendarHeader />
        </thead>
        <CalendarGrid getFirstDayOfMonth={this.getFirstDayOfMonth} today={this.state.today} chosenDay={this.state.chosenDay}/>
      </table>
    )
  }
}

export default Calendar;