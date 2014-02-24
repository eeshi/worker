var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var format = require('util').format;

var prot = process.env.PROTOCOL;
var site = process.env.SITE; 
var section = process.env.SECTION;
var selector = process.env.JOB_SELECTOR;
var nextPageSelector = process.env.NEXT_PAGE;
var concurrency = 8;
var jobs = [];

var url = format('%s://%s%s', prot, site, section);
   

function getJobs(url) {
  
  request(url, function servePage(err, res, body) {
    
    if (err) throw err;

    var $ = cheerio.load(body);
    
    var shortTitle = $('title').text().trim().slice(0,42);
    console.log(shortTitle);

    jobs.push($(selector).map(function() {
        return $(this).attr('href');
      })
    );

    var section = $(nextPageSelector).attr('href');
    var newUrl = format('%s://%s%s', prot, site, section);

    // Call recursively until last page
    if(newUrl) 
      getJobs(newUrl); 

    return;
  });
}

getJobs(url);
