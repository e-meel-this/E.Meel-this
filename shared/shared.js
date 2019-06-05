
/*
    shared.js
*/
const banner = 'U blokkeert onze banners :(';
var configuration = {
    users: [],
    score: []
}

function onError(e) {
    console.error(e);
}
  
function save_configuration() {

    browser.storage.local.set({configuration});
}

 // Restore Settings
function get_configuration(storedSettings) {
    
    if (!storedSettings.configuration) {
        browser.storage.local.set({configuration});
    }
    
    configuration = storedSettings.configuration;

}

// Clear button badge
function clear_badge_text() {
    browser.runtime.sendMessage({'cmd': 'clear'});
}

function clearRedBanner() {

    var bannerDivs = document.querySelectorAll('div')
        for(var i=0;i<bannerDivs.length;i++){

            var searchfor = bannerDivs[i].innerHTML;
            if (searchfor.includes(banner)) {
                bannerDivs[i].style.display = "none";

                break;
            }
        }   
}