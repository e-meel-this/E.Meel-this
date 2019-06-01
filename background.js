/*
 background-script.js
*/

function onError(error) {
  console.log(`Error: ${error}`);
}

var views = chrome.extension.getViews({type: "popup"});

function init() {

  if (localStorage.getItem('users') === null || localStorage.getItem('score') === null) {
      browser.storage.local.set({users: '', score: []});
  }
 
}

// Clear and save score
function saveScore(score) {
  browser.storage.local.set({
    score: score
  });
}

// Update badge text
function badge(msg) {
  browser.browserAction.setBadgeText({text: msg});
}

// Process incoming messages
browser.runtime.onMessage.addListener(notify);
function notify(message) {

  switch(message.cmd) {

    case 'clear':
        badge('');
        saveScore([])
        break;

    case 'badge':
        badge(message.counter);
        break;

    case 'save':
        saveScore(message.score);
        break;

    default:
        console.log('Unknown cmd: ' + message.cmd);
  }

}

// Init Storage
init();