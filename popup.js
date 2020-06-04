const reportButton = document.getElementById("reportButton");
const carrier = document.getElementById("carrier");
const modal = document.querySelector("#alert-modal");
let bgpage;

window.onload = function () {
  chrome.runtime.sendMessage({ command: "getActiveTabUrl" }, () => {
    chrome.runtime.sendMessage({ command: "getActiveTabCount" }, () => {
      getBackgroundPage();
      displayCount(bgpage.count);
      showWarningAlertModal(bgpage.count);
    });
  });
};

function sendMessage() {
  chrome.runtime.sendMessage({ command: "sendReport" }, (response) => {
    reportButton.disabled = true;
    displayCount(response.newCount);
  });
}

function getBackgroundPage() {
  bgpage = chrome.extension.getBackgroundPage();
}

function displayCount(count) {
  document.getElementById("carrier").innerHTML = count;
}

function showWarningAlertModal(count) {
  if (count > 100) openModal(modal);
}

reportButton.addEventListener("click", sendMessage);
