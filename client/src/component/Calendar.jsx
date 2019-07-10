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

    this.onPreHandler = this.onPreHandler.bind(this);
    this.onNextHandler = this.onNextHandler.bind(this);
  }

  onPreHandler() {
    this.setState({
      chosenDay: this.state.chosenDay.subtract(1, 'month')
    });
  }

  onNextHandler() {
    this.setState({
      chosenDay: this.state.chosenDay.add(1, 'month')
    });
  }

  render() {
    return (
      <table className="calendar-day">
        <CalendarHeader today={this.state.today} chosenDay={this.state.chosenDay} onPreHandler={this.onPreHandler} onNextHandler={this.onNextHandler}/>
        <CalendarGrid today={this.state.today} chosenDay={this.state.chosenDay}/>
      </table>
    )
  }
}

export default Calendar;