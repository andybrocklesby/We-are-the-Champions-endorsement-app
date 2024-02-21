import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js" 
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-bf40c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const postListInDB = ref(database, 'postList');

const endorsementInputElement = document.getElementById("endorsement-input-el");
const fromInputElement = document.getElementById("from-input-el");
const toInputElement = document.getElementById("to-input-el");

const publishButton = document.getElementById("publish-btn-el");

//-----------------------PUSHING DATA---------------------------

publishButton.addEventListener("click", function(){
    
    let newPost = {
        endorsement: endorsementInputElement.value,
        from: fromInputElement.value,
        to: toInputElement.value
    }

    push(postListInDB, newPost);

    appendNewEndorsement();


})

//-----------------------ONVALUE-------------------------------

onValue(postListInDB, function(snapshot){

    resetElements();

    if(snapshot.exists()){
        let postArrayInDB = Object.entries(snapshot.val());

        for(let i = 0; i < postArrayInDB.length; i++){
    
            let postID = postArrayInDB[i][0];
            let postValue = postArrayInDB[i][1];
    
            appendNewEndorsement(postValue, postID);
        }
    }
    
})

//------------------APPEND NEW ENDORSEMENT--------------------

function appendNewEndorsement(post, postID){

    let newEndorsement = document.createElement('div');
        newEndorsement.className = 'endorsement';
        newEndorsement.innerHTML = `
            <div class="endorsement-name">To: ${post.from}</div>
            <div>${post.endorsement}</div>
            <div class="endorsement-name">From: ${post.to}</div>
        `

        let parentToAppendTo = document.getElementById("endorsement-display");
        parentToAppendTo.append(newEndorsement);

        newEndorsement.addEventListener("dblclick", function(){
            removeElement(postID);
        })
}

//-----------------------REMOVE ENDORSEMENT-------------------

function removeElement(postID){
    let exactLocationInDB = ref(database, `postList/${postID}`);
    remove(exactLocationInDB);
}

//---------------------------RESET ELEMENTS--------------------

function resetElements(endorsementElement){
    let parentToAppendTo = document.getElementById("endorsement-display");
    parentToAppendTo.innerHTML = "";
}















