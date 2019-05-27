// let blurWord = document.getElementById('blurWord');

// blurWord.onclick = function myFunction() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       { file: 'blurfunction.js' }
//     )
//   })
// }

//Create login form in popup for use on first time
let form = document.createElement("form");
form.setAttribute('method', "post");
form.setAttribute('action', "submit.php");

let input = document.createElement("input"); //input element, text
input.setAttribute('type', "text");
input.setAttribute('name', "username");

let submit = document.createElement("input"); //input element, Submit button
submit.setAttribute('type', "submit");
submit.setAttribute('value', "Submit");

form.appendChild(input);
form.appendChild(submit);

document.getElementsByTagName('body')[0].appendChild(form);

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

var clickState = 0;
var btn = document.querySelector('.button-elem');

btn.addEventListener('click', function () {

  if (clickState == 0) {
    // code snippet 1
    this.textContent = 'Unlocked';
    clickState = 1;
  } else {
    // code snippet 2
    this.textContent = 'Locked';
    clickState = 0;
  }

});

