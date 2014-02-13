var casper
  , secret
  , crawler = {}

exports.module = function(_casper, _secret) {

  casper = casper || _casper
  secret = secret || _secret
  return crawler
}

crawler.crawl = function() {

}