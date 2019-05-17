let blurWord = document.getElementById('blurWord');

blurWord.onclick = function myFunction() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { file: 'blurfunction.js' }
    )
  })
}

/* Button logic
   if button is on :
    return blur word function
    else :
    prompt a password
    disable blur word function.
*/
