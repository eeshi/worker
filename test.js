var api = require('./api.js');

var url = 'http://localhost.geeklist.com:4000/communities';
var model = {
  jobLinks: {
    selector: '.community-name',
    get: 'href'
  },
  title: 'title'
};

api.scrape(url, model, {}, function(err, data) {

  if (err) {
    return console.error(err);
  }

  return console.log(data);

});
