var casper = require('casper').create({
    verbose: true
  , logLevel: 'error'
  , userAgent: 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
  , pageSettings: {
      loadImages: false
    } 
  })

  , secret = require('./secret')
  , siteA  = require('./resources/crawl-site-a')(casper, secret)

siteA.crawl()


casper.run()