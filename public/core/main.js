var firebaseConfig = {
    apiKey: "AIzaSyBNjRJwnsvxXeLemCDCsI_8Ya7AJWdcCyc",
    authDomain: "unusual-classes.firebaseapp.com",
    databaseURL: "https://unusual-classes.firebaseio.com",
    projectId: "unusual-classes",
    storageBucket: "unusual-classes.appspot.com",
    messagingSenderId: "127369098589",
    appId: "1:127369098589:web:5240d39d2c61a864b2a4b4",
    measurementId: "G-1DT5KRVYNC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
// const perf = firebase.performance();

const _params = new URLSearchParams(window.location.search)

firebase.auth().onAuthStateChanged(user => {
    if (!user && !document.location.href.endsWith("/auth")) {
        document.location.href = document.location.origin + "/auth";
        $("#sign-in").css('display', "block");
        $("#sign-name").css('display', "none");
    }else {
        $("#sign-name").css('display', "block");
        $("#sign-in").css('display', "none");
        $("#sign-name").html(user.displayName);
    }
});

firebase.firestore().enablePersistence()
.catch(function(err) {
    if (err.code == 'failed-precondition') {
    console.log("YAY... uh oh")
    }else if (err.code == 'unimplemented') {
    console.log("OOF")
    }
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}