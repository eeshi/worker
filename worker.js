var rpc = require('axon-rpc');
var axon = require('axon');

var PORT = process.env['PORT'];
var status = true; // Available

var rep = axon.socket('rep');
var worker = new rpc.Server(rep);

rep.bind(PORT);

worker.expose('check status', function(callback) {

  callback(null, status);

});
