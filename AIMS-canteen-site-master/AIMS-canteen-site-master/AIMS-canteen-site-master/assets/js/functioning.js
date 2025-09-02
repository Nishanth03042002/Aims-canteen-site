  // --- Authentication Part ---
  // Your web app's Firebase configuration
  const firebaseConfig = {

    apiKey: "AIzaSyDNX5PGjfPIad7v87iooDjzABBmYlrxTYs",

    authDomain: "aims-canteen.firebaseapp.com",

    projectId: "aims-canteen",

    storageBucket: "aims-canteen.firebasestorage.app",

    messagingSenderId: "162448331507",

    appId: "1:162448331507:web:39d549c2a2fa819e4e1d86"

  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);  
  
  // SignUp Form ID's -
  const myForm = document.getElementById("main-form");
  const googleSignUp = document.querySelectorAll("#google-signUpIn");

  
  // SignIn Form ID's -
  const signInForm = document.getElementById('signIn-form');

  // Sign Up Methods -
  class signUpMethods {
    // Basic LogIn System
    builtInSignUp(){
      const userName = myForm["sign-up-full-name"].value;
      const email = myForm["sign-up-email"].value;
      const password = myForm["sign-up-password"].value;
      const repassword = myForm["sign-up-repassword"].value;
      const phoneNumber = myForm["sign-up-number"].value;

      // CheckStuff -
      if (password != repassword || password === ''){
        Swal.fire('Re Entered password is not same as entered password or field empty')
      }
      else if (phoneNumber.length != 10){
        Swal.fire('Phone Number is not valid')
      }
      else {
        // Firebase Auth
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          // Save Data to firebase storage -
          saveDatabase.UserfirebaseDatabase(userName, email, password, phoneNumber);
          Swal.fire({
            icon: 'success',
            title: 'Account Created Successfully. Please LogIn To order Delicious Cuisine',
          })
        })
        .catch((error) => Swal.fire("" + error));
      }
    }
  
    // Google SignUp Method -
    googleSignUpIn(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result.email);
          this.notifyUser();
          this.firebaseAuthRedirect();
        })
        .catch((error) => Swal.fire("" + error));
    }
  
    // FaceBook SignUp Method -
    
  
    // GitHub SignUp Method -
   
    static authRedirecting() {
      window.setTimeout(() => {
        window.location.replace('https://aims-canteen-site.netlify.app/client-side');
      }, 500)
    }

    // Notify User
    notifyUser() {
      window.setTimeout(function(){
        Swal.fire({
          icon: 'success',
          title: 'Account Signed In Successfully',
        })
      },1250)
    }

    firebaseAuthRedirect(){
      firebase.auth().onAuthStateChanged(function(user) {
        // If user is registered -
        user ?  window.location.replace('https://aims-canteen-site.netlify.app/client-side') : console.log('none');
      });
    }
  }

  // Sign In Methods -
  class signInMethods {
    builtInSignIn(){
    const email =  document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;
    console.log('called');

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
      })
      signUpMethods.authRedirecting()
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: '' + error,
      })
    });
    }
  }

  // Save Data - To Firebase
  class saveDatabase {
    // Authentication Details -
    static UserfirebaseDatabase(userName, email, password, phoneNumber) {
      const userID = makeUserDataID(email);     
      // Create User data in firebase -
      console.log('database called');
      firebase.database().ref('User_Data/' + userID).set({
        User_Name: userName,
        Email: email,
        Password: password,
        Phone_Number: phoneNumber,
      });
    }

    // Cart Detailes
  }

  // When HTML & Other code is done -
  document.addEventListener("DOMContentLoaded", () => {
    // Sign Up Mehtods -
    const signUp = new signUpMethods();

    // Main Sign Up Form
    if (myForm) {
      myForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signUp.builtInSignUp();
      });
    }

    // Google Sign Up Form
    if (googleSignUp) {
      googleSignUp.forEach(element => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          signUp.googleSignUpIn();
        });
      });
    }

    // GitHub Sign Up Form
    

    // Facebook Sign Up Form
    

    // Sign In Methods -
    const signIn = new signInMethods();
    if (signInForm){
      // Main Sign In Form
      signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signIn.builtInSignIn();
      });
    }

    // LogOut User -
    const logout = document.querySelectorAll('#userlogout');
    if (logout){
      logout.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          Swal.fire({
            icon: 'success',
            title: 'Logged Out Successfully',
          })
          firebase.auth().signOut().then(() => {
            window.location.replace("https://aims-canteen-site.netlify.app/index.html")
          });
        });
      })
    }

  });

// Makes User ID Through EmailID Provided By User
let userDataID = '';
function makeUserDataID(userEmailID){
  // let userDataID = '';
  for (i=0; userEmailID.length; i++){
    if (userEmailID[i] != '@') { userDataID = userDataID + userEmailID[i] }
    else { break }
  }
  return userDataID
}