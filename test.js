var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');
var fs = require('fs');
var url;
var model;
var options;

// Computrabajo example

url = 'http://www.computrabajo.com.ve/bt-ofrd-dismetro-0.htm';
model = {
  pageTitle: 'title',
  title: 'td[align=center] > font[size=2] > b',
  desc: 'td[colspan=2] > p[align=justify] font[size=2]',
  links: {
    selector: 'a[href="/"]',
    get: 'href',
    multi: true
  }
};
options = {
  requestOptions: {
    encoding: 'binary'
  },
  cheerioOptions: {}
};


// Bumeran example

// url = 'http://www.bumeran.com.ve/empleos/ingeniero-civil-de-campo-y-tsu-en-construccion-civil-muros-y-o-pantallas-atirantadas-proyectos-y-construcciones-sabpi-c.a.-1001707776.html';
// model = {
//   pageTitle: 'title',
//   title: 'h2.h2',
//   desc: '#contenido_aviso'
// };
// options = {};



api.scrape(url, model, options, function(err, data) {

  if (err) {
    return console.error(err);
  }

  data.url = url;

  console.log(data);

  mongoDB(function(db) {
    
    var jobPosts = db.collection('jobPosts');
    jobPosts.insert(data, function(err, docs) {
      
      if(err) {
        console.log(err);
      }
      db.close();
    });

  });

});


function mongoDB(callback) {
  
  MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
    if(err) {
      console.log(err);
    }

    callback(db);

  });

}
