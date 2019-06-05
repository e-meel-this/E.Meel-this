/* 
    Annoying Users
*/
function restoreOptions() {

    function createNode(ndx, user, stat, header=False) {

        var node = document.createElement('tr');
        node.innerHTML = "<td>" + user + "</td><td></td><td align='right'>" + stat + "</td>";

        return node;
    }
    
    // Update Popup Info
    function UpdatePopUp() {
    
        for (var jj = 0; jj<configuration.users.length;jj++) { 
            if ( configuration.score[jj] > 0)
                document.getElementById("score").appendChild(createNode(jj, configuration.users[jj], configuration.score[jj], jj==0));    
        }
    }
    
  
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(get_configuration, onError).then(UpdatePopUp);
  
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);