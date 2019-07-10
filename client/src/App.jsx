import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Calendar from './component/Calendar.jsx';

const ReservationHeader = styled.div`
  margin-top: 5%;
  margin-bottom: 9%;
  color: #333333;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  height: 10%;
`;

const StyledButton = styled.button`
  margin-bottom: 3%;
  color: #ffffff;
  width: 90%;
  height: 50%;
  font-weight: bold;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  size: 12px;
  background: #41A700;
`;

const IslandContainer = styled.div`
  height: 500.88px;
  width: 297.98px;
  background: #FFFFFF;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ReservationFormContainer = styled.form`
  width: 90%;
  display: flex;
  height: 70%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ReservationFields = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const CalenderPicker = styled.div`
  height: 50%px
  width: 90%;
`;

const TimePicker = styled.div`
  height: 25%
  width: 45%;
`;

const PeoplePicker = styled.div`
  height: 25%
  width: 45%;
`;

const FullWidthSelect = styled.select`
  width: 100%;
`;

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <IslandContainer className='island-container'>
          <ReservationHeader className='reservation-header'>
            <span></span>
            <div>Make a Reservation</div>
          </ReservationHeader>
          <ReservationFormContainer className='reservation-form-container'>
            <div className='reservation-form'>
              <ReservationFields className='reservation-fields'>
                <CalenderPicker className='calender-picker'>
                  <div>
                    <span></span>
                    <span></span>
                  </div>
                  <Calendar />
                </CalenderPicker>
                <TimePicker className='time-picker'>
                  <div>
                    <span></span>
                    <FullWidthSelect>
                      <option value="1800">06:00 pm</option>
                      <option value="1900">07:00 pm</option>
                      <option value="2000">08:00 pm</option>
                    </FullWidthSelect>
                    <span></span>
                  </div>
                </TimePicker>
                <PeoplePicker className='people-picker'>
                  <div>
                    <span></span>
                    <FullWidthSelect>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6">6 people</option>
                      <option value="7">7 people</option>
                      <option value="8">8 people</option>
                    </FullWidthSelect>
                    <span></span>
                  </div>
                </PeoplePicker>
              </ReservationFields>
              <StyledButton>Find a Table</StyledButton>
            </div>
          </ReservationFormContainer>
      </IslandContainer>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));