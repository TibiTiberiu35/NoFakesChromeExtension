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
    db.ref().on(
      "value",
      (data) => (window.dbData = data.val()),
      (err) => console.log(err)
    );
  } else if (msg.command == "send") {
    let url = msg.data.url;

    if (!sessionUrls.includes(url)) {
      let found = false;

      for (let i = 0; i < window.dbData.urls.length; i++) {
        if (window.dbData.urls[i].url == url) {
          let newCount = ++window.dbData.urls[i].count;
          db.ref("urls/" + i + "/count/").set(newCount);
          found = true;
        }
      }

      if (found == false) {
        db.ref("urls/" + window.dbData.urls.length).set({ count: 1, url: url });
      }

      sessionUrls.push(url);
    }
  }
});
