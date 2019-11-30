// Copyright 2019 Harambe's Toolkit Authors, All Rights Reserved
let archivetoday_btn = document.getElementById('archivetoday_btn');
archivetoday_btn.onclick = function(element) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    chrome.tabs.create({ url: "https://archive.today/?run=1&url="+url });
  });
};

let archiveorg_btn = document.getElementById('archiveorg_btn');
archiveorg_btn.onclick = function(element) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    chrome.tabs.create({ url: "https://web.archive.org/save/"+url });
  });
};

let dissenter_btn = document.getElementById('dissent_btn');
dissenter_btn.onclick = function(element) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    chrome.tabs.create({ url: "https://dissenter.com/discussion/begin?url="+url });
  });
};

let tweet_btn = document.getElementById('tweet_btn');
tweet_btn.onclick = function(element) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    chrome.tabs.create({ url: "https://twitter.com/intent/tweet?text="+url });
  });
};
