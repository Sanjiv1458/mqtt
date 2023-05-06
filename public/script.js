$(document).ready(function () {
  const ws = new WebSocket("ws://" + window.location.host);
  ws.onmessage = function (event) {
    const data = event.data.split(',');
    const sensorList = $('#sensor-list');
    sensorList.html('');
    for (let i = 0; i < data.length; i++) {
      const card = $('<div></div>');
      card.addClass('card col-md-4');
      card.addClass(data[i] === '1' ? 'card-on' : 'card-off');
      const cardHeader = $('<div></div>');
      cardHeader.addClass('card-header');
      cardHeader.text('Sensor ' + (i + 1));
      const cardBody = $('<div></div>');
      cardBody.addClass('card-body');
      cardBody.text(data[i] === '0' ? 'Occupied' : 'Available');
      card.append(cardHeader);
      card.append(cardBody);
      sensorList.append(card);
    }
  };
});
