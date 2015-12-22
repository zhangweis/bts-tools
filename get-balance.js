#!/usr/bin/env node

var WebSocket = require('ws');
var ws = new WebSocket('wss://bitshares.dacplay.org/ws');
 
ws.on('open', function open() {
  ws.send(JSON.stringify({"method": "call", "params": [0, "get_named_account_balances", [process.argv[2], ["1.3.289"]]], "id": 1}));
});
 
ws.on('message', function(data, flags) {
  console.log(JSON.parse(data).result[0].amount/100);
  process.exit();
});

