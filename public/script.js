// Wait for the DOM to load before executing any code
$(document).ready(function () {

  // Create a WebSocket connection to the server
  const socket = new WebSocket('ws://localhost:3000');

  // Handle incoming messages from the server
  socket.onmessage = function (event) {

    // Get the data from the incoming message and split it into an array
    const data = event.data.split(',');

    // Get the sensor-list element and clear its content
    const sensorList = $('#sensor-list');
    sensorList.html('');

    // Loop through the data array and create a card for each sensor
    for (let i = 0; i < data.length; i++) {

      // Create a new card element with the appropriate class based on the sensor status
      const card = $('<div></div>');
      card.addClass('card col-md-4');
      card.addClass(data[i] === '1' ? 'card-on' : 'card-off');

      // Create a card header with the sensor number
      const cardHeader = $('<div></div>');
      cardHeader.addClass('card-header');
      cardHeader.text('Sensor ' + (i + 1));

      // Create a card body with the sensor status text
      const cardBody = $('<div></div>');
      cardBody.addClass('card-body');
      cardBody.text(data[i] === '0' ? 'Occupied' : 'Available');

      // Add the header and body to the card and the card to the sensor list
      card.append(cardHeader);
      card.append(cardBody);
      sensorList.append(card);
    }
  };
});
