import React, { Component, Proptypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data'; // To use react meteor data


import Calendar from '../components/generate_date.js'; // Date Generate button
import FreeDays from '../components/test.jsx'; // Date Generate button

import { MCalendar } from '../api/availableDates.js';

// import {ObjectID} from 'mongodb'


// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);


    //Setting up all days as free dates
    var Calendar = new Array(32);
    for(var i=0; i<32; i++) {
      Calendar[i] = i;
    }
    this.state = {
      Calendar: Calendar,
    };
    MCalendar.allow({
      insert(room, doc) {
        return true;
      }
    });
  }

  //  Restores all free days  
  resetDays() {
    var reset = new Array(32);
    for(var i=0; i<32; i++) 
      reset[i] = i;
    
    var id = MCalendar.find({room: "12345"}).fetch()[0]._id;
    MCalendar.update({_id: id}, {
      $set: { array: reset },
    })

    this.update();
  }

  update() {
    var nArray = MCalendar.find({room: "12345"}).fetch()[0].array;
    this.setState({Calendar: nArray});
  }

  renderCal() {
    return this.props.calendars.map((cal) => (
      cal.array
    ));
  }

  remove(date) {
    var tempCalendar = MCalendar.find({room: "12345"}).fetch()[0].array;
    tempCalendar[date] = 0;
    this.setState({Calendar: tempCalendar});
    var id = MCalendar.find({room: "12345"}).fetch()[0]._id;
    MCalendar.update({_id: id}, {
      $set: { array: tempCalendar },
    });
  }

  render() {
    var date = new Date();
    var d= new Date(date.getFullYear(), date.getMonth()+1, 0);
    var availDates = new Array(32);

    return (
      <div className="container">
        <FreeDays days = {this.state.Calendar}/>
        <Calendar remove = {this.remove} update = {this.update}/>

        <button className="button" onClick={() => this.resetDays()}>Reset</button>
      </div>

    );
  }
}


export default createContainer(() => {
  return {
    calendars: MCalendar.find({}).fetch(),
  };
}, App);
