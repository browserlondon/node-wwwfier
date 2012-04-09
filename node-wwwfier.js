var cluster = require('cluster');
var express = require('express');
var http = express.createServer();
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
    // Worker processes have a http server.
    http.get('/*', function(req, res, next) {

        if (req.headers.host.match(/^www/) == null ) res.redirect('http://www.' + req.headers.host + req.url, 301);

        else res.send('URL Not Supported please refer to the documentation', { 'Content-Type': 'text/plain' }, 400);

    });
    http.listen(3000);
}
