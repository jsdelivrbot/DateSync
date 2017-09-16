import React, { Component } from 'react';

const FreeDays = ({days}) => {
  const updateC = days.map((day) => {
    if(day != 0) {
      return (
        <li key = {day}>
          {day}
        </li>
      );
    } 

  });

  return(
    <ul>
      {updateC}
    </ul>
  );
}


export default FreeDays;
