//BLACK LIST//

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var deleteButton = document.createElement("BUTTON");

  span.appendChild(deleteButton);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
let addItem = document.getElementById('addButton');

function getItems() {
  document.getElementById("myUL").innerHTML = ""
  chrome.storage.sync.get(['blackListItem'], function (result) {
    console.log(result)
    if (!result.blackListItem) {
      return
    }
    for (let i = result.blackListItem.length - 1; i >= 0; i--) {
      const keyword = result.blackListItem[i]
      let t = document.createTextNode(keyword)
      let li = document.createElement("li")
      li.appendChild(t)
      li.id = keyword
      li.style.width = "50%"
      li.style.margin = "6px"
      li.style.marginLeft = "auto"
      li.style.marginRight = "auto"
      document.getElementById("myUL").appendChild(li)
      // let span = document.createElement("SPAN");
      let closeButton = document.createElement("BUTTON");
      closeButton.id = keyword
      closeButton.classList.add('delete-btn')
      closeButton.innerHTML = "X"
      // span.appendChild(closeButton);
      li.appendChild(closeButton);

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = function (e) {
          const wordToRemove = e.target.id
          const targetLi = document.getElementById(wordToRemove)

          // remove the clicked <li>
          targetLi.parentNode.removeChild(targetLi)

          // remove keyword from chrome storage. function({blackListItem}) is same as results.blackListItem
          chrome.storage.sync.get(['blackListItem'], function ({ blackListItem }) {
            console.log(blackListItem)
            chrome.storage.sync.set({ blackListItem: blackListItem.filter(keyword => keyword != wordToRemove) })
          })
        }
      })
    }
  })
}


let items = []
addItem.onclick = (newElement) => {
  // var li = document.createElement("li");
  chrome.storage.sync.get(['blackListItem'], function (result) {
    items = result.blackListItem
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert('Please insert a word to blacklist.')
  }
  else if (/[ 0-9#$%=@!{},`~&*()'<>?.:;_|^/+\t\r\n\[\]"-]/.test(inputValue)) {
    alert('Number and symbol is not allowed.');
  }
  else if (inputValue.length < 3) {
    alert('Your word is too common/short.')
  }
  else if (items.includes(inputValue)){
    alert("This word is already in your blacklist.")
  }
  else {

    //to retrieve item from chrome storage
      //items is defined as a variable in global scope and you are assigning it a value within the empty array
      // if (!items) {
      //   items = []
      // }
      items = [...items, inputValue]
      chrome.storage.sync.set({ blackListItem: items }, function () {
        getItems()
      });
      console.log(items)
    

    document.getElementById("myInput").value = "";
  }})
}
getItems()

function openWin() {
  window.open("https://helikopter.herokuapp.com");
}

$('#logout-btn').on('click', function () {
  chrome.storage.sync.set({ jwt: null })
  $('#logout-btn-container').html('You are now logged out!')
})