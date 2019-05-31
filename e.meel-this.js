function onError(e) {
   console.log('Errors!');
   console.error(e);
 }

function just_ignore(storedSettings) {

   var options_users = storedSettings.users;
   var users = options_users.split(',');

   for (var ii=0; ii<users.length; ii++) {

      var user = users[ii].trim();

      var selector = "'https://www.nieuwskoerier.nl/user/" + user + "'";
      var x = document.querySelectorAll("a[href=" + selector + "]");   

      var counter = 0
      for (var jj = 0; jj<x.length;jj++) { 
         counter++; 
         // x[jj].parentElement.parentElement.parentElement.parentElement.style.display = "none";
         x[jj].parentNode.parentNode.parentNode.parentNode.style.display = "none";
      }
   
      if (counter > 0) {
         console.log(counter + ' Messages ingnored for ' + user);
      }
   }
	
};

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(just_ignore, onError);
