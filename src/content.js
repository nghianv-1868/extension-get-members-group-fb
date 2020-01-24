chrome.runtime.onMessage.addListener(async function(msg, sender, response) {
  if (msg.trigger) {
    var origin = window.origin;
    var href = window.location.href;
    var arrHref = href.split('/');
    var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
    window.location.replace(linkGroupMembers);
  }
  response(msg);
});

$(document).ready(async function() {
  var origin = window.origin;
  var href = window.location.href;
  var arrHref = href.split('/');
  var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
  if (window.location.href === linkGroupMembers) {
    chrome.runtime.sendMessage(
      {
        msg: 'getStatusTrigger'
      },
      function(response) {
        if (response.data) {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              if ($('span.uiMorePagerLoader.pam.uiBoxLightblue').length === 0) {
                clearInterval(timer);
                var listItem = $('a._60rg._8o._8r.lfloat._ohe');
                var arrayProfile = [];
                for (var i = 0; i < listItem.length; i++) {
                  arrayProfile.push({
                    Name: listItem[i].title,
                    Link: listItem[i].href
                  });
                }
                chrome.runtime.sendMessage(
                  {
                    msg: 'arrayProfile',
                    data: arrayProfile
                  },
                  function(res) {
                    console.log(res);
                  }
                );
              }
            }
          }, 10);
        }
      }
    );
  }
});
