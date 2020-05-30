const btn1 = document.getElementById("btn1");
const carrier = document.getElementById("carrier");

window.onload = function () {
  chrome.runtime.sendMessage({
    command: "get",
  });
  getCount();
};

function sendMessage(e) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.runtime.sendMessage({
      command: "send",
      data: { url: tabs[0].url },
    });
    btn1.disabled = true;
  });
  getCount();
}

function getCount() {
  setTimeout(function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let bgpage = chrome.extension.getBackgroundPage();
      for (let i = 0; i < bgpage.dbData.urls.length; i++) {
        if (bgpage.dbData.urls[i].url == tabs[0].url) {
          displayCount(bgpage.dbData.urls[i].count);
        }
      }
    });
  }, 200);
}

function displayCount(count) {
  if (isNaN(count)) {
    document.getElementById("carrier").innerHTML = 0;
  } else {
    document.getElementById("carrier").innerHTML = count;
  }
}

btn1.addEventListener("click", sendMessage);
