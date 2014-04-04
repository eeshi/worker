var api = require('./api.js');

var url = 'http://localhost.geeklist.com:4000/communities';
var model = {
  navigation: '#navigation',
  navigation2: {
    selector: '#navigation2',
    required: true
  },
  communities: {
    selector: '.community-name',
    required: true
  }
}

api.scrape(url, model, {}, function(err, data) {

  if (err) {
    return console.error(err);
  }

  return console.log(data);

});
