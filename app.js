import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-bf40c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const postListInDB = ref(database, "postList");

const fromEl = document.getElementById("from-input-el");
const toEl = document.getElementById("to-input-el");
const endorsementEl = document.getElementById("endorsement-input-el");
const publishBtn = document.getElementById("submit-btn-el");

const locationToAppend = document.getElementById("endorsement-display");

publishBtn.addEventListener("click", function(){
    clearList();
    let post = {
        sender: fromEl.value,
        recipient: toEl.value,
        endorsement: endorsementEl.value
    }
    
    push(postListInDB, post);
})

onValue(postListInDB, function(snapshot){
    clearList();
    let postArray = Object.entries(snapshot.val());
    
    for(let i = 0; i < postArray.length; i++){
        let postID = postArray[i][0];
        let postObject = postArray[i][1];
        console.log(postID);
        console.log(postObject);
        
        let newEndorsement = document.createElement("div");
        newEndorsement.className = "endorsement";
        newEndorsement.innerHTML = `
            <div class="endorsement-name">From: ${postObject.sender}</div>    
            <div class="endorsement-content">${postObject.endorsement}</div>    
            <div class="endorsement-name">To: ${postObject.recipient}</div>    
        `
        let locationToAppend = document.getElementById("endorsement-display");
        locationToAppend.append(newEndorsement);
        
        newEndorsement.addEventListener("dblclick", function(){
            let exactLocationInDB = ref(database, `postList/${postID}`);
            remove(exactLocationInDB);
        })
    }
})

function clearList(){
    locationToAppend.innerHTML = "";
}

// I have tried adding the like button feature for over 12 hours to the point of getting frustrated with myself. 
//I have tried looking online but it's telling me to use real world features such as transactions and what not. 
//I wanted to apply what we have already learned. I could have used localStorage, however I wanted to use the
// firebase database to save and update. I just could not figure it out. This scrim review I don't really want
// it to focus on my overall layout. I frankly just need help with the like button feature and how I should have implemented it. 
//Once I figure that out, I'll refactor everything else and deploy it to Netlify. :)













