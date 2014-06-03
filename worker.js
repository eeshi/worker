var rpc = require('axon-rpc');
var axon = require('axon');

var api = require('./api');

var PORT = process.env['PORT'];
var status = true; // Available

var rep = axon.socket('rep');
var worker = new rpc.Server(rep);

rep.bind(PORT);

worker.expose('check status', function(callback) {

  callback(null, status);

});

worker.expose('scrape', function(url, model, options, callback) {

  status = false; // Busy

  api.scrape(url, model, options, function(err, data) {

    if(err) {
      return callback(err);
    }

    status = true // Avaiable again :D
    return callback(null, data);

  });

});
