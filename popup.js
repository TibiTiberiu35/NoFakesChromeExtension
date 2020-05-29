const btn1 = document.getElementById("btn1");
const carrier = document.getElementById("carrier");

window.onload = function () {
  chrome.runtime.sendMessage({
    command: "get",
  });
  // chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {

  // });
  let bgpage = chrome.extension.getBackgroundPage();
  let dbData = bgpage.dbData;
  console.log(dbData);
};

function sendMessage(e) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.runtime.sendMessage({
      command: "send",
      data: { url: tabs[0].url },
    });
    btn1.disabled = true;
  });
}

function displayCount() {
  document.getElementById("carrier").innerHTML = 1;
}

btn1.addEventListener("click", sendMessage);
