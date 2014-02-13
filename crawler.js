var casper = require('casper')
  , secret = require('./secret')

casper.create()

var siteA  = require('./resources/crawl-site-a')(casper, secret)

