const reportButton = document.getElementById("btn1");
const carrier = document.getElementById("carrier");
const modal = document.querySelector("#alert-modal");
let bgpage;

window.onload = function () {
  getCount();
  setTimeout(function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let count = getUrlCount(tabs[0].url);
      if (count > 100) openModal(modal);
    });
  }, 0);
};

function sendMessage() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    sendReport(tabs[0].url);
    reportButton.disabled = true;
  });
  getCount();
}

function getCount() {
  setTimeout(function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      bgpage = chrome.extension.getBackgroundPage();
      let count = getUrlCount(tabs[0].url);
      displayCount(count);
    });
  }, 0);
}

function getUrlCount(activeTabUrl) {
  let urlElems = bgpage.dbData.urls;
  for (let i = 0; i < urlElems.length; i++) {
    if (urlElems[i].url == activeTabUrl) {
      return urlElems[i].count;
    }
  }
  return 0;
}

function displayCount(count) {
  document.getElementById("carrier").innerHTML = count;
}

function sendReport(url) {
  chrome.runtime.sendMessage({
    command: "send",
    data: { url },
  });
}

btn1.addEventListener("click", sendMessage);
