function addEventListenersToMainButtons() {
    let mainButtons = document.getElementsByClassName("show-main");
    for (let i = 0; i < mainButtons.length; i++) {
        let button = mainButtons[i];
        button.addEventListener("click", showMainContent);
    }
}
addEventListenersToMainButtons();

function showMainContent(evt) {
    let mainContents = document.getElementsByClassName("main-content");
    let id = evt.target.id.replace("main-", "");
    console.log(id);
    for (let i = 0; i < mainContents.length; i++) {
        mainContents[i].style.display = "none";
    }
    document.getElementById(id).style.display = "block";
    clearHeaderInstructionsAndLiveDisplay();



    console.log(evt.target.id);
    if (id==="add-skill"){
        document.getElementById("entry-skill-key").disabled=false;
        document.getElementById("entry-skill-key").value="";       
        document.getElementById("entry-skill-category").value="";
        document.getElementById("entry-skill-name").value="";
    }
}

function clearHeaderInstructionsAndLiveDisplay(){
    document.getElementById("title-header").innerHTML="";
    document.getElementById("all-instructions").style.display="none";
    document.getElementById("live-display").style.display="none";
}
//////////////////////////////////////////////////
function addEventListenersToShowNoteSpans() {
    let showNotes = document.getElementsByClassName("show-note");
    for (let i = 0; i < showNotes.length; i++) {
        let button = showNotes[i];
        button.addEventListener("click", toggleNote);
    }
}

addEventListenersToShowNoteSpans();

function toggleNote(evt) {
    let baseId = evt.target.parentElement.parentElement.parentElement.id;
    console.log(baseId);
    let id = baseId + "-notepad";
    let notepad = document.getElementById(id);
    if (notepad.style.display === "none") {
        notepad.style.display = "block";
    }
    else {
        notepad.style.display = "none";
    }
}

/////////////////////////////////////////
function addEventListenersToStars() {
    let stars = document.getElementsByClassName("star");
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.addEventListener("click", processStarClick);
    }
}

addEventListenersToStars();
function processStarClick(evt) {
    console.log(evt.target);
    //find out which star was clicked
    let stars = evt.target.parentElement.children;
    let index = 0;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i] === evt.target) {
            index = i;
        }
    }
    console.log("index", index);
    let baseId = evt.target.parentElement.parentElement.parentElement.parentElement.id;
    let hiddenInputId = baseId + "-rating";
    let rating = index + 1;
    document.getElementById(hiddenInputId).value = rating;
    changeStarDisplayBasedOnHiddenInputValue(baseId, rating);
}

function changeStarDisplayBasedOnHiddenInputValue(baseId, rating) {
    let starContainer = document.getElementById(baseId + "-star-container");
    console.log(starContainer);
    console.dir(starContainer);

    let stars = starContainer.children;
    console.log(stars);
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        if (i + 1 <= rating) {
            star.innerHTML = "★";
        }
        else {
            star.innerHTML = "☆";
        }
    }
}
////////////////////////////////
function addEventListenersToRefreshStars() {
    let refreshStarElements = document.getElementsByClassName("refresh-stars");
    for (let i = 0; i < refreshStarElements.length; i++) {
        refreshStarElements[i].addEventListener("click", refreshStars);
    }
}
function refreshStars(evt) {
    let baseId = evt.target.parentElement.parentElement.parentElement.id;
    let hiddenInputId = baseId + "-rating";
    document.getElementById(hiddenInputId).value = 0;
    changeStarDisplayBasedOnHiddenInputValue(baseId, 0);
}
addEventListenersToRefreshStars();

//////////////////////////////////
function closeAllNotepads() {
    let notepads = document.getElementsByClassName("notepad");
    for (let i = 0; i < notepads.length; i++) {
        notepads[i].style.display = "none";
    }
}


let developerMode = true;

function initializeDeveloperMode() {
    if (developerMode === false) {
        let devEls = document.getElementsByClassName("dev-mode");
        for (let i = 0; i < devEls.length; i++) {
            devEls[i].style.display = "none";
        }
    }
    else {//developer mode true
        let instructions = document.getElementsByClassName("instructions");
        console.log(instructions);
        for (let i = 0; i < instructions.length; i++) {
            instructions[i].contentEditable = true;
        }
    }
}

function addEventListenersToNestedMenus() {
    let nestedMenus = document.getElementsByClassName("nested-menu");
    for (let i = 0; i<nestedMenus.length; i++) {
        let menu = nestedMenus[i];
        menu.addEventListener("click", toggleNestedMenu)
    }
}

addEventListenersToNestedMenus();

function toggleNestedMenu(evt) {
    let siblings = evt.target.parentElement.children;
    for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] === evt.target) {
            //do nothing
        }
        else {
            if (siblings[i].style.display === "none") {
                siblings[i].style.display = "block";
            }
            else {
                siblings[i].style.display = "none";
            }

        }
    }

}

function closeAllNestedMenus() {
    let nestedMenus = document.getElementsByClassName("nested-menu");
    for (let i = 0; i < nestedMenus.length; i++) {
        let menu=nestedMenus[i];
        let siblings = menu.parentElement.children;
        for (let j = 0; j < siblings.length; j++) {
            if (siblings[j] === menu) {
                //do nothing
            }
            else {
                siblings[j].style.display = "none";
            }
        }
    }

}

closeAllNestedMenus();


function addEventListenersToEditSkillButtons(){
    let editSkillButtons=document.getElementsByClassName("edit-skill-button");
    for (let i=0;i<editSkillButtons.length;i++){
        let button=editSkillButtons[i];
        button.addEventListener("click",editSkill);
    }
}

function editSkill(evt){
    let baseId=evt.target.parentElement.parentElement.parentElement.id;
    console.log(baseId);

    document.getElementById("main-add-skill").click();

    let keyInput=document.getElementById("entry-skill-key");
    keyInput.value=baseId;
    //console.dir(keyInput);
    keyInput.disabled=true;
    // document.getElementById("entry-skill-key").disble

}

addEventListenersToEditSkillButtons();

function addEventListenersToEditSkillNameh4s(){
    let skillNameh4s=document.getElementsByClassName("skill-name-h4");
    for (let i=0;i<skillNameh4s.length;i++){
        let h4=skillNameh4s[i];
        h4.addEventListener("click",processH4Click);
    }
}

function processH4Click(evt){
    //get baseId from clicked element
    let baseId=evt.target.id.replace("-h4","");

    let instructionsId=baseId+"-instructions";
    
    //show all-instructions div
    document.getElementById("all-instructions").style.display="block";
    //close all instructions
    closeAllInstructions();

    //show just the approriate instructions
    document.getElementById(instructionsId).style.display="block";
    //put info in title header
    let str="";
    str+="for "+baseId;
    str+="<h3>category</h3>";
    str+="<h4>name</h4>";
    str+="<hr>";
    document.getElementById("title-header").innerHTML=str;
    //don't show "live-display"
    document.getElementById("live-display").style.display="none";
    

}


function closeAllInstructions(){
    let instructions=document.getElementsByClassName("instruction");
    for (let i=0;i<instructions.length;i++){
        instructions[i].style.display="none";
    }
}

addEventListenersToEditSkillNameh4s();



initializeDeveloperMode();


////////////////initializing view, closing notepads, showing startup main content
closeAllNotepads();
clearHeaderInstructionsAndLiveDisplay();
document.getElementById("main-skills").click();



