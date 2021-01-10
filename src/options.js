// Copyright 2019-2020 Harambe's Toolkit Authors, All Rights Reserved
let baseapi = null;
let browserType = '';
if (typeof browser != 'undefined') {
  baseapi = browser;
  browserType = 'firefox';
} else if (typeof chrome != 'undefined') {
  baseapi = chrome;
  browserType = 'chrome';
}

const discussExtensionUrl = 'https://dissenter.com/discussion/begin?url=https://chrome.google.com/webstore/detail/harambes-toolkit/hmkpigohjcnjmfnbbmmjkjphemofibdd';

function save_options() {
    var lang = document.getElementById('language').value;
    if (lang === undefined) {
        console.log("no language");
        return;
    }
    baseapi.storage.sync.set({
      lang: lang.toLowerCase()
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
    closetab();
  }

function restore_options() {
    // default lang = 'en'
    baseapi.storage.sync.get({
      lang: 'en'
    }, function(items) {
      document.getElementById('language').value = items.lang.toUpperCase();
    });
  }


function closetab(){
    window.close();
}
function discuss(){
    window.close();
    baseapi.tabs.create({ url: discussExtensionUrl});
}
  
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('close').addEventListener('click', closetab);
document.getElementById('discuss').addEventListener('click', discuss);
