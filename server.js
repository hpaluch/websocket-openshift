#!/bin/env node

// Heroku WebSocket Example ported to OpenShift
var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()

var ipaddress   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port        = process.env.OPENSHIFT_NODEJS_PORT || 5000;
var isOpenShift = process.env.OPENSHIFT_NODEJS_PORT ? true : false;

app.use(express.static(__dirname + "/"))

console.log( "IP: "+ipaddress+" Port: "+port
		+( isOpenShift ? "OepnShift mode" : "Standalone mode" ) );

var server = http.createServer(app)
server.listen(port,ipaddress)

console.log("http server listening on %s:%d",ipaddress, port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
