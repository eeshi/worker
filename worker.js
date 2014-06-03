var rpc = require('axon-rpc');
var axon = require('axon');

var PORT = process.env['PORT'];
var status = true; // Available

var rep = axon.socket('rep');
var server = new rpc.Server(rep);

rep.bind(PORT);


