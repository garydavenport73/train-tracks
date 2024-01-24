"use strict";

function buildElementsFromDatabase() {//note database is a global object
    //console.log(database);
    let initObj = database["startupObject"];
    //console.log(initObj);
    let categories = [];//get categories   //first pass
    for (let i = 0; i < initObj.length; i++) {
        let category = initObj[i]["category"];
        if (!(categories.includes(category))) {
            categories.push(category);
        }
    }
    let str = "";
    str += "<h2>Skills  <button id='expand-collapse-skills-button'>⇅</button><button id='toggle-notes'>⇅📄</button><button class='show-main dev-mode' id='main-add-skill'>+</button></h2>";
    for (let i = 0; i < categories.length; i++) {
        str += "<div class='skill-category'>";
        str += "<h3 class='nested-menu'>" + categories[i] + "</h3>";
        for (let j = 0; j < initObj.length; j++) {
            if (initObj[j]["category"] === categories[i]) {
                //build here
                str += "<div class='skill-container' id='MYTOKEN'>";
                str += "<input type='number' class='star-rating' id='MYTOKEN-rating' value='0' step='1' min='0' max='5'>";
                str += "<div class='row space-between'>";
                str += "<h4><span class='skill-name-h4' id='MYTOKEN-h4'>" + initObj[j]["name"] + "</span></h4>";
                str += "<span class='stars-and-controls-container'>";
                str += "<span class='star-container' id='MYTOKEN-star-container'>";
                str += "<span class='star'>☆</span>";
                str += "<span class='star'>☆</span>";
                str += "<span class='star'>☆</span>";
                str += "<span class='star'>☆</span>";
                str += "<span class='star'>☆</span>";
                str += "</span>";
                str += "<span class='refresh-stars'>↺</span>";
                str += "<span class='show-note'>📄</span>";
                str += "</span>";
                str += "</div>";
                str += "<button class='dev-mode edit-skill-button'>✐</button><button class='dev-mode'>&uarr;<button class='dev-mode'>&darr;</button></button><button class='dev-mode'>X</button>";
                str += "<textarea class='notepad' id='MYTOKEN-notepad' placeholder='your notes here'></textarea>";
                str += "</div>";
                //////////////////
                str = str.replace(/MYTOKEN/g, initObj[j]["base-id"]);
            }
        }
        str += "</div>";
    }

    document.getElementById("skills").innerHTML = str;
    str = "";
    //build instructions from startup
    for (let i = 0; i < initObj.length; i++) {
        str += "<pre class='instruction' id='" + initObj[i]["base-id"] + "-instructions'>" + initObj[i]["instructions"] + "</pre>";
    }
    str += "<button class='dev-mode'>update instructions</button>";

    document.getElementById("all-instructions").innerHTML = str;
    //     <pre class="instruction" id="sk1-instructions">instructions for skill 1</pre>
    //     <pre class="instruction" id="sk2-instructions">instructions for skill 2</pre>
    //     <pre class="instruction" id="sk3-instructions">instructions for skill 3</pre>
    //     <pre class="instruction" id="sk4-instructions">instructions for skill 4</pre>
    //     <button class="dev-mode">update instructions</button>
}

function addEventListenersToMainButtons() {
    let mainButtons = document.getElementsByClassName("show-main");
    for (let i = 0; i < mainButtons.length; i++) {
        let button = mainButtons[i];
        button.addEventListener("click", showMainContent);
    }
}

function removeEventListenersToMainButtons() {
    let mainButtons = document.getElementsByClassName("show-main");
    for (let i = 0; i < mainButtons.length; i++) {
        let button = mainButtons[i];
        button.removeEventListener("click", showMainContent);
    }
}



function showMainContent(evt) {
    let mainContents = document.getElementsByClassName("main-content");
    let id = evt.target.id.replace("main-", "");
    // console.log(id);
    for (let i = 0; i < mainContents.length; i++) {
        mainContents[i].style.display = "none";
    }
    document.getElementById(id).style.display = "block";
    clearHeaderInstructionsAndLiveDisplay();



    // console.log(evt.target.id);
    if (id === "add-skill") {
        document.getElementById("entry-skill-key").disabled = false;
        document.getElementById("entry-skill-key").value = "";
        document.getElementById("entry-skill-category").value = "";
        document.getElementById("entry-skill-name").value = "";
    }
}

function clearHeaderInstructionsAndLiveDisplay() {
    document.getElementById("title-header").innerHTML = "";
    document.getElementById("all-instructions").style.display = "none";
    document.getElementById("live-display").style.display = "none";
}
//////////////////////////////////////////////////
function addEventListenersToShowNoteSpans() {
    let showNotes = document.getElementsByClassName("show-note");
    for (let i = 0; i < showNotes.length; i++) {
        let button = showNotes[i];
        button.addEventListener("click", toggleNote);
    }
}

function removeEventListenersToShowNoteSpans() {
    let showNotes = document.getElementsByClassName("show-note");
    for (let i = 0; i < showNotes.length; i++) {
        let button = showNotes[i];
        button.removeEventListener("click", toggleNote);
    }
}




function toggleNote(evt) {
    let baseId = evt.target.parentElement.parentElement.parentElement.id;
    // console.log(baseId);
    let id = baseId + "-notepad";
    let notepad = document.getElementById(id);
    if (notepad.style.display === "none") {
        notepad.style.display = "block";
    }
    else {
        notepad.style.display = "none";
    }
}

function toggleAllNotes() {
    let testNote = document.getElementsByClassName("notepad")[0];
    if (testNote.style.display === "none") {
        openAllNotePads();
    }
    else {
        closeAllNotepads();
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

function removeEventListenersToStars() {
    let stars = document.getElementsByClassName("star");
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.removeEventListener("click", processStarClick);
    }
}


function processStarClick(evt) {
    // console.log(evt.target);
    //find out which star was clicked
    let stars = evt.target.parentElement.children;
    let index = 0;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i] === evt.target) {
            index = i;
        }
    }
    // console.log("index", index);
    let baseId = evt.target.parentElement.parentElement.parentElement.parentElement.id;
    let hiddenInputId = baseId + "-rating";
    let rating = index + 1;
    document.getElementById(hiddenInputId).value = rating;
    changeStarDisplayBasedOnHiddenInputValue(baseId, rating);
}

function changeStarDisplayBasedOnHiddenInputValue(baseId, rating) {
    let starContainer = document.getElementById(baseId + "-star-container");
    // console.log(starContainer);
    console.dir(starContainer);

    let stars = starContainer.children;
    // console.log(stars);
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
function removeEventListenersToRefreshStars() {
    let refreshStarElements = document.getElementsByClassName("refresh-stars");
    for (let i = 0; i < refreshStarElements.length; i++) {
        refreshStarElements[i].removeEventListener("click", refreshStars);
    }
}

function refreshStars(evt) {
    let baseId = evt.target.parentElement.parentElement.parentElement.id;
    let hiddenInputId = baseId + "-rating";
    document.getElementById(hiddenInputId).value = 0;
    changeStarDisplayBasedOnHiddenInputValue(baseId, 0);
}



//////////////////////////////////
function closeAllNotepads() {
    let notepads = document.getElementsByClassName("notepad");
    for (let i = 0; i < notepads.length; i++) {
        notepads[i].style.display = "none";
    }
}

function openAllNotePads() {
    let notepads = document.getElementsByClassName("notepad");
    for (let i = 0; i < notepads.length; i++) {
        notepads[i].style.display = "block";
    }
}



function initializeDeveloperMode() {
    if (developerMode === false) {
        let devEls = document.getElementsByClassName("dev-mode");
        for (let i = 0; i < devEls.length; i++) {
            devEls[i].style.display = "none";
        }
    }
    else {//developer mode true
        let instructions = document.getElementsByClassName("instructions");
        // console.log(instructions);
        for (let i = 0; i < instructions.length; i++) {
            instructions[i].contentEditable = true;
        }
    }
}

function addEventListenersToNestedMenus() {
    let nestedMenus = document.getElementsByClassName("nested-menu");
    for (let i = 0; i < nestedMenus.length; i++) {
        let menu = nestedMenus[i];
        menu.addEventListener("click", toggleNestedMenu)
    }
}

function removeEventListenersToNestedMenus() {
    let nestedMenus = document.getElementsByClassName("nested-menu");
    for (let i = 0; i < nestedMenus.length; i++) {
        let menu = nestedMenus[i];
        menu.removeEventListener("click", toggleNestedMenu)
    }
}



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
        let menu = nestedMenus[i];
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
function openAllNestedMenus() {
    let nestedMenus = document.getElementsByClassName("nested-menu");
    for (let i = 0; i < nestedMenus.length; i++) {
        let menu = nestedMenus[i];
        let siblings = menu.parentElement.children;
        for (let j = 0; j < siblings.length; j++) {
            if (siblings[j] === menu) {
                //do nothing
            }
            else {
                siblings[j].style.display = "block";
            }
        }
    }
}




function addEventListenersToEditSkillButtons() {
    let editSkillButtons = document.getElementsByClassName("edit-skill-button");
    for (let i = 0; i < editSkillButtons.length; i++) {
        let button = editSkillButtons[i];
        button.addEventListener("click", editSkill);
    }
}

function removeEventListenersToEditSkillButtons() {
    let editSkillButtons = document.getElementsByClassName("edit-skill-button");
    for (let i = 0; i < editSkillButtons.length; i++) {
        let button = editSkillButtons[i];
        button.removeEventListener("click", editSkill);
    }
}

function editSkill(evt) {
    let baseId = evt.target.parentElement.id;
    //console.log(baseId);

    document.getElementById("main-add-skill").click();

    let keyInput = document.getElementById("entry-skill-key");
    keyInput.value = baseId;
    //console.dir(keyInput);
    keyInput.disabled = true;


}



function addEventListenersToEditSkillNameh4s() {
    let skillNameh4s = document.getElementsByClassName("skill-name-h4");
    for (let i = 0; i < skillNameh4s.length; i++) {
        let h4 = skillNameh4s[i];
        h4.addEventListener("click", processH4Click);
    }
}

function removeEventListenersToEditSkillNameh4s() {
    let skillNameh4s = document.getElementsByClassName("skill-name-h4");
    for (let i = 0; i < skillNameh4s.length; i++) {
        let h4 = skillNameh4s[i];
        h4.removeEventListener("click", processH4Click);
    }
}

function findRowIndex(arrOfObjects, key, value) {
    for (let i = 0; i < arrOfObjects.length; i++) {
        if (arrOfObjects[i][key] === value) {
            return i;
        }
    }
    return -1;
}

function processH4Click(evt) {
    //get baseId from clicked element
    let baseId = evt.target.id.replace("-h4", "");
    console.log(evt.target.id);
    let instructionsId = baseId + "-instructions";


    //find index of row with baseId;
    let index = findRowIndex(database["startupObject"], "base-id", baseId);

    //show all-instructions div
    document.getElementById("all-instructions").style.display = "block";
    //close all instructions
    closeAllInstructions();

    //show just the approriate instructions
    document.getElementById(instructionsId).style.display = "block";
    //put info in title header
    let str = "";
    // str += "for " + baseId;
    str += "<em>Instructions for:</em>"
    str += "<h3>" + database["startupObject"][index]["category"] + "</h3>";
    str += "<h4>" + database["startupObject"][index]["name"] + "</h4>";
    str += "<hr>";
    document.getElementById("title-header").innerHTML = str;
    //don't show "live-display"
    document.getElementById("live-display").style.display = "none";




}


function closeAllInstructions() {
    let instructions = document.getElementsByClassName("instruction");
    for (let i = 0; i < instructions.length; i++) {
        instructions[i].style.display = "none";
    }
}





function expandCollapseSkills(evt) {
    let testContainer = document.getElementsByClassName("skill-container")[0];

    if (testContainer.style.display != "none") {
        closeAllNestedMenus();
    }
    else {
        openAllNestedMenus();
    }
}





////////////////initializing view, closing notepads, showing startup main content

//////backup sequence///////////
// buildElementsFromDatabase();
// addEventListenersToMainButtons();
// addEventListenersToShowNoteSpans();
// addEventListenersToStars();
// addEventListenersToRefreshStars();
// let developerMode = true;
// addEventListenersToNestedMenus();
// closeAllNestedMenus();
// addEventListenersToEditSkillButtons();
// addEventListenersToEditSkillNameh4s();
// initializeDeveloperMode();
// closeAllNotepads();
// clearHeaderInstructionsAndLiveDisplay();
// document.getElementById("main-skills").click();
//////////////////////////////////

function addSkillToDatabase(){

        //validate inputs
        //key can't be taken
        //key can't start with number
        //check to make sure id isn't taken
    //add skill to database
    //rebuild content

    let usedKeys=[];
    for (let i=0;i<database["startupObject"].length;i++){
        let id=database["startupObject"][i]["base-id"];
        if (!(usedKeys.includes(id))){
            usedKeys.push(id);
        }
    }
    //get values from inputs
    let key=document.getElementById("entry-skill-key").value;
    let category=document.getElementById("entry-skill-category").value;
    let skillName=document.getElementById("entry-skill-name").value;

    if (usedKeys.includes(key)){ //updating
        if (!(confirm("This will update the current entry with the key "+key+"."))){
            return;
        }
        else{
            let rowIndex=findRowIndex("base-id",key);
            // let row={};
            let row=database["startupObject"][rowIndex];
            row["base-id"]=key;
            row["category"]=category;
            row["name"]=skillName;
            //row["instructions"]="";
            //database["startupObject"].push(JSON.parse(JSON.stringify(row)));
            return;
        }
    }
    else{//used key not in index
            let row={};
            //let row=database["startupObject"][index];
            row["base-id"]=key;
            row["category"]=category;
            row["name"]=skillName;
            row["instructions"]="";
            database["startupObject"].push(JSON.parse(JSON.stringify(row)));
    }


    rebuildContent();
    

}

function rebuildContent() {
    //removeEventListenersToMainButtons();
    alert("rebuilding!");
    removeEventListenersToMainButtons();
    document.getElementById("expand-collapse-skills-button").removeEventListener("click", expandCollapseSkills);
    document.getElementById("toggle-notes").removeEventListener("click", toggleAllNotes);
    removeEventListenersToShowNoteSpans();
    removeEventListenersToStars();
    removeEventListenersToRefreshStars();
    removeEventListenersToNestedMenus();
    removeEventListenersToEditSkillButtons();
    removeEventListenersToEditSkillNameh4s();
    buildElementsFromDatabase();
    addEventListenersToMainButtons();
    document.getElementById("expand-collapse-skills-button").addEventListener("click", expandCollapseSkills);
    document.getElementById("toggle-notes").addEventListener("click", toggleAllNotes);
    addEventListenersToShowNoteSpans();
    addEventListenersToStars();
    addEventListenersToRefreshStars();
    addEventListenersToNestedMenus();
    addEventListenersToEditSkillButtons();
    addEventListenersToEditSkillNameh4s();
    closeAllNestedMenus();
    closeAllNotepads();
    clearHeaderInstructionsAndLiveDisplay();
    initializeDeveloperMode();
    document.getElementById("main-skills").click();
}

buildElementsFromDatabase();
addEventListenersToMainButtons();
document.getElementById("expand-collapse-skills-button").addEventListener("click", expandCollapseSkills);
document.getElementById("toggle-notes").addEventListener("click", toggleAllNotes);
addEventListenersToShowNoteSpans();
addEventListenersToStars();
addEventListenersToRefreshStars();
addEventListenersToNestedMenus();
addEventListenersToEditSkillButtons();
addEventListenersToEditSkillNameh4s();
document.getElementById("add-skill-button").addEventListener("click",addSkillToDatabase);
closeAllNestedMenus();
closeAllNotepads();
clearHeaderInstructionsAndLiveDisplay();
let developerMode = true;
initializeDeveloperMode();
document.getElementById("main-skills").click();



