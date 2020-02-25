var db = firebase.firestore();
var token = localStorage.getItem("authToken");
const collectionRef = db.collection('users').doc(token).collection('notes');
var notesForm = document.getElementById('notesForm');

function addNotes(title, description){
    if(title == ""){
        alert("Title can't be empty");
        notesForm.reset();
        notesSubmitButtonWrapper.classList.remove("loader");
    }
    else{
        collectionRef.add({
            'title': title,
            'description' : description
        })
        .then((docRef) => {
            notesForm.reset();
            notesSubmitButtonWrapper.classList.remove("loader");
            redirectToHome(); 
        })
        .catch((err) => {
            alert("Sorry Try again");
            notesForm.reset();
            notesSubmitButtonWrapper.classList.remove("loader");
        });
    }  
}