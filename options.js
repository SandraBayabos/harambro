//BLACK LIST//

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var deleteButton = document.createElement("BUTTON");
  span.className = "close";
  span.appendChild(deleteButton);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
var len = close.length
for (i = 0; i < len; i++) {
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
    if (!result.blackListItem) {
      return
    }
    for (let i = 0; i < result.blackListItem.length; i++) {
      let t = document.createTextNode(result.blackListItem[i])
      let li = document.createElement("li")
      li.appendChild(t)
      document.getElementById("myUL").appendChild(li)
      let span = document.createElement("SPAN");
      let closeButton = document.createElement("BUTTON");
      closeButton.innerHTML = "X"
      span.className = "close";
      span.appendChild(closeButton);
      li.appendChild(span);

      for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
          let div = this.parentElement;
          //add in logic here to delete it from chrome storage
          div.style.display = "none";
        }
      }
    }
  })
}

addItem.onclick = (newElement) => {
  // var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;

  //to retrieve item from chrome storage
  chrome.storage.sync.get(['blackListItem'], function (result) {
    let items = result.blackListItem
    if (!items) {
      items = []
    }
    items = [...items, inputValue]
    chrome.storage.sync.set({ blackListItem: items }, function () {
      getItems()
    });
  })
  // takes in the inputValue that the user types in & appends it into the list below
  // var t = document.createTextNode(inputValue);
  // li.appendChild(t);
  // if (inputValue === '') {
  //   alert("You must write something!");
  // }
  //  else {

  //   //to retrieve item from chrome storage
  //   chrome.storage.sync.get(['asd'], function (result) {
  //     console.log(result)
  //     document.getElementById("myUL").appendChild(li);
  //   })
  // }
  document.getElementById("myInput").value = "";
}

getItems()