chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  if (msg.get) {
    // var url = tabs[0].url + '/members/';
    // window.location.replace(url);
    console.log(window);
  }
  response(msg);
});
