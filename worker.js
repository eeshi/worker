var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;

var prot = process.env.PROTOCOL
  , site = process.env.SITE 
  , section = process.env.SECTION
  , selector = process.env.JOBSELECTOR
  , nextPageSelector = process.env.NEXTPAGE 
  , concurrency = 8
  , jobs = []

  , url = format('%s://%s%s', prot, site, section);
   

function getJobs(url) {
  
  request(url, function(err, res, body) {
    
    if (err) throw err;

    var $ = cheerio.load(body);
    
    console.log();
    console.log($('title').text().trim().slice(0,42));

    jobs.push($(selector).map(function() {
        return $(this).attr('href');
      })
    );

  var newUrl = format('%s://%s%s', prot, site, $(nextPageSelector).attr('href'));

  if(newUrl) 
    getJobs(newUrl); // Call recursively until last page

  return;

  });
}

getJobs(url);

 // async.eachLimit(jobs, concurrency, function(job, next) {
  
 //    var jobPost = request(site + job, function(err, res, body) {
      
 //      if (err) throw err;
      
 //      var $ = cheerio.load(body);
      
 //      // Log job post title, trim and limit to 42 characters to avoid console SPAM.
 //      console.log();
 //      console.log($('title').text().trim().slice(0,42));
      
 //      next();
 //    });
 //  });
