let items = ["sugar", "fuck", "sex", "shit", "asshole", "porn", "bitch", "momo", "pussy", "cunt", "ass", "nigger"]
chrome.storage.sync.set({ blackListItem: items })
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");

  });
  chrome.storage.local.set({ enabled: true })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https', 'http', 'file', '*'] },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});