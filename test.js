var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');
var models = require('./models.json');

models.forEach(function(item, i, arr) {
  crawlLinks(item, i, arr)
});

function crawlLinks(item, i, arr) {

  var url = item.prot + item.baseUrl + item.linksList.startUrl;
  var model = item.linksList.model;
  var options = item.linksList.options;

  api.scrape(url, model, options, function(err, data) {

    if (err) {
      return console.error(err);
    }

    data._id = url;

    console.log(data);

    mongoDB(function(db) {

      var jobLinks = db.collection('jobLinks');

      data.jobLinks.forEach(function(link, i, arr) {

        jobLinks.save(
          { _id: item.prot + item.baseUrl + link },
          function(err) {

          if(err) {
            db.close();
            return console.log(err);
          }

        });

      });

      if (data.nextPageLink) {
        item.linksList.startUrl = data.nextPageLink;
        return crawlLinks(item, i, arr);
      } else {
        return db.close();
      }

    });
  });

  return null;

}

function mongoDB(callback) {

  MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
    if(err) {
      console.log(err);
    }

    callback(db);

  });

}
