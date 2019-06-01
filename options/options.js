function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    users: document.querySelector("#users").value
  });
}

function restoreOptions() {

  function setCurrentAnnoyingUsers(result) {
    document.querySelector("#users").value = result.users || "";
    saveOptions();
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("users");
  getting.then(setCurrentAnnoyingUsers, onError);
}

function init() {

  if (localStorage.getItem('users') === null || localStorage.getItem('score') === null) {
      browser.storage.local.set({users: '', score: []});
  }
 
}

init();

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
