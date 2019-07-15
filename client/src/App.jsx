import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './component/Calendar.jsx';
import moment from 'moment';
import axios from 'axios';
import styles from './style/App.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenDay: moment(),
      chosenTime: '1900',
      partyNum: 4,
      restaurantId: 1,
      spotLeft: null
    }

    this.onChosenHandler = this.onChosenHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChosenHandler(unix) {
    var newChosenDay = moment.unix(unix);
    this.setState({
      chosenDay: newChosenDay
    });
  }

  onChangeHandler(key, value) {
    this.setState({
      [key]: value 
    }, this.checkReservation);
  }

  checkReservation() {
    var timestamp = moment(
      this.state.chosenDay.format(
        'YYYY MM DD ' + this.state.chosenTime), 'YYYY MM DD HHmm')
          .unix() - 25200; // UTC -> PST
    axios.get('/reservation', {
      params: {
        restaurantId: this.state.restaurantId,
        timestamp: timestamp,
        partyNum: this.state.partyNum
      }
    })
      .then((results) => {
        if (results.data.length > 0) {
          this.setState({
            spotLeft: results.data[0].num_of_seat
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  displaySpotsLeftMessage() {
    const {spotLeft, partyNum} = this.state;
    if (spotLeft != null && spotLeft >= partyNum && Math.floor(spotLeft / partyNum) <= 3) {
      return <div className={styles.spotLeftMessage}>Reserve Soon! Only {Math.floor(spotLeft / partyNum)} reservation(s) available for party of {partyNum}</div>
    } else if (spotLeft != null && spotLeft < partyNum) {
      return <div className={styles.spotLeftMessage}>Sorry, there's no more online reservations available for party of {partyNum}</div>
    }
  }
 
  render() {
    return(
      <div className={styles.islandContainer}>
          <h3 className={styles.reservationHeader}>
            <span className={styles.calendarIconHeader}>
              <i className='far fa-calendar-alt'></i>
            </span>
            <span className={styles.header}>Make a Reservation</span>
          </h3>
          <form className='reservation-form-container'>
            <div className='reservation-form'>
              <div className='reservation-fields'>
                <div className='calender-picker'>
                  <Calendar chosenDay={this.state.chosenDay} onChosenHandler={this.onChosenHandler}/>
                </div>
                <div className={styles.timePartySizeContainer}>
                  <span className={styles.timePicker}>
                    <span className={styles.clockIcon} aria-hidden={true}>
                      <i className="far fa-clock"></i>
                    </span>
                    <select className={styles.selectWithoutStyle} defaultValue='1900' onChange={(event) => {this.onChangeHandler('chosenTime', event.target.value)}}>
                      <option value='1800'>06:00 pm</option>
                      <option value='1900'>07:00 pm</option>
                      <option value='2000'>08:00 pm</option>
                    </select>
                    <span className={styles.dropdownIcon}>
                      <i className="fas fa-caret-down"></i>
                    </span>
                  </span>
                  <span id='peopleSelector' className={styles.partySizePicker}>
                    <span className={styles.partySizeIcon}>
                      <i className="fas fa-user-friends"></i>
                    </span>
                    <select className={styles.selectWithoutStyle} defaultValue='4' onChange={(event) => {this.onChangeHandler('partyNum', event.target.value)}}>
                      <option value='1'>1 person</option>
                      <option value='2'>2 people</option>
                      <option value='3'>3 people</option>
                      <option value='4'>4 people</option>
                      <option value='5'>5 people</option>
                      <option value='6'>6 people</option>
                      <option value='7'>7 people</option>
                      <option value='8'>8 people</option>
                    </select>
                    <span className={styles.dropdownIcon}>
                      <i className="fas fa-caret-down"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.reserveButtonContainer}>
                <button className={styles.reserveButton}>Find a Table</button>
              </div>
              {this.displaySpotsLeftMessage()}
            </div>
          </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
