import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

const auth = getAuth();
const db = getFirestore();
onAuthStateChanged(auth , (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef= doc(db , "users" , loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if (docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('LoggedUserName').innerText=userData.Name;
                document.getElementById('loggedUserEmail').innerText=userData.email;


            }
            else 
            {
                console.log('No Documents Matching Id')
            }

        })
        .catch((error)=>{
            console.log("Error Getting Documents");
        })
    }
    else {
        console.log('User Not Found In LocalStorage')
    }
})


const logOutButton = document.getElementById('logOut');

logOutButton.addEventListener('click' , ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='login.html';
    })
    .catch((error)=>{
        console.error('Error SignOut' , error);
    })
})


