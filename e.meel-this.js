/*
   browser action content script
*/

function onError(error) {
   console.log(`Error: ${error}`);
 }
 
// Restore Settings
function get_annoying_users(storedSettings) {

   users = '';
   score = [];

   if (storedSettings.users === null || storedSettings.score === null) {
       browser.storage.local.set({users: '', score: []});
   } else {
       users = storedSettings.users;
       score = storedSettings.score;
   }

   var users = users.split(',');

   just_ignore(users);
}

// Clear button badge
function clear_badge_text() {
   browser.runtime.sendMessage({'cmd': 'clear'});
}

function clearRedBanner() {

   var bannerDivs = document.querySelectorAll('div')
   for(var i=0;i<bannerDivs.length;i++){

      var searchfor = bannerDivs[i].innerHTML;
      if (searchfor.includes('U blokkeert onze banners :(')) {
         bannerDivs[i].style.display = "none";

         break;
      }
   }   

}

// Find user posts and hides them
function just_ignore(users) {

   clearRedBanner();

   var posts_hidden = 0;   // Number of posts hidden posts / user
   var score = [];         // Number of hidden Post / user

   clear_badge_text();

   for (var ii=0; ii<users.length; ii++) {

      var user = users[ii].trim();

      if (user.length > 0) {

      // Find all posts for user
         var user_posts = document.querySelectorAll("img[alt='" + user + "']")

         var badge_counter = 0;  // Badge counter

         // Hide the messages
         for (var jj = 0; jj<user_posts.length;jj++) { 

            badge_counter++; 
            posts_hidden++;

            // If we hide the parent.parent.parent.parent, the post is not visible anymore
            user_posts[jj].parentNode.parentNode.parentNode.parentNode.style.display = "none";
            browser.runtime.sendMessage({'cmd': 'badge', 'counter': posts_hidden.toString()});
         }

         score.push(badge_counter);
      }

   }

   // Save score
   browser.runtime.sendMessage({'cmd': 'save', 'score': score});

};

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(get_annoying_users, onError);

window.onbeforeunload = function() {
   clear_badge_text();
};

/*
window.addEventListener('click',function(e)
{
    e = e || window.event;
    var target = e.target || e.srcElement;
    console.log('window noticed you clicked something');
    console.log(target);
}, false);
*/