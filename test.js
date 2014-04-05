var api = require('./api.js');

var url = 'http://www.empleate.com/venezuela/ofertas/empleos/';
var model = {
  jobLinks: '.line > .linea_hover > .col1 > .col1',

}

api.scrape(url, model, {}, function(err, data) {

  if (err) {
    return console.error(err);
  }

  return console.log(data);

});
