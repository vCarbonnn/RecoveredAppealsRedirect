// ==UserScript==
// @name         Recovered Appeals Redirect
// @namespace    http://www.reddit.com/u/vCarbonnn
// @updateURL    https://github.com/vCarbonnn/RecoveredAppealsRedirect/raw/master/RecoveredAppealsRedirect.user.js
// @version      1.0
// @description  When an appeal cannot be found, redirects the user to a recovered version if it exists.
// @author       Carbon
// @include      http://support.koalabeast.com/*
// ==/UserScript==

var CARBON_TAGPRO_APPEALS_URL = "http://carbontagproappeals.uphero.com/appeal.php/";

if(window.location.href.indexOf("ticket/") > 0) { //Can't use hashes in @include, so checking in the script itself.
   checkForHistoricalAppeal();
}

function checkForHistoricalAppeal() {
   var containerChildCount = document.getElementById("container").childElementCount;
   if(containerChildCount === 0) {
      var newUrl = CARBON_TAGPRO_APPEALS_URL + getAppealId();
      var externalCount = 0;

      $.ajax({
         async: false,
         type: 'GET',
         url: newUrl,
         success: function(data) {
            externalCount = $(data).find("#container")[0].childElementCount;
         }
      });

      if(externalCount > 0) {
         window.location.href = newUrl;
      }
   }
}

function getAppealId() {
   var url = window.location.href;
   return url.substr(url.lastIndexOf("/")+1, 36);
}
