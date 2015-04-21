'use strict';
var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function (req, res) {
    console.log('serving a request');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);