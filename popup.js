// let blurWord = document.getElementById('blurWord');

// blurWord.onclick = function myFunction() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.executeScript(
//       tabs[0].id,
//       { file: 'blurfunction.js' }
//     )
//   })
// }
let enabled = true;
const myButton = document.getElementById('toggle');

chrome.storage.local.get('enabled', data => {
  console.log(data.enabled,'get')
    enabled = !!data.enabled;
    myButton.checked = enabled ? true : false;
});

myButton.onclick = () => {
  enabled = !enabled;
  console.log(enabled,'click')
  chrome.tabs.reload()
    // myButton.checked = enabled ? true : false;
    chrome.storage.local.set({enabled:enabled});
};
document.querySelector('#go-to-options').addEventListener('click',function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});


