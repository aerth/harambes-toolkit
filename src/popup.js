// Copyright 2019-2021 Harambe's Toolkit Authors, All Rights Reserved
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
//const dissenter_btn2 = document.getElementById('dissent_btn2');
const tweet_btn = document.getElementById('tweet_btn');
const archivetodayURL = "https://archive.today/?run=1&url=";
const webarchiveURL = "https://web.archive.org/save/";
const dissentthisURL = "https://dissenter.com/discussion/begin?url=";
const dissentthisURL2 = 'https://dissenter.com/embed/comments?url=';
const tweethisURL = "https://twitter.com/intent/tweet?text=";
const container = document.getElementById('container');

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
    baseapi.tabs.create({ url: baseapi.runtime.getURL('popup.html') + '?p=comment&url=' + url });
  });
};
tweet_btn.onclick = function(element) {
  baseapi.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    baseapi.tabs.create({ url: tweethisURL+url });
  });
};


/*if (String(window.location).includes(baseapi.runtime.getURL(''))) {
  // here we are on the full-page harambes toolkit page, not just popup box.
  _form = window.location.search
  switch (p) {
    case 'comment':
    default:
      //
  }

}*/
