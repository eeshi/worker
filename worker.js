var rpc = require('axon-rpc');
var axon = require('axon');

var api = require('./api');

var PORT = process.env['PORT'];
var available = true;

var rep = axon.socket('rep');
var worker = new rpc.Server(rep);

rep.bind(PORT);

worker.expose('check status', function(callback) {

  callback(null, available);

});

worker.expose('scrape', function(url, model, options, callback) {

  available = false;

  api.scrape(url, model, options, function(err, data) {

    if(err) {
      return callback(err);
    }

    available = true
    return callback(null, data);

  });

});
