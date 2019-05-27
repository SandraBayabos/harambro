chrome.storage.local.get('enabled', data => {
  chrome.storage.sync.get(['blackListItem'], function (result) {
  console.log(result.blackListItem)
  let badWords = result.blackListItem
  
  function work() {
      console.log("Chrome Extension Go!")
      let links = document.body.querySelectorAll('a')

      for (let i = 0; i < links.length; i++) {
        for (let j = 0; j < badWords.length; j++) {
          if (links[i].href.toLowerCase().includes(badWords[j])||links[i].text.toLowerCase().includes(badWords[j])||links[i].title.toLowerCase().includes(badWords[j])||links[i].text.toLowerCase().includes(badWords[j])) {
            links[i].style.color = "lightgray";
            links[i].addEventListener('click', function (e) { e.preventDefault(); })
            links[i].onclick = function () {
              $.ajax({
                method: 'POST',
                dataType: 'JSON',
                url: 'http://localhost:5000/api/v1/add_entry',
                header: {
                  'Authorization': chrome.storage.jwt
                },
                data: {
                  link: links[i].src
                }


              })
            }
          }
        }
      }
      var elms = document.getElementsByTagName("*"),
        len = elms.length;
      for (var ii = 0; ii < len; ii++) {
        var myChildren = elms[ii].childNodes;
        len2 = myChildren.length;
        for (var jj = 0; jj < len2; jj++) {
          if (myChildren[jj].nodeType === 3) {
            const regexBadWords = new RegExp(badWords.join('|'), 'gi')
            myChildren[jj].nodeValue = myChildren[jj].nodeValue.replace(regexBadWords, "***");
          }
        }

        let images = document.body.querySelectorAll('img')
      for (let p = 0; p < images.length; p++) {
        for (let q = 0; q < badWords.length; q++) {
          if (images[p].src.toLowerCase().includes(badWords[q])||images[p].title.toLowerCase().includes(badWords[q])||images[p].alt.toLowerCase().includes(badWords[q])) {
            images[p].style.filter = "blur(10px)";
          }
        }
      }
      document.getElementsByTagName('html')[0].removeAttribute("style")
    }
  }
  if (data.enabled) {
    document.getElementsByTagName('html')[0].style.opacity = 0
    window.addEventListener('load', work )
  }

  else {
      //it is disabled
  }

});
})
