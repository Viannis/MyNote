function initial(){
    var token = localStorage.getItem("authToken");
    if(token != "null"){
        logoutNavigation();  
        addButton.style.display = "block"; 
    }
    else{
        loginNavigation();
        addButton.style.display = "none";
    }
}

window.addEventListener('DOMContentLoaded', initial, false);

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

let addButton = document.getElementById("addButton");
let moreButton = document.getElementById("moreButton");
let closeButton = document.getElementById("closeButton");
addButton.addEventListener('click',() => {
    actionPage.style.display = "none";
    signupPage.style.display = "none";
    loginPage.style.display = "none";
    notesPage.style.display = "block";
})
moreButton.addEventListener("click",() => openNav() );
closeButton.addEventListener("click",() => closeNav());

let actionPage = document.getElementById("actionPage");
let signupPage = document.getElementById("signupPage");
var loginPage = document.getElementById("loginPage");
var notesPage = document.getElementById("notesPage");

actionPage.style.display = "block";
signupPage.style.display = "none";
loginPage.style.display = "none";
notesPage.style.display = "none";

function addNoteInUi(data, id){
    const html = `
        <div class="card" data-id="${id} style="height:80px;box-shadow:none;border-radius:10px;border:0.6px solid #8c8c8c;width:95%;">
            <div class="card-content" style="padding-top: 5px;padding-left:15px;padding-right:10px;padding-bottom: 5px;">
                <span class="card-title activator" style="font-size:18px;margin-bottom: 0px;">Title<i class="material-icons right">more_vert</i></span>
                <div style="display: flex;justify-content: space-between;padding-top:3px;">
                <p style="margin: 0px;">${data.title}</p>
                <span><i class="material-icons" data-id="${id}">delete_outline</i></span>
                </div>
            </div>
            <div class="card-reveal" style="padding:10px;">
                <span class="card-title" style="font-size:18px;margin-bottom: 0px;">Description<i class="material-icons right">close</i></span>
                <p style="margin:0px;">${data.description}</p>
            </div>
        </div>
    `;

}