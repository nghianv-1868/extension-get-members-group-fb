chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  console.log(msg);
  response(msg);
});
