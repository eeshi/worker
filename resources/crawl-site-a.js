var casper
  , secret
  , crawler 
  , utils = require('../utils')

module.exports = crawler = function(_casper, _secret) {

  casper = casper || _casper
  secret = secret || _secret

  crawler.site = []

  return crawler
}

crawler.crawl = function() {

  var startUrl = secret.site[0].url
    , siteLinks = []

  casper.start(startUrl, function() {

    this.echo(utils.getColoredStatus(casper) + ' ' + startUrl)
    
    siteLinks = this.getElementsInfo('div.job p a.title_compact')

    for (var i = 0; i < siteLinks.length; i++) {
      siteLinks[i] = siteLinks[i].attributes.href
    };  
  })

  casper.then(function() {  

    var baseUrl = this.getGlobal('location').origin

    this.each(siteLinks, function(self, link) {
      self.thenOpen(baseUrl + link, function() {
       
        var currentUrl = this.getCurrentUrl()
          , logMessage = utils.getColoredStatus(casper) + ' ' + currentUrl
          
          self.echo(logMessage)

      })
    })
  })

}
