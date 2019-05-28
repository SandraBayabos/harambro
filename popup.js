let title = document.createElement("div")
title.innerHTML = "Harambro"

let toggle = document.createElement('input');

let button = document.createElement('button')
var image = document.createElement('IMG')
image.setAttribute('src', 'images/setting(1).png')
button.appendChild(image)


let header = document.querySelector('header')

let email = document.createElement("label")
email.innerHTML = "Email     :"

//Create login form in popup for use on first time

let form = document.createElement("form");
form.setAttribute('method', "post");
let input = document.createElement("input"); //input element, text
input.setAttribute('type', "text");
input.setAttribute('name', "email");

let password = document.createElement("label")
password.innerHTML = "Password:"

let input1 = document.createElement("input"); //input element, text
input1.setAttribute('type', "password");
input1.setAttribute('name', "password");

let submit = document.createElement("input"); //input element, Submit button
submit.setAttribute('type', "submit");
submit.setAttribute('value', "Submit");

//make api call
form.onsubmit = function (e) {
  e.preventDefault()
  console.log(input.value, input1.value)
  $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url: 'http://localhost:5000/api/v1/sessions/login',
    data: JSON.stringify({
      email: input.value,
      password: input1.value
    }),
    success: function (data) {
      console.log(data)
      console.log(data.auth_token)
      auth_token = data.auth_token
      //saving to chrome storage
      chrome.storage.sync.set({ jwt: auth_token }, function () {
        console.log(`Value is set to ${auth_token}`)
      })
      chrome.storage.sync.get(['jwt'], function (result) {
        console.log(`Value currently is ${result.jwt}`)
      })

    },
    error: function (response) {
      console.log(response)
    }

  })
}


// header.appendChild(button)
header.appendChild(button)
header.appendChild(title)
form.appendChild(email)
form.appendChild(input);
form.appendChild(password);
form.appendChild(input1);
form.appendChild(submit);

document.getElementsByTagName('body')[0].appendChild(form);

let body = document.querySelector('body')
title.style.fontSize = "28px"
body.style.width = "300px"
body.style.margin = "15px"
body.style.display = 'flex'
body.style.justifyContent = 'center'
body.style.flexDirection = 'column'
body.classList.add('container')
button.classList.add('setting')
header.style.alignItems = 'left'
button.classList.add('go-to-options')
button.style.width = '25px'
button.style.heigt = "25px"
button.style.alignItems = 'right'
image.style.width = '25px'
image.style.height = '25px'
button.style.border = 'none'
button.style.background = 'transparent'

document.querySelector('.go-to-options').addEventListener('click', function () {
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

