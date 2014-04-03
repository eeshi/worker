var api = require('./api.js');

var url = 'http://localhost.geeklist.com:4000/communities';
var model = {
  navigation: {
    selector: '.community-name',
    required: true
  }
}

api.scrap(url, model, {}, function(err, data) {

  if (err) {
    return console.error(err);
  }

  return console.log(data);

});
