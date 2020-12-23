(() => {
    $("#content").css('height', `calc(100% - ${$("header").css('height')} - ${$("footer").css('height')})`);
})();

var provider = new firebase.auth.GoogleAuthProvider();
let _login = false;

function googleSignin() {
   _login = true;

   firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      db.collection("users").doc(user.uid).set({
         name: user.displayName,
         camapigns: [] // owned
     });

      window.location.href = window.location.origin;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) { 
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}

firebase.auth().onAuthStateChanged(user => {
   if (user && !_login) {
     window.location.href = "./";
   }
});

ReactDOM.render(
    <div className="auth">
        <h1> {localStorage.getItem("login") ? "Login" : "Signup" } to Unusual Classes </h1>

        <div>
            <div onClick ={googleSignin} className="signin">
                <img src="./assets/google.svg"></img>
                <h2>Signup with Google</h2>
            </div>
        </div>
    </div>
    
    ,document.getElementById('content')
);