chrome.storage.local.get('enabled', data => {
  chrome.storage.sync.get(['blackListItem'], function (result) {
    console.log(result.blackListItem)
    let badWords = result.blackListItem
    if (data.enabled) {
      document.getElementsByTagName('html')[0].style.display = 'none'

      window.onload = function () {
        console.log("Chrome Extension Go!")

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
        }

        document.body.querySelectorAll('img').forEach(image => {
          if (image.id !== 'hplogo' && image.id !== 'logo' && image.alt !== 'Google') {
            image.style.filter = "blur(10px)"
          }
        });

        document.getElementsByTagName('html')[0].style.display = 'inline-flex'

        let links = document.body.querySelectorAll('a')

        for (let i = 0; i < links.length; i++) {
          for (let j = 0; j < badWords.length; j++) {
            if (links[i].href.toLowerCase().includes(badWords[j])) {
              links[i].addEventListener('click', function (e) { e.preventDefault(); })

              //saving links to database onclick

              links[i].onclick = function () {
                $.ajax({
                  method: 'post',
                  url: 'api/v1/add_entry',
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
      }
    }
    else {
      //it is disabled
    }
  })
});

