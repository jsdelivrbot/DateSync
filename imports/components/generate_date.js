import React, { Component } from 'react';

class Calendar extends Component {
  constructor(props) {
    super(props);

  }

  printDate(date) {
    console.log(date);
  }

  render() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // console.log(firstDay);
    // console.log(lastDay);
    // Initializing date array
    var month = new Array(7);
    for (var i = 0; i < 7; i++) {
      month[i] = new Array(5);
    }
    for(var i = 0; i < 7; i++) {
      for(var j = 0; j < 5; j++) {
        month[i][j] = "0";
      }
    }
    // Generating dates
    // Stored in a 2D array
    var week_day = firstDay.getDay();
    var date = firstDay.getDate()
    while(week_day < 7) {
      var count = 0;
      while(count < 5 && date + count* 7 <= lastDay.getDate()) {
        month[week_day][count] = date + count*7;
        count++;
      }
      week_day ++;
      date++;
    }
    // Adding on miss dates
    if(firstDay.getDate() > 0) {
      var firstMissingDay = 0;
      var firstMissingDate = month[6][0] + 1;
      var count = 1;
      while(firstMissingDay < firstDay.getDay()) {
        var count = 1;
        while(count < 5 && firstMissingDate + (count-1)* 7 <= lastDay.getDate()) {
          month[firstMissingDay][count] = firstMissingDate + (count-1)*7;
          count++;
        }
        firstMissingDay ++;
        firstMissingDate++;
      }
    }

    var week = (
        <div className='cal-container'>
          <div className='row'>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[0][0])}>{month[0][0]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[1][0])}>{month[1][0]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[2][0])}>{month[2][0]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[3][0])}>{month[3][0]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[4][0])}>{month[4][0]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[5][0])}>{month[5][0]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[6][0])}>{month[6][0]}</div>
          </div>
          <div className='row'>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[0][1])}>{month[0][1]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[1][1])}>{month[1][1]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[2][1])}>{month[2][1]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[3][1])}>{month[3][1]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[4][1])}>{month[4][1]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[5][1])}>{month[5][1]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[6][1])}>{month[6][1]}</div>
          </div>
          <div className='row'>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[0][2])}>{month[0][2]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[1][2])}>{month[1][2]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[2][2])}>{month[2][2]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[3][2])}>{month[3][2]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[4][2])}>{month[4][2]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[5][2])}>{month[5][2]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[6][2])}>{month[6][2]}</div>
          </div>
          <div className='row'>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[0][3])}>{month[0][3]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[1][3])}>{month[1][3]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[2][3])}>{month[2][3]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[3][3])}>{month[3][3]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[4][3])}>{month[4][3]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[5][3])}>{month[5][3]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[6][3])}>{month[6][3]}</div>
          </div>
          <div className='row'>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[0][4])}>{month[0][4]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[1][4])}>{month[1][4]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[2][4])}>{month[2][4]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[3][4])}>{month[3][4]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[4][4])}>{month[4][4]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[5][4])}>{month[5][4]}</div>
                <div className='days col-sm-1' onClick={() => this.props.remove(month[6][4])}>{month[6][4]}</div>
          </div>
        </div>

    );

    return (
      week
    );
  }
}

export default Calendar;
