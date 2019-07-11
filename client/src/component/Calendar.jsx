import React from 'react';
import moment from 'moment';
import CalendarGrid from './CalendarGrid.jsx';
import CalendarHeader from './CalendarHeader.jsx';



class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      today: moment(),
      chosenDay: moment(),
      calendarDisplay: false
    };

    this.toggleCalender = this.toggleCalender.bind(this);
    this.onPreHandler = this.onPreHandler.bind(this);
    this.onNextHandler = this.onNextHandler.bind(this);
  }

  toggleCalender() {
    this.setState({
      calendarDisplay: !this.state.calendarDisplay
    })
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
      <div>
        <span></span>
        <div onClick={this.toggleCalender}>{this.state.today.format('dddd[,] MMMM Do[,] YYYY')}</div>
        <span></span>
        {this.state.calendarDisplay
          ?
          <table className="calendar-day">
            <CalendarHeader today={this.state.today} chosenDay={this.state.chosenDay} onPreHandler={this.onPreHandler} onNextHandler={this.onNextHandler}/>
            <CalendarGrid today={this.state.today} chosenDay={this.state.chosenDay}/>
          </table>
          :
          null
        }        
      </div>
    )
  }
}

export default Calendar;