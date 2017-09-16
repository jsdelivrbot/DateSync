import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

import '../imports/api/availableDates.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));

  $(document).ready(function() {
  	$('.days').on('click', function() {
      $(this).addClass('active');
      $(this).removeClass('days');
  	});

    $('.newDays').on('click', function() {
      $(this).addClass('newActive');
      $(this).removeClass('newDays');
    });
  });
});