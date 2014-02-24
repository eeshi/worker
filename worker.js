// Set up dependencies
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var dnode = require('dnode');

// Set up environment variables
var PORT = process.env.PORT;
var number = process.env.NUMBER;


// Set up rpc server
var d = dnode.connect(PORT);
var concurrency = 8;
var worker = {};
var jobs = [];

worker.id = number;  


d.on('remote', function onRemote(remote) {
  remote.initWorker(worker, initWorker);
  remote.getJobs(worker, getJobs);
});

function initWorker(server) {
  console.log(server);
}

function getJobs(site) {
  
  var url = site.url + site.section;
  console.log(url)

  request(site.url, function servePage(err, res, body) {
    
    if (err) throw err;

    var $ = cheerio.load(body);
    
    var shortTitle = $('title').text().trim().slice(0,42);
    console.log(shortTitle);

    var jobsOnThisPage = $(site.selectors.job).map(function() {
      return $(this).attr('href');
    });

    jobs.push(jobsOnThisPage);

    console.log(site.selectors.nextPage);

    var nextSection = $(site.selectors.nextPage).attr('href');

    // Call recursively until last page
    if(nextSection) {
      var newUrl = site.url + nextSection;
      getJobs(newUrl);
    }

    return;
  });
}
