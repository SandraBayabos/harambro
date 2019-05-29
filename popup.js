//header with toggle button, locker button, option setting button
let header = document.querySelector('header')
let nav = document.querySelector('nav')
let buttonLocker = document.createElement('button')
var lock = document.createElement('IMG')
lock.setAttribute('src', 'images/lock.png')
lock.setAttribute('class', 'locker')
nav.appendChild(buttonLocker)

let div1 = document.createElement("span")
div1.setAttribute("class", "container");
div1.innerHTML = '<label class="switch"><input id="toggle" type="checkbox"><span class="slider round"></span>'
header.appendChild(div1)


let buttonSetting = document.createElement('button')
var image = document.createElement('IMG')
image.setAttribute('src', 'images/setting(1).png')
buttonSetting.classList.add('go-to-options')
buttonSetting.appendChild(image)
header.appendChild(buttonSetting)

header.style.display = "none"
//////////////////////LOCK & UNLOCK BUTTON//////////////////////
let clickState = 1
buttonLocker.onclick = function (e) {
  if (clickState == 0) {
    lock.setAttribute('src', 'images/lock.png')
    clickState = 1;
    header.style.display = "none";
    document.querySelector("section").style.display= "none";
  } else {    
    // const inputPassword = prompt('Enter password')
    // inputPassword.inputType = 'password'
    // if (inputPassword !== '1234') {
    //   alert('Please enter correct password')
    //   console.log(inputPassword)
      // clickState = 1
      
    //////////////////////TO UNLOCK ENTER PASSWORD & MAKE API CALL TO VERIFY PASSWORD//////////////////////
    // inputPassword.onsubmit = function () {
    //   $.ajax({
    //     method: 'POST',
    //     dataType: 'JSON',
    //     url: 'http://localhost:5000/api/v1/sessions/checkpassword',
    //     header: {
    //       'Authorization':
    //         chrome.storage.sync.get(['jwt'], function (result) { console.log(`Value currently is ${result.jwt}`) })
    //     },
    //     data: {
    //       password: inputPassword
    //     },
    //     success: function (response) {
    //       if (response.status == 'OK') {
    //         // render the on button and the settings page
            lock.setAttribute('src', 'images/unlock.png')
            clickState = 0;
            header.removeAttribute('style')
            document.querySelector("section").removeAttribute('style')
    //         // clickState = 1
    //       }
    //     },
    //     error: function (response) {
    //       alert('wrong password')
    //     }
    //   })
    // }

  }
}
buttonLocker.appendChild(lock)

let passwordForm= document.createElement("section")
passwordForm.innerHTML='<br/><div class="form-popup" id="myForm"><form action="/action_page.php" class="form-container"><label for="psw"><b>Please enter your password</b></label><input type="password" placeholder="Password" name="psw" required><div><br/><button type="submit" class="btn btn-primary btn-sm">OK</button>\n<button type="submit" class="btn btn-light btn-sm" onclick="closeForm()">Close</button></form></div></div>'
document.body.appendChild(passwordForm)
document.querySelector("section").style.display= "none";
function closeForm() {
  document.querySelector("section").style.display= "none";
}
//////////////////////ON CLICK UNLOCK PROMPT PASSWORD//////////////////////


// //////////////////////TO LOCK BACK AGAIN//////////////////////

// lock.onclick = function () {
//   $.ajax({
//     method: 'POST',
//     dataType: 'JSON',
//     url: 'http://localhost:5000/api/v1/sessions/checkpassword',
//     header: {
//       'Authorization':
//         chrome.storage.sync.get(
//           ['jwt'], function (result) {
//             console.log(`auth_token is ${result.jwt}`)
//           })
//     },
//     data: {
//       password: input_password
//     },
//     success: function (response) {
//       if (response.status == 'OK') {
//         document.getElementById('container').innerHTML('')
//         // add an unlock button
//         document.getElementById('container').appendChild(unlockbutton)

//       }
//     },
//     error: function (response) {
//       alert('wrong password')
//     }
//   })
// }


//////////////////////LOGIN FORM//////////////////////
//////////////////////CREATE LOGIN FORM FOR USE ON FIRST TIME//////////////////////

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

//////////////////////MAKE API CALL TO VERIFY EMAIL & PASSWORD//////////////////////

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
      //////////////////////SAVE JWT TO CHROME STORAGE//////////////////////
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
body.style.width = "280px"
body.style.margin = "15px"
// button.classList.add('setting')
header.style.alignItems = 'left'
buttonSetting.style.width = '25px'
buttonSetting.style.heigt = "25px"
buttonSetting.style.alignItems = 'right'
buttonSetting.style.border = 'none'
buttonSetting.style.background = 'transparent'
image.style.width = '25px'
image.style.height = '25px'
image.style.width = '25px'
image.style.height = '25px'
lock.style.width = '25px'
lock.style.height = '25px'
buttonLocker.style.border = 'none'
buttonLocker.style.background = 'transparent'

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
  // if (enabled == false) {
  //   const password = prompt("Please key in your password");
  //   if (password !== '1234') {
  //     alert('Please key in a correct password.')
  //     chrome.storage.local.set({ enabled: true })
  //   }
  // }
  chrome.tabs.reload()
};




