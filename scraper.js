var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');
var models = require('./sources.json');

for (var i = models.length - 1; i >= 0; i--) {
  scrapeModel(models[i]);
}

function scrapeModel(model) {
  getUrlsBySourceId(model.sourceId, function(err, cursor) {

    if (err) {
      return console.error(err);
    }

    var counter = 0;

    cursor.each(function(err, jobLink) {

      if (err) {
        return console.error(err);
      };

      console.log('Current link ' + counter++ + ':');
      console.log(jobLink);

      if (jobLink === null) {
        return null;
      }

      api.scrape(jobLink._id, model.jobPost.model, model.jobPost.options, function(err, data) {

        if (err) {
          return console.error(err);
        }

        data.url = jobLink._id;

        data.sourceId = model.sourceId;

        if (data.appendDesc) {
          data.desc = data.desc + ' ' + data.appendDesc;
          delete data.appendDesc;
        }

        storePage(data);

      });

    });

  });

}

function mongoDB(callback) {

  MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
    if(err) {
      return console.error(err);
    }

    callback(db);

  });

}

function getUrlsBySourceId(sourceId, callback) {
  mongoDB(function(db) {

    var jobLinks = db.collection('jobLinks');

    var cursor;

    try {
      cursor = jobLinks.find({ sourceId: sourceId });
    } catch (err) {
      return callback(err);
    }

    return callback(null, cursor);

  });
}

function storePage(page) {

  mongoDB(function(db) {

    var jobPosts = db.collection('jobPosts');
    var jobLinks = db.collection('jobLinks');

    console.log('Saving:');
    console.log(page);

    jobPosts.save(page, function(err) {

      if(err) {
        db.close();
        return console.log(err);
      }


      console.log(page.url);
      jobLinks.remove({ _id: page.url }, function(err, result) {
        if (err) {
          db.close();
          return console.error(err);
        }

        return db.close();

      });
    });
  });
}
