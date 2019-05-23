chrome.storage.local.get('enabled', data => {
  console.log(data.enabled)
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
            myChildren[jj].nodeValue = myChildren[jj].nodeValue.replace(/sugar|momo challenge|boobs/gi, "***");
          }
        }
      }

      // let images = document.body.querySelectorAll('img');
      // images.forEach(image => {
      //   image.style.filter = 'blur(10px)'
      // });
      // let images = document.body.querySelectorAll('img');
      // // for (let i = 0; i < images.length; i++) {
      // images.forEach(image => {
      //   if (images.alt == "Google") {
      //     console.log(image.id)
      //     images.setAttribute('alt', '')
      //   } else {
      //     images.style.filter = 'blur(10px)'
      //   }
      // });
      // }
      document.body.querySelectorAll('img').forEach(image => {
        if (image.id !== 'hplogo' && image.id !== 'logo' && image.alt !== 'Google') {
          image.style.filter = "blur(10px)"
        }
      });

      document.getElementsByTagName('html')[0].style.display = 'inline-flex'

      let links = document.body.querySelectorAll('a')
      // console.log(links)
      links.forEach(link => {
        link.setAttribute('href', '#')
      })
    }
  }
  else {
    //it is disabled
  }
});

