require('dotenv').config();

const wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize' +
  '?watson-token=' + process.env.TOKEN +
  '?model=es-ES_BroadbandModel';
const ws = new WebSocket(wsURI);

ws.onopen = onOpen;
ws.onclose = onClose;
ws.onmessage = onMessage;
ws.onerror = onError;
