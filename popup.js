// let blurWord = document.getElementById('blurWord');

// blurWord.onclick = function myFunction() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       { file: 'blurfunction.js' }
//     )
//   })
// }

document.querySelector('#go-to-options').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});


var enabled = true;
var myButton = document.getElementById('toggle');

chrome.storage.local.get('enabled', data => {
  console.log(data.enabled, 'get')
  enabled = !!data.enabled;
  myButton.checked = enabled ? true : false;
  console.log(enabled,"get")
  
});

myButton.onclick = () => {
  console.log(enabled, 'click')

  enabled = !enabled;
  

  chrome.storage.local.set({ enabled: enabled });
if (enabled == false) {
    const password = prompt("Please key in your password");
    if (password !== '1234') {
      alert('Please key in a correct password.')
      chrome.storage.local.set({ enabled: true })
    }
}
chrome.tabs.reload()
};