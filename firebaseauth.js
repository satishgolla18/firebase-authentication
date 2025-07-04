 // Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDpf--0GJN02MZ8ZI9BH6a-I13GBnRDtsA",
  authDomain: "login-forms-664d0.firebaseapp.com",
  projectId: "login-forms-664d0",
  storageBucket: "login-forms-664d0.appspot.com",
  messagingSenderId: "971951024168",
  appId: "1:971951024168:web:e6ced2b5d4a09382b02d1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Show message function
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerText = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector(".auth-form");
  
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store only non-sensitive data
        const userData = { email: email };

        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            showMessage("Account Created Successfully", "signUpMessage");
            setTimeout(() => {
              window.location.href = "login.html";
            }, 2000);
          })
          .catch((error) => {
            console.error("Error writing document:", error);
            showMessage("Firestore write error", "signUpMessage");
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showMessage("Email already in use", "signUpMessage");
        } else {
          showMessage("Registration failed", "signUpMessage");
        }
      });
  });
});
const signIn =  document.getElementById('submitt');
 signIn.addEventListener('click' , (event)=>{
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth(); 
  signInWithEmailAndPassword(auth , email , password)
  .then((userCredential)=>{
    showMessage('login is successfully' , 'signInMessage');
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId' , user.uid);
    window.location.href = 'index.html';
  })
  .catch((error)=>{
    if(error.code == 'auth/invalid-credential'){
      showMessage('In Correct Email Or Password' , 'signInMessage');
    }
    else {
      showMessage('Account Does Not Exist' ,'signInMessage' );
    }
  })
 })