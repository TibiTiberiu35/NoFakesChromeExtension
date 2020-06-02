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

const db = firebase.database();
window.dbData = {
  urls: [{ count: 0, url: "" }],
};
let sessionUrls = [];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.command == "get") {
    getData();
  } else if (msg.command == "send") {
    let url = msg.data.url;

    if (!sessionUrls.includes(url)) {
      setData(url);
      sessionUrls.push(url);
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  getData();
});

function getData() {
  db.ref().on("value", gotData, gotError);
}

function gotData(data) {
  window.dbData = data.val();
}

function gotError(err) {
  console.log(err);
}

function setData(activeTabUrl) {
  let urlsElems = window.dbData.urls;
  for (let i = 0; i < urlsElems.length; i++) {
    if (urlsElems[i].url == activeTabUrl) {
      incrementExistentReportInstance(urlsElems[i].count, i);
      return;
    }
  }

  createNewReportInstance(activeTabUrl, urlsElems.length);
}

function incrementExistentReportInstance(count, index) {
  db.ref("urls/" + index + "/count/").set(++count);
}

function createNewReportInstance(url, index) {
  db.ref("urls/" + index).set({ count: 1, url });
}
