const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = 3000;

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const mqtt_server = 'broker.hivemq.com';
const mqtt_port = 1883;
const mqtt_topic = 'SENSOR_DATA_0994853';

const mqttClient = mqtt.connect(`mqtt://${mqtt_server}:${mqtt_port}`);

const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
  console.log('WebSocket connected');

  mqttClient.on('message', async function (topic, message) {
    if (topic === mqtt_topic) {
      const payload = message.toString();
      ws.send(payload);
    }
  });

  mqttClient.subscribe(mqtt_topic, function (err) {
    if (err) {
      console.log('MQTT subscription failed: ' + err);
    } else {
      console.log('MQTT subscription successful');
    }
  });
  ws.on('close', function() {
    console.log('WebSocket disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});