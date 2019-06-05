/*
    background-script.js
*/

// Update badge text
function badge(msg) {
  browser.browserAction.setBadgeText({text: msg});
}

// Process incoming messages
function notify(message, sender, sendResponse) {

  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(get_configuration, onError);
  
  switch(message.cmd) {

    case 'clear':
        script = 'background:clear';
        badge('');
        configuration.score = [];
        break;

    case 'badge':
        badge(message.counter);
        break;

    case 'save':
        script = 'background:save';
        configuration.score = message.score;
        save_configuration()
        break;

    case 'configuration':
        sendResponse({response: configuration});
        break;

    default:
        console.log('Unknown cmd: ' + message.cmd);
  }


}

browser.runtime.onMessage.addListener(notify);