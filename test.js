var api = require('./api.js');

var url = 'http://www.empleate.com/venezuela/ofertas/empleos/';
var model = {
  jobLinks: '.line > .linea_hover > .col1 > .col1',

}

api.scrape(url, model, {}, function(err, data) {

  if (err) {
    return console.error(err);
  }

  var jobLinks = [];

  for (var i = data.jobLinks.length - 1; i >= 0; i--) {
    var link = data.jobLinks[i].attr('href');
    jobLinks.push(link);
  };

  return console.log(jobLinks);

});
