(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAfAdr7INrUgK7FZK--DYAdztEmNfheGZo",
    authDomain: "nofakes-4e476.firebaseapp.com",
    databaseURL: "https://nofakes-4e476.firebaseio.com",
    projectId: "nofakes-4e476",
    storageBucket: "nofakes-4e476.appspot.com",
    messagingSenderId: "515972758324",
    appId: "1:515972758324:web:d8724bf271edd243c44361",
    measurementId: "G-PTKE3G0DGR",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
})();

const btnLogin = document.getElementById("btnLogin");
const tokenP = document.getElementById("tokenP");
const userP = document.getElementById("userP");
const userImg = document.getElementById("userImg");

btnLogin.addEventListener("click", (e) => {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      tokenP.innerText = "Token: " + token;
      userP.innerText = "User: " + user.email;
      userImg.src = user.photoURL;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(errorMessage);
    });
});
