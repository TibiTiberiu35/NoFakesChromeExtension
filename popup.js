const btn1 = document.getElementById("btn1");
const carrier = document.getElementById("carrier");
let data = { url: "", vote: false };

function sendMessage(e) {
  if (!data.vote) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({
        command: "getSend",
        data: { url: tabs[0].url },
      });
    });
    data.vote = true;
    displayCount();
  }
}

function displayCount() {
  document.getElementById("carrier").innerHTML = 1;
}

btn1.addEventListener("click", sendMessage);
