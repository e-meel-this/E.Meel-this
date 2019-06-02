function onError(error) {
    console.log(`Error: ${error}`);
}

function createNode(ndx, user, stat, header=False) {

    var node = document.createElement('tr');
    node.innerHTML = "<td>" + user + "</td><td></td><td align='right'>" + stat + "</td>";
    return node;
}

// Update Popup Info
function UpdatePopUp(users, score) {

    for (var jj = 0; jj<users.length;jj++) { 
        if ( score[jj] > 0)
            document.getElementById("score").appendChild(createNode(jj, users[jj], score[jj], jj==0));    
    }
}

// Restore Users
function get_annoying_users(storedSettings) {

    users = '';
    score = [];

    if (storedSettings.users === null || storedSettings.score === null) {
        browser.storage.local.set({users: '', score: []});
    } else {
        users = storedSettings.users;
        score = storedSettings.score;
    }

    users = users.split(',');
    UpdatePopUp(users, score);
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(get_annoying_users, onError);
