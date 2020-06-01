const reportButton = document.getElementById("btn1");
const carrier = document.getElementById("carrier");
let bgpage;

window.onload = function () {
  getDBData();
  getCount();
};

function sendMessage() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    sendReportToDB(tabs[0].url);
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
  }, 400);
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

function getDBData() {
  chrome.runtime.sendMessage({
    command: "get",
  });
}

function sendReportToDB(url) {
  chrome.runtime.sendMessage({
    command: "send",
    data: { url },
  });
}

btn1.addEventListener("click", sendMessage);
