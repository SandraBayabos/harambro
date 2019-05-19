// let blurWord = document.getElementById('blurWord');

// blurWord.onclick = function myFunction() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       { file: 'blurfunction.js' }
//     )
//   })
// }

document.querySelector('#go-to-options').addEventListener('click',function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});