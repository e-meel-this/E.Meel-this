function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    users: document.querySelector("#users").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#users").value = result.users || "E.Meel";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("users");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);