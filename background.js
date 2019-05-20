chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");

  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https', 'http'] },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

//Matt says have to build backend as an API then make an API call using fetxh.
//return a JWT to store in browser
// Basic fetch request to fetch a JSON file and print it to the console.
//fetch() takes one argument, returns a promise containing the response, json() extracts the JSON content
fetch('http://google.com/images.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(JSON.stringify(myJson));
  });

//To post a response from the server
const Url = 'https://google.com/images';
const image = {
  name: "",
  id: "",
}
axios({
  method: 'post',
  url: Url,
  data: {
    image
  }
})
  .then(data => console.log(data))
  .catch(err => console.log(err))


