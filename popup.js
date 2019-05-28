//header with title, toggle button, locker button, option setting button
let header = document.querySelector('header')
let title = document.createElement("span")
title.innerHTML = "Harambro"
header.appendChild(title)
let div1 = document.createElement("span")
div1.setAttribute("class", "container");
div1.innerHTML = '<label class="switch"><input id="toggle" type="checkbox"><span class="slider round"></span>'
header.appendChild(div1)


let button = document.createElement('button')
var image = document.createElement('IMG')
image.setAttribute('src', 'images/setting(1).png')
button.appendChild(image)
header.appendChild(button)

let button1 = document.createElement('button')
var lock = document.createElement('IMG')
lock.setAttribute('src', 'images/lock.jpg')
lock.setAttribute('class', 'locker')
header.appendChild(button1)

let clickState = 0
button1.onclick = function (e) {
  if (clickState == 0) {
    // code snippet 1
    // btn.textContent = 'Unlocked';
    lock.setAttribute('src', 'images/lock.jpg')
    clickState = 1;
  } else {
    // code snippet 2
    // this.textContent = 'Locked';
    lock.setAttribute('src', 'images/unlock.jpg')
    clickState = 0;
  }
}

button1.appendChild(lock)

//login form
//Create login form in popup for use on first time

let form = document.createElement("form");
form.setAttribute('method', "post");
form.setAttribute('action', "submit.php");

let email = document.createElement("label")
email.innerHTML = "Email     :"
form.appendChild(email)

let input = document.createElement("input"); //input element, text
input.setAttribute('type', "text");
input.setAttribute('name', "email");
form.appendChild(input);

let password = document.createElement("label")
password.innerHTML = "Password:"
form.appendChild(password);

let input1 = document.createElement("input"); //input element, text
input1.setAttribute('type', "password");
input1.setAttribute('name', "password");
form.appendChild(input1);

let submit = document.createElement("input"); //input element, Submit button
submit.setAttribute('type', "submit");
submit.setAttribute('value', "Submit");
form.appendChild(submit);

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

document.getElementsByTagName('body')[0].appendChild(form);

let body = document.querySelector('body')
title.style.fontSize = "28px"
body.style.width = "280px"
body.style.margin = "15px"
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
image.style.width = '25px'
image.style.height = '25px'
lock.style.width = '25px'
lock.style.height = '25px'
button1.style.border = 'none'
button1.style.background = 'transparent'

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


