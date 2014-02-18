var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;

var opcionEmpleo = 'http://www.opcionempleo.com.ve/'
  , section = 'empleos-informatica-telecomunicaciones.html'
  , concurrency = 8;

request(opcionEmpleo + section, function(err, res, body) {
  
  if (err) throw err;
  
  var $ = cheerio.load(body);
  
  var jobs = $('div.job p a.title_compact').map(function() {
    return $(this).attr('href');
  });
  
  async.eachLimit(jobs, concurrency, function(job, next) {
  
    var jobPost = request(opcionEmpleo + job, function(err, res, body) {
      
      if (err) throw err;
      
      var $ = cheerio.load(body);
      
      // Log job post title, trim and limit to 42 characters to avoid console SPAM.
      console.log();
      console.log($('title').text().trim().slice(0,42));
      
      next();
    });
  });
});
