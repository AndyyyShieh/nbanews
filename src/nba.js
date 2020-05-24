
'use strict';

const request = require('request');
const cheerio = require('cheerio');

function getNewsList() {
  return new Promise((resolve) => {
    let news_page_bucket = {};
    request({
      url: "https://nba.udn.com/nba/index?gr=www",
      method: "GET"
    }, async function (error, response, body) {
      if (error || !body) return;

      const $ = cheerio.load(body);
      const nbanews = $(".more");

      const news_page = 'https://nba.udn.com/' + nbanews['0'].attribs.href;
      resolve(await getNews(news_page));
    });
  });
}
function getNews(news_page) {
  return new Promise((resolve) => {
    request({
      url: news_page,
      method: "GET"
    }, function (error, response, body) {
      if (error || !body) return;

      const $ = cheerio.load(body);
      const nbanews = $(".lazyload");
      let news_bucket = [];

      for (let i=0; i<nbanews.length; ++i) {
        news_bucket.push(nbanews[i].parent.next.children[0].data)
      }
      resolve(news_bucket);
    });
  });
}

module.exports.getNewsList = getNewsList;
