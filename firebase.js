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
let dbData = {
  urls: [],
};

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command == "getSend") {
    let url = msg.data.url;

    chrome.storage.sync.get((items) => {
      db.ref(items.userid).on(
        "value",
        (data) => (dbData = data.val()),
        (err) => console.log(err)
      );

      if (!dbData.urls.includes(url)) {
        db.ref(items.userid).set({ urls: [...dbData.urls, url] });
      }
    });
  }
});
