require('dotenv').config();

const wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize' +
  '?watson-token=' + process.env.TOKEN +
  '?model=es-ES_BroadbandModel';
const ws = new WebSocket(wsURI);

onOpen = evt => {
  const message = {
    action: 'start',
    'content-type': 'audio/116;rate=22050',
    timestamps: true,
  };
  ws.send(JSON.stringify(message));
};

ws.onopen = onOpen;
ws.onclose = onClose;
ws.onmessage = onMessage;
ws.onerror = onError;
