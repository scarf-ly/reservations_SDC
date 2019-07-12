import React from 'react';
import moment from 'moment';
import CalendarGrid from './CalendarGrid.jsx';
import CalendarHeader from './CalendarHeader.jsx';



class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderDay: moment(),
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
      renderDay: this.state.renderDay.subtract(1, 'month')
    });
  }

  onNextHandler() {
    this.setState({
      renderDay: this.state.renderDay.add(1, 'month')
    });
  }

  render() {
    return (
      <div>
        <span></span>
        <div onClick={this.toggleCalender}>{this.props.chosenDay.format('dddd[,] MMMM D[,] YYYY')}</div>
        <span></span>
        {this.state.calendarDisplay
          ?
          <table className='calendar-day'>
            <CalendarHeader renderDay={this.state.renderDay} onPreHandler={this.onPreHandler} onNextHandler={this.onNextHandler}/>
            <CalendarGrid chosenDay={this.props.chosenDay} renderDay={this.state.renderDay} onChosenHandler={this.props.onChosenHandler}/>
          </table>
          :
          null
        }        
      </div>
    )
  }
}

export default Calendar;