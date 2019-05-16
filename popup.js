let blurWord = document.getElementById('blurWord');

blurWord.onclick = function myFunction() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { file: 'blurfunction.js' }
    )
  })
}
