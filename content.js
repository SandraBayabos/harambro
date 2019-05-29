let JWT

chrome.storage.sync.get(['jwt'], function (result) {
  JWT = result.jwt
})


chrome.storage.local.get('enabled', data => {
  chrome.storage.sync.get(['blackListItem'], function (result) {
    console.log(result.blackListItem)
    let badWords = result.blackListItem

    function work() {
      console.log("Chrome Extension Go!")
      let links = document.body.querySelectorAll('a')

      for (let i = 0; i < links.length; i++) {
        for (let j = 0; j < badWords.length; j++) {
          if (links[i].href.toLowerCase().includes(badWords[j]) || links[i].text.toLowerCase().includes(badWords[j]) || links[i].title.toLowerCase().includes(badWords[j]) || links[i].text.toLowerCase().includes(badWords[j])) {
            links[i].style.color = "lightgray";
            ////////////////////////SAVE BLOCKED CLICKED LINK TO DATABASE////////////////////////
            links[i].onclick = function (e) {
              e.preventDefault();

              const data = {
                link: links[i].href
              }
              $.ajax({
                method: 'POST',
                dataType: 'JSON',
                contentType: "application/json",
                url: 'http://localhost:5000/api/v1/history/add_entry',
                headers: {
                  'Authorization': 'Bearer ' + JWT
                },
                data: JSON.stringify(data),
                success: function (response) {
                  if (response.status == 'OK') {
                    console.log(response.status)
                  }
                },
                error: function (error) {
                  console.log(error)
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
            myChildren[jj].nodeValue = myChildren[jj].nodeValue.replace(regexBadWords, function (blur) { return `${'*'.repeat(blur.length)}` });
          }
        }
      }
      let images = document.body.querySelectorAll('img')
      for (let p = 0; p < images.length; p++) {
        for (let q = 0; q < badWords.length; q++) {
          if (images[p].src.toLowerCase().includes(badWords[q]) || images[p].title.toLowerCase().includes(badWords[q]) || images[p].alt.toLowerCase().includes(badWords[q])) {
            images[p].style.filter = "blur(10px)";
          }
        }
      }
      document.getElementsByTagName('html')[0].removeAttribute("style")
    }

    if (data.enabled) {
      document.getElementsByTagName('html')[0].style.opacity = 0
      window.addEventListener('load', work)
    }

    else {
      //it is disabled
    }

  });
})
