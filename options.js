//BLACK LIST//

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var deleteButton = document.createElement("BUTTON");
  //add dataset to deleteButton
  deleteButton.dataset.id = 'deleteButton'

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
    if (!result.blackListItem) {
      return
    }
    for (let i = 0; i < result.blackListItem.length; i++) {
      const keyword = result.blackListItem[i]
      let t = document.createTextNode(keyword)
      let li = document.createElement("li")
      li.appendChild(t)
      li.id = keyword
      document.getElementById("myUL").appendChild(li)
      let span = document.createElement("SPAN");
      let closeButton = document.createElement("BUTTON");
      closeButton.id = keyword
      closeButton.classList.add('delete-btn')
      closeButton.innerHTML = "X"
      span.appendChild(closeButton);
      li.appendChild(span);

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = function (e) {
          const wordToRemove = e.target.id
          const targetLi = document.getElementById(wordToRemove)

          // remove the clicked <li>
          targetLi.parentNode.removeChild(targetLi)

          // remove keyword from chrome storage
          chrome.storage.sync.get(['blackListItem'], function ({ blackListItem }) {
            chrome.storage.sync.set({ blackListItem: blackListItem.filter(keyword => keyword != wordToRemove) })
          })
        }
      })

      // for (i = 0; i < close.length; i++) {
      //   close[i].onclick = function () {
      //     let div = this.parentElement;
      //     div.style.display = "none";

      //add in logic here to delete it from chrome storage

      // let wordToRemove = document.querySelector('li').childNodes[i].data
      // console.log(bannedWords)

      // chrome.storage.sync.get(['blackListItem'], function (result) {
      //   let items = blackListItem

      //   let ind = items.indexOf(wordToRemove)

      //   items.splice(//something here)
      //     chrome.storage.set({ blackListItem: items })
      // })

      //   }
      // }
    }
  })
}

addItem.onclick = (newElement) => {
  // var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert('Please insert a word to blacklist.')
  } else {

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
    document.getElementById("myInput").value = "";
  }
}

getItems()