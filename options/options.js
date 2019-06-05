/*
    options.js
*/
function saveOptions() {
  
  var users = document.querySelector("#users").value;

  configuration.users = users.split(',');
  save_configuration();

}

function restoreOptions() {

  function updateOptions() {

    var str_users = configuration.users.toString();
    document.querySelector("#users").value = str_users || "";
  }

  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(get_configuration, onError).then(updateOptions);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);