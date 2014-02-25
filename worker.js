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
var remote = {};

worker.id = number;  


d.on('remote', function onRemote(_remote) {
  remote = _remote;
  remote.initWorker(worker, initWorker);
  remote.getJobs(worker, getJobs);
});

function initWorker(server) {
  console.log(server.response);
}

function getJobs(site) {
  
  var url = site.url + site.section;
  var $;

  // Shorten url to avoid console spam
  var shortUrl = url.trim().slice(0,42);
  console.log(url)

  request(url, function servePage(err, res, body) {
    
    if (err) throw err;

    $ = cheerio.load(body);

    var jobsOnThisPage = $(site.selectors.job).map(getHrefFromLink);

    var nextSection = $(site.selectors.nextPage).attr('href');

    worker.jobsCollected = jobsOnThisPage;

    // TODO:
    // Fix transport to save jobs collected
    //remote.saveJobs(worker, saveJobs);

    // Call recursively until last page
    if(nextSection) {
      site.section = nextSection;
      getJobs(site);
    }

    return;
  });

  function getHrefFromLink() {
    return $(this).attr('href');
  }

  function saveJobs(server) {
    console.log(server.response);
  }
}
