// Copyright 2019 Harambe's Toolkit Authors, All Rights Reserved
let baseapi = null;
let browserType = '';
if (typeof browser != 'undefined') {
  baseapi = browser;
  browserType = 'firefox';
} else if (typeof chrome != 'undefined') {
  baseapi = chrome;
  browserType = 'chrome';
}

// main icon toolbar
const archivetoday_btn = document.getElementById('archivetoday_btn');
const archiveorg_btn = document.getElementById('archiveorg_btn');
const dissenter_btn = document.getElementById('dissent_btn');
const tweet_btn = document.getElementById('tweet_btn');
const archivetodayURL = "https://archive.today/?run=1&url=";
const webarchiveURL = "https://web.archive.org/save/";
const dissentthisURL = "https://dissenter.com/discussion/begin?url=";
const tweethisURL = "https://twitter.com/intent/tweet?text=";

archivetoday_btn.onclick = function(element) {
  baseapi.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    baseapi.tabs.create({ url: archivetodayURL+encodeURIComponent(url) });
  });
};
archiveorg_btn.onclick = function(element) {
  baseapi.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    baseapi.tabs.create({ url: webarchiveURL+url });
  });
};
dissenter_btn.onclick = function(element) {
  baseapi.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    baseapi.tabs.create({ url: dissentthisURL+url });
  });
};
tweet_btn.onclick = function(element) {
  baseapi.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    baseapi.tabs.create({ url: tweethisURL+url });
  });
};
