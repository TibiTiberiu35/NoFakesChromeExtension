const firebaseConfig = {
  apiKey: "AIzaSyANWvKDDQ8gjuJmaoLUf-EjecrvzycuRFY",
  authDomain: "nofakes-3372a.firebaseapp.com",
  databaseURL: "https://nofakes-3372a.firebaseio.com",
  projectId: "nofakes-3372a",
  storageBucket: "nofakes-3372a.appspot.com",
  messagingSenderId: "441762572863",
  appId: "1:441762572863:web:23262cad770296e9d2268a",
  measurementId: "G-M6BXP45F3Q",
};

firebase.initializeApp(firebaseConfig);

let dbData = {
  urls: [{ count: 0, url: "" }],
};
let activeTabUrl = "";
let urlIndex = null;
let userReportedUrls = [];
window.count = 0;

chrome.runtime.onInstalled.addListener(() => {
  getData();
  getUserReportedUrls();
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.command === "getActiveTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (arrayOfTabs) => {
      activeTabUrl = arrayOfTabs[0].url;
      setUrlIndex(activeTabUrl);
    });
    sendResponse();
  } else if (msg.command === "getActiveTabCount") {
    window.count = urlIndex !== null ? dbData.urls[urlIndex].count : 0;
    sendResponse();
  } else if (msg.command === "sendReport") {
    if (wasAlreadyReportedByUser(activeTabUrl)) {
      setDataToDatabase(activeTabUrl);
      addReportedUrl(activeTabUrl);
      window.count++;
    }
    sendResponse({ newCount: window.count });
  }
});

function getData() {
  firebase.database().ref().on("value", gotData, gotError);
}

function gotData(data) {
  dbData = data.val();
}

function gotError(err) {
  console.log(err);
}

function getUserReportedUrls() {
  chrome.storage.sync.get(["userReportedUrls"], (result) => {
    userReportedUrls = result.userReportedUrls ? result.userReportedUrls : [];
  });
}

function setUrlIndex(url) {
  urlIndex = getUrlIndex(url);
}

function getUrlIndex(url) {
  let urlsElems = dbData.urls;
  for (let i = 0; i < urlsElems.length; i++) {
    if (urlsElems[i].url === url) return i;
  }
  return null;
}

function wasAlreadyReportedByUser(url) {
  return !userReportedUrls.includes(url);
}

function setDataToDatabase(activeTabUrl) {
  if (urlIndex === null) {
    createNewReportInstance(activeTabUrl, dbData.urls.length);
    return;
  }
  incrementExistentReportInstance(window.count, urlIndex);
}

function createNewReportInstance(url, index) {
  firebase
    .database()
    .ref("urls/" + index)
    .set({ count: 1, url });
}

function incrementExistentReportInstance(count, index) {
  firebase
    .database()
    .ref("urls/" + index + "/count/")
    .set(++count);
}

function addReportedUrl(url) {
  userReportedUrls.push(url);
  chrome.storage.sync.set({
    userReportedUrls: userReportedUrls,
  });
}
