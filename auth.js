var firebaseConfig = {
    apiKey: "AIzaSyDYpWIb4L6LhrBIdbERuWRykfWUNGuY0C8",
    authDomain: "mynote-79217.firebaseapp.com",
    databaseURL: "https://mynote-79217.firebaseio.com",
    projectId: "mynote-79217",
    storageBucket: "mynote-79217.appspot.com",
    messagingSenderId: "23813060489",
    appId: "1:23813060489:web:918a6ffbdae676eed05358",
    measurementId: "G-3CL1VWPVKJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var homeButton = document.getElementById("homeButton");
var signupButton = document.getElementById("signupButton");
var loginButton = document.getElementById("loginButton");
var signupSubmitButton = document.getElementById("signupSubmitButton");
var loginSubmitButton = document.getElementById("loginSubmitButton");
var signupSubmitButtonWrapper = document.getElementById("signupSubmitButtonWrapper");
var loginSubmitButtonWrapper = document.getElementById("loginSubmitButtonWrapper");
var logoutButton = document.getElementById("logoutButton");
var notesSubmitButton = document.getElementById("notesSubmitButton");
var notesSubmitButtonWrapper = document.getElementById("notesSubmitButtonWrapper");

function redirectToHome(){
    actionPage.style.display = "block";
    signupPage.style.display = "none";
    loginPage.style.display = "none";
    notesPage.style.display = "none";
}

function loginNavigation(){
    loginButton.style.display = "block";
    signupButton.style.display = "block";
    logoutButton.style.display = "none";
}

function logoutNavigation(){
    loginButton.style.display = "none";
    signupButton.style.display = "none";
    logoutButton.style.display = "block";
}

function redirectToLogin(){
    actionPage.style.display = "none";
    signupPage.style.display = "none";
    loginPage.style.display = "block";
    notesPage.style.display = "none";
}

function redirectToSignup(){
    actionPage.style.display = "none";
    signupPage.style.display = "block";
    loginPage.style.display = "none";
    notesPage.style.display = "none";
}

homeButton.addEventListener("click",() => {
    closeNav();
    redirectToHome();
});

signupButton.addEventListener("click",() => {
    closeNav();
    redirectToSignup();
});

loginButton.addEventListener("click", () => {
    closeNav();
    redirectToLogin();
});

logoutButton.addEventListener("click", () => {
    localStorage.setItem("authToken",null);
    loginNavigation();
    addButton.style.display = "none";
});

signupSubmitButton.addEventListener("click",(e) => {
    e.preventDefault();
    signupSubmitButtonWrapper.classList.add("loader");
    var email = document.getElementById("signupUserEmail").value;
    var password = document.getElementById("signupUserPassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((success) => {
        signupSubmitButtonWrapper.classList.remove("loader");
        redirectToLogin();
    })
    .catch(function(error) {
        signupSubmitButtonWrapper.classList.remove("loader");
        var errorCode = error.code;
        var errorMessage = error.message;
        switch(errorCode){
            case 'auth/email-already-in-use':
                alert('This email exist. Try login');
                break;
            case 'auth/invalid-email':
                alert('Invalid Email');
                break;
            default:
                alert(errorMessage);
                break;
        }
    });
});

loginSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginSubmitButtonWrapper.classList.add("loader");
    var email = document.getElementById("loginUserEmail").value;
    var password = document.getElementById("loginUserPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
        userUid = data['user']['uid'];
        localStorage.setItem("authToken",userUid);
        logoutNavigation();
        loginSubmitButtonWrapper.classList.remove("loader");
        addButton.style.display = "block";
        redirectToHome();
    })
    .catch(function(error) {
        loginSubmitButtonWrapper.classList.remove("loader");
        var errorCode = error.code;
        var errorMessage = error.message;
        switch(errorCode){
            case 'auth/wrong-password':
                alert('Wrong password.');
                break;
            case 'auth/invalid-email':
                alert('Invalid Email');
                break;
            case 'auth/user-disabled':
                alert('Sorry this user is disabled');
                break;
            case 'auth/user-not-found':
                alert('There is no user in this email');
                break;
            default:
                alert(errorMessage);
                break;
        }
    });
});

notesSubmitButton.addEventListener('click',(e) => {
    e.preventDefault();
    notesSubmitButtonWrapper.classList.add("loader");
    var noteTitle = document.getElementById("noteTitle").value;
    var noteDescription = document.getElementById("noteDescription").value;
    console.log(noteTitle,noteDescription);
    addNotes(noteTitle,noteDescription);
});