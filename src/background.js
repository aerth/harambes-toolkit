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

// right-click context menu
var languageUsed = 'en';
baseapi.storage.sync.get({
  lang: 'en'
}, function(items) {
    languageUsed = items.lang.toLowerCase();
    googletranslate_endpoint = "https://translate.google.com/#view=home&op=translate&sl=auto&tl="+ languageUsed +"&text=";
    googletranslate_endpoint_links = "https://translate.google.com/translate?sl=auto&tl="+ languageUsed +"&u=";
});
var googletranslate_endpoint = "https://translate.google.com/#view=home&op=translate&sl=auto&tl="+ languageUsed +"&text=";
var googletranslate_endpoint_links = "https://translate.google.com/translate?sl=auto&tl="+ languageUsed +"&u=";
const pastebin_endpoint = "https://pastebin.com/search?q=";
const archivetodayURL = "https://archive.today/?run=1&url=";
const webarchiveURL = "https://web.archive.org/save/";
const dissentthisURL = "https://dissenter.com/discussion/begin?url=";
const tweethisURL = "https://twitter.com/intent/tweet?text=";
//const googlemaps_endpoint = "https://maps.google.com/maps?qa=";
const googlemaps_endpoint = "https://www.google.com/maps/search/";

// disable log default
const debug = false;
var debuglog = function(){
  //
}
if (debug) {
  debuglog = console.log
}

function queryencode(input){
  return encodeURIComponent(input);
}


// pop open new tab
function googlemaps_text(searchstring, encode = false)
{
 baseapi.tabs.create({url: googlemaps_endpoint + queryencode(searchstring, encode)});
}
function googletranslate_text(searchstring)
{
  baseapi.storage.sync.get({
    lang: 'en'
  }, function(items) {
      languageUsed = items.lang.toLowerCase();
      googletranslate_endpoint = "https://translate.google.com/#view=home&op=translate&sl=auto&tl="+ languageUsed +"&text=";
      googletranslate_endpoint_links = "https://translate.google.com/translate?sl=auto&tl="+ languageUsed +"&u=";
      baseapi.tabs.create({url: googletranslate_endpoint + queryencode(searchstring)});
  });
}
function googletranslate_link(searchstring){
  baseapi.storage.sync.get({
    lang: 'en'
  }, function(items) {
      languageUsed = items.lang.toLowerCase();
      googletranslate_endpoint = "https://translate.google.com/#view=home&op=translate&sl=auto&tl="+ languageUsed +"&text=";
      googletranslate_endpoint_links = "https://translate.google.com/translate?sl=auto&tl="+ languageUsed +"&u=";
      baseapi.tabs.create({url: googletranslate_endpoint_links + queryencode(searchstring)});
  });
}

function pastebin_search_text(searchstring){
  baseapi.tabs.create({url: pastebin_endpoint + queryencode(searchstring)});
}
function dissent_this(searchstring){
  baseapi.tabs.create({url: dissentthisURL + queryencode(searchstring)});
}
function tweet_this(searchstring){
  baseapi.tabs.create({url: tweethisURL + queryencode(searchstring)});
}
function webarchive_this(searchstring){
  baseapi.tabs.create({url: webarchiveURL + searchstring});
}
function archivetoday_this(searchstring){
  baseapi.tabs.create({url: archivetodayURL + searchstring});
}

const ctxmenu_googlemaps_id = 'googlemaps';
const ctxmenu_googletranslate_id = 'googletranslate';
const ctxmenu_archivetoday_id = 'archivetoday';
const ctxmenu_webarchive_id = 'webarchive';
const ctxmenu_pastebin_id = 'pastebin';
const ctxmenu_dissent_this_id = 'dissent_this';
const ctxmenu_tweet_this_id = 'tweet_this';
const ctxmenu_debug_alert_id = 'debug_alert';

// send link
function switcherlink(info, tab){
  debuglog('link switch fired:', info.linkUrl, info);
  
  const sel = info.linkUrl;
  if (sel === undefined || sel.length < 3) {
    debuglog("skipping:", sel);
    return;
  }
  switch (info.menuItemId) {
    case ctxmenu_dissent_this_id:
      dissent_this(sel);
      break;
    case ctxmenu_tweet_this_id:
      tweet_this(sel);
      break;
    case ctxmenu_pastebin_id:
      pastebin_search_text(sel);
      break;
    case ctxmenu_webarchive_id:
      webarchive_this(sel);
      break;
    case ctxmenu_archivetoday_id:
      archivetoday_this(sel);
      break;
    case ctxmenu_googletranslate_id:
      googletranslate_link(sel);
      break;
    case ctxmenu_debug_alert_id:
      alert("linkUrl: " + sel);
      break;
    case ctxmenu_googlemaps_id:
      googlemaps_text(sel);
      break;
    default:
      debuglog("not handling:", info.menuItemId, sel);
      break;

  }
}

// send text
function switchertext(info, tab){
  const sel = info.selectionText;
  if (sel === undefined || sel.length < 3) {
    debuglog("skipping empty:", sel)
    return;
  }
  switch (info.menuItemId) {
    case ctxmenu_dissent_this_id:
      dissent_this(sel);
      break;
    case ctxmenu_tweet_this_id:
      tweet_this(sel);
      break;
    case ctxmenu_pastebin_id:
      pastebin_search_text(sel);
      break;
    case ctxmenu_webarchive_id:
      webarchive_this(sel);
      break;
    case ctxmenu_archivetoday_id:
      archivetoday_this(sel);
      break;
    case ctxmenu_googletranslate_id:
      googletranslate_text(sel);
      break;
    case ctxmenu_debug_alert_id:
      alert("selectionText: " + sel);
      break;
    case ctxmenu_googlemaps_id:
      googlemaps_text(sel);
      break;
    default:
      debuglog("not handling:", info.menuItemId, sel);
      break;

  }
}

// switch if link or selection
function switcher(info, tab){
        debuglog("Debug:", info.selectionText, info.linkUrl, info.menuItemId)
        if (info.linkUrl === undefined || info.linkUrl == '') {
          debuglog('text mode:', info.selectionText)
          switchertext(info,tab);
          return;
        }
        if (info.selectionText === undefined || info.selectionText == ''){
          debuglog('link mode:', info.linkUrl)
          switcherlink(info,tab);
          return;
        }
        if ((info.selectionText !== undefined && info.linkUrl != undefined) && (info.selectionText != info.linkUrl)) {
          debuglog('text+ mode:', info.selectionText)
          switchertext(info,tab);
          return;
        }
        if ((info.selectionText !== undefined && info.linkUrl != undefined) && (info.selectionText == info.linkUrl)) {
          debuglog('link+ mode:', info.selectionText)
          switcherlink(info,tab);
          return;
        }
        debuglog("error: not executing, no selection and no link.") 
}

// create menu
baseapi.runtime.onInstalled.addListener(function() {
  baseapi.contextMenus.create({
      "id": ctxmenu_googlemaps_id,
      "title": "->Google Maps",
      "type": "normal",
      "contexts": ["selection"],
  });
  baseapi.contextMenus.create({
      "id": ctxmenu_googletranslate_id,
      "title": "->Google Translate",
      "type": "normal",
      "contexts": ["selection", "link"]
  });
  baseapi.contextMenus.create({
    "id": ctxmenu_pastebin_id,
    "title": "->Pastebin Search",
    "type": "normal",
    "contexts": ["selection", "link"]
  });
  baseapi.contextMenus.create({
  "id": ctxmenu_tweet_this_id,
  "title": "->Tweet This",
  "type": "normal",
  "contexts": ["selection", "link"]

  });
  baseapi.contextMenus.create({
    "id": ctxmenu_dissent_this_id,
    "title": "->Dissent This",
    "type": "normal",
    "contexts": ["link"]
});
  baseapi.contextMenus.create({
      "id": ctxmenu_archivetoday_id,
      "title": "->Archive.is",
      "type": "normal",
      "contexts": ["link"]
  });
  baseapi.contextMenus.create({
      "id": ctxmenu_webarchive_id,
      "title": "->WayBackMachine",
      "type": "normal",
      "contexts": ["link"]
  });
// add debug alert button
if (debug){
  console.log("harambe's toolkit *debug mode*")
  baseapi.contextMenus.create({
  "id": ctxmenu_debug_alert_id,
  "title": "->Debug_Alert",
  "type": "normal",
  "contexts": ["selection", "link"]
  });
}
});
baseapi.contextMenus.onClicked.addListener(switcher);
