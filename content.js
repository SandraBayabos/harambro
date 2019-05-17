console.log("Chrome Extension Go!")

var elms = document.getElementsByTagName("*"),
  len = elms.length;
for (var ii = 0; ii < len; ii++) {
  var myChildren = elms[ii].childNodes;
  len2 = myChildren.length;
  for (var jj = 0; jj < len2; jj++) {
    if (myChildren[jj].nodeType === 3) {

      // example on update a text node's value
      myChildren[jj].nodeValue = myChildren[jj].nodeValue.replace(/sugar/gi, "***");
    }
  }
}