function onError(error) {
  console.log(`Error: ${error}`);
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    users: document.querySelector("#users").value
  });
}

function restoreOptions() {

  function setCurrentAnnoyingUsers(users) {
    document.querySelector("#users").value = users || "";
  }

  function init(storedSettings) {

    var users = '';

    if (storedSettings.users === null || storedSettings.score === null) {
        browser.storage.local.set({users: '', score: []});
    } else {
        users = storedSettings.users;
    }

    setCurrentAnnoyingUsers(users);

  }
  

  let gettingItem = browser.storage.local.get(["users", "score"]);
  gettingItem.then(init, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);