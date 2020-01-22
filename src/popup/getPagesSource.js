function DOMtoString(document_root) {
  console.log(document_root);
  var html = '1321';
  return html;
}

chrome.runtime.sendMessage({
  action: 'getSource',
  source: DOMtoString(document)
});
