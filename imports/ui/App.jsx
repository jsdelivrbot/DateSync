import React, { Component, Proptypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data'; // To use react meteor data


import Calendar from '../components/generate_date.js'; // Date Generate button
import FreeDays from '../components/FreeDays.jsx'; // Date Generate button

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
      roomNumber: "",
    };
    MCalendar.allow({
      insert(room, doc) {
        return true;
      }
    });
  }

  //  Restores all free dates
  resetDates() {
    var reset = new Array(32);
    for(var i=0; i<32; i++)
      reset[i] = i;

    var id = MCalendar.find({room: this.state.roomNumber}).fetch()[0]._id;
    MCalendar.update({_id: id}, {
      $set: { array: reset },
    })

    this.update();
  }

  enterRoom(code) {
    var id = MCalendar.find({room: code}).fetch()[0]._id;
  }

  makeRoom() {
    var code = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    for(var i=0; i < 6; i++){
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    MCalendar.insert({
      array: array,
      room: code
    });
    this.setState({Calendar: array});
    this.setState({roomNumber: code});
    console.log(code);
  }

  update() {
    var nArray = MCalendar.find({room: this.state.roomNumber}).fetch()[0].array;
    this.setState({Calendar: nArray});
  }

  renderCal() {
    return this.props.calendars.map((cal) => (
      cal.array
    ));
  }

  remove(date) {
    var tempCalendar = MCalendar.find({room: this.state.roomNumber}).fetch()[0].array;
    tempCalendar[date] = 0;
    // this.setState({Calendar: tempCalendar});
    var id = MCalendar.find({room: this.state.roomNumber}).fetch()[0]._id;
    MCalendar.update({_id: id}, {
      $set: { array: tempCalendar },
    });
  }

  getInput(evt) {
    console.log(evt.target.value);
    this.setState({
      roomNumber: evt.target.value
    }); 
  }

  render() {
    var date = new Date();
    // var d = new Date(date.getFullYear(), date.getMonth()+1, 0);

    return (
      <div className="container">
        <FreeDays days = {this.state.Calendar}/>
        <Calendar remove = {this.remove} update = {this.update}/>

        <button className="button" onClick={() => this.resetDates()}>Reset</button>
        <button className="button" onClick={() => this.makeRoom()}>Create Room</button>
  
        <input value={this.state.roomNumber} onChange={evt => this.getInput(evt)}/> 
        <button className="button" onClick={() => this.update()}>Enter Room</button>
    
      </div>

    );


  }
}


export default createContainer(() => {
  return {
    calendars: MCalendar.find({}).fetch(),
  };
}, App);
