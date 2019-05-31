let JWT

chrome.storage.sync.get(['jwt'], function (result) {
  JWT = result.jwt
})

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
nav.style.display = 'none'
// form.style.display = "none"
//////////////////////LOCK & UNLOCK BUTTON//////////////////////
let clickState = 1
buttonLocker.onclick = function (e) {
  if (clickState == 0) {
    //lock
    lock.setAttribute('src', 'images/lock.png')
    header.style.display = "none";
    clickState = 1
    document.querySelector(".form-container").reset();
  } else if (clickState == 1) {
    //lock with password form
    lock.setAttribute('src', 'images/lock.png')
    document.querySelector("section").removeAttribute('style')
  }
  else {
    //unlock
    lock.setAttribute('src', 'images/unlock.png')

    clickState = 0 //when click,back to lock
  }
}
buttonLocker.appendChild(lock)

let passwordForm = document.createElement("section")
passwordForm.innerHTML = '<div class="form-popup" id="myForm"><form class="form-container"><label for="psw"><b>Please enter your password</b></label><input type="password" id="pwform" placeholder="Password" class="form-control" name="psw" required><button type="submit" class="btn btn-primary btn-sm ">Ok</button><button id="closebutton" type="button" class="btn btn-light btn-sm">Close</button></form>'
document.body.appendChild(passwordForm)
document.querySelector("section").style.display = "none";
let closebutton = document.getElementById('closebutton')
closebutton.onclick = function () {
  document.querySelector("section").style.display = "none";

  clickState = 0


}
//////////////////////ON CLICK UNLOCK PROMPT PASSWORD//////////////////////

function hidePasswordForm() {
  passwordForm.style.display = "none"
}

let passwordInputField = document.getElementById('pwform')

passwordForm.onsubmit = function (e) {
  e.preventDefault();
  chrome.storage.sync.get(['jwt'], function (storage) {
    const passwordInput = passwordInputField.value
    console.log(passwordInput)
    $.ajax({
      method: 'POST',
      dataType: 'JSON',
      contentType: "application/json",
      url: 'https://helikopter.herokuapp.com/api/v1/sessions/checkpassword',
      headers: {
        'Authorization': 'Bearer ' + storage.jwt
      },
      data: JSON.stringify({
        password: passwordInput
      }),
      success: function (response) {
        if (response.status == 'success') {
          console.log(response.status)
          hidePasswordForm()
          header.removeAttribute('style')
          lock.setAttribute('src', 'images/unlock.png')

          clickState = 0 //lock again when the lock is click
        }
      },
      error: function (error) {
        console.log(error)
        alert('Wrong password, please try again.')
      }
    })
  })
}

// //////////////////////TO LOCK BACK AGAIN//////////////////////

// lock.onclick = function () {
//   $.ajax({
//     method: 'POST',
//     dataType: 'JSON',
//     url: 'https://helikopter.herokuapp.com/api/v1/sessions/checkpassword',
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
let asideSignIn = document.createElement("aside")
document.body.appendChild(asideSignIn)
let form = document.createElement("form");
asideSignIn.appendChild(form)



form.setAttribute('class', 'form')
form.setAttribute('method', "post");
form.setAttribute('action', "submit.php");

let logo = document.createElement('IMG')
logo.setAttribute('src', 'images/heli_logo.png')
logo.setAttribute('width', '180')
logo.setAttribute('height', '40')
document.getElementById('logo').appendChild(logo)

let email = document.createElement("label")
email.innerHTML = "Email     :"
form.appendChild(email)

let input = document.createElement("input"); //input element, text
input.setAttribute('type', "text");
input.setAttribute('name', "email");
input.setAttribute('class', 'form-control')
form.appendChild(input);

let password = document.createElement("label")
password.innerHTML = "Password:"
form.appendChild(password);

let input1 = document.createElement("input"); //input element, text
input1.setAttribute('type', "password");
input1.setAttribute('name', "password");
input1.setAttribute('class', 'form-control')
form.appendChild(input1);

let submit = document.createElement("input"); //input element, Submit button
submit.setAttribute('type', "submit");
submit.setAttribute('value', "Submit");
submit.setAttribute('class', 'btn btn-outline-info btn-sm')
form.appendChild(submit);

let newUsers = document.createElement("P")
newUsers.innerHTML = "For new users, <a target='_blank' href='https://helikopter.herokuapp.com'>Sign Up Here</a>"
form.appendChild(newUsers)

///// Upon Loading Popup, check JWT to display form or interface //////

function hideLoginForm() {
  document.querySelector("aside").style.display = "none"
}

chrome.storage.sync.get(['jwt'], function (response) {
  if (response.jwt) {

    hideLoginForm()
    nav.removeAttribute('style')
  }
})


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
    url: 'https://helikopter.herokuapp.com/api/v1/sessions/login',
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

      hideLoginForm()
      nav.removeAttribute('style')
      clickState = 1
    },
    error: function (response) {
      console.log(response)
      alert('Please enter a correct email and password.')
    }

  })
}


// document.getElementsByTagName('body')[0].appendChild(form);

let body = document.querySelector('body')
body.style.width = "230px"
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
  chrome.tabs.reload()
};


