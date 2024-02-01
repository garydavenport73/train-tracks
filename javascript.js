"use strict";


document.getElementById("show-log").addEventListener("click",showLogSummary);

function showLogSummary(){

    let str="";

    str+="<h3>Teaching Sessions Log</h3>";
    str+="<h4>For all dates.</h4>";
    //fill in header
    document.getElementById("title-header").innerHTML=str;
    //go through each
    str="";//reset string
    let entries=database["entries"];
    for (let i=0;i<entries.length;i++){
        let changes=findLastChanges(i);
        str+=buildChangeReport(changes,entries[i]["date"],true);
    }

    document.getElementById("live-display").innerHTML=str;
    //set innerhtml

    document.getElementById("live-display").style.display="block";
    //show display
}
function buildLogReport(changesObject, timestamp, showDateHeading=false) {
        let str = "";
        //let selectEl = document.getElementById("dates-select");
        let dateString = (new Date(timestamp)).toLocaleString();
        //place date
        let br = "<br>";
        str+="<hr>"
        if (showDateHeading===true){
            str += dateString + br + "<hr>";

        }



    }


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
        str += "<span><span class='move-category-up dev-mode' id='up-" + categories[i] + "'>&uarr;</span><span class='move-category-down dev-mode' id='down-" + categories[i] + "'>&darr;</span></span>";
        for (let j = 0; j < initObj.length; j++) {
            if (initObj[j]["category"] === categories[i]) {
                //build here
                str += "<div class='skill-container' id='MYTOKEN'>";
                str += "<input type='number' class='star-rating' id='MYTOKEN-rating' step='1' min='0' max='5'>";
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
                str += "<button class='dev-mode edit-skill-button'>✐</button><button class='dev-mode skill-up' id='skill-up-MYTOKEN'>&uarr;<button class='dev-mode skill-down' id='skill-down-MYTOKEN'>&darr;</button></button><button class='dev-mode skill-delete' id='skill-delete-MYTOKEN'>X</button>";
                // str += "<textarea class='notepad' id='MYTOKEN-notepad' placeholder='your notes here'></textarea>";
                str += "<textarea class='notepad' id='MYTOKEN-notepad'></textarea>";
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
    str += "<button class='dev-mode' id='update-instructions-button'>update instructions</button>";
    document.getElementById("all-instructions").innerHTML = str;
}

function addEventListenersToMoveCategoryUp() {
    let arrows = document.getElementsByClassName("move-category-up");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener("click", moveCategoryUp);
    }
}

function removeEventListenersToMoveCategoryUp() {
    let arrows = document.getElementsByClassName("move-category-up");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].removeEventListener("click", moveCategoryUp);
    }
}

function moveCategoryUp(evt) {
    let category = evt.target.id.replace("up-", "");
    //make ordered array of categories and find indexes;
    let arr = [];
    let rows = database["startupObject"];
    let newStartupObject = [];
    for (let i = 0; i < rows.length; i++) {
        if (!(arr.includes(rows[i]["category"]))) {
            arr.push(rows[i]["category"]);
        }
    }
    //console.log(arr);

    let index = arr.indexOf(category);
    //console.log(index);

    if (index <= 0) {//already the lowest value, do nothing
        return;
    }

    else {
        //we have array of best order
        //switch array elements
        //console.log(arr)
        arr[index] = arr[index - 1];
        arr[index - 1] = category;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (rows[j]["category"] === arr[i]) {
                    newStartupObject.push(JSON.parse(JSON.stringify(rows[j])));
                }
            }
        }

        database["startupObject"] = newStartupObject;
        rebuildContent();
    }
}

function addEventListenersToMoveCategoryDown() {
    let arrows = document.getElementsByClassName("move-category-down");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener("click", moveCategoryDown);
    }
}

function removeEventListenersToMoveCategoryDown() {
    let arrows = document.getElementsByClassName("move-category-down");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].removeEventListener("click", moveCategoryDown);
    }
}

function moveCategoryDown(evt) {
    let category = evt.target.id.replace("down-", "");
    //make ordered array of categories and find indexes;

    let arr = [];
    let rows = database["startupObject"];
    let newStartupObject = [];
    for (let i = 0; i < rows.length; i++) {
        if (!(arr.includes(rows[i]["category"]))) {
            arr.push(rows[i]["category"]);
        }
    }
    //console.log(arr);

    let index = arr.indexOf(category);
    //console.log(index);

    if (index >= arr.length - 1) {//already the highest value, do nothing
        return;
    }

    else {
        //we have array of best order
        //switch array elements
        //console.log(arr)
        arr[index] = arr[index + 1];
        arr[index + 1] = category;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (rows[j]["category"] === arr[i]) {
                    newStartupObject.push(JSON.parse(JSON.stringify(rows[j])));
                }
            }
        }

        database["startupObject"] = newStartupObject;
        rebuildContent();
    }
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

    if (id === "add-skill") {
        document.getElementById("entry-skill-key").disabled = false;
        document.getElementById("entry-skill-key").value = "";
        document.getElementById("entry-skill-category").value = "";
        document.getElementById("entry-skill-name").value = "";
    }
    showUsedKeys();
}

function showUsedKeys() {
    let usedKeys = [];
    for (let i = 0; i < database["startupObject"].length; i++) {
        let id = database["startupObject"][i]["base-id"];
        if (!(usedKeys.includes(id))) {
            usedKeys.push(id);
        }
    }
    document.getElementById("used-keys").innerHTML = "<hr>Used keys:<br>" + usedKeys.toString().replace(/\,/g, ", ") + "<hr>";
}

function clearHeaderInstructionsAndLiveDisplay() {
    document.getElementById("title-header").innerHTML = "";
    document.getElementById("all-instructions").style.display = "none";
    document.getElementById("live-display").style.display = "none";
}

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
    let testNotes = document.getElementsByClassName("notepad");
    if (testNotes.length > 0) {
        if (testNotes[0].style.display === "none") {
            openAllNotePads();
        }
        else {
            closeAllNotepads();
        }
    }
}

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
    //find out which star was clicked
    let stars = evt.target.parentElement.children;
    let index = 0;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i] === evt.target) {
            index = i;
        }
    }
    let baseId = evt.target.parentElement.parentElement.parentElement.parentElement.id;
    console.log(baseId);
    let hiddenInputId = baseId + "-rating";
    let rating = index + 1;
    console.log(hiddenInputId);
    document.getElementById(hiddenInputId).value = rating;
    console.log(document.getElementById(hiddenInputId).value);
    changeStarDisplayBasedOnHiddenInputValue(baseId, rating);
}

function changeStarDisplayBasedOnHiddenInputValue(baseId, rating) {
    let starContainer = document.getElementById(baseId + "-star-container");
    // console.dir(starContainer);
    let stars = starContainer.children;
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
        let instructions = document.getElementsByClassName("instruction");
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
    let index = findRowIndex(database["startupObject"], "base-id", baseId);
    // console.log(index);
    document.getElementById("main-add-skill").click();

    let keyInput = document.getElementById("entry-skill-key");
    keyInput.value = baseId;
    keyInput.disabled = true;
    //console.log(database["startupObject"][index]["category"]);
    //console.log(database["startupObject"][index]["name"]);
    document.getElementById("entry-skill-category").value = database["startupObject"][index]["category"];
    document.getElementById("entry-skill-name").value = database["startupObject"][index]["name"];
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

function addEventListenerToSkillUpArrows() {
    let upArrows = document.getElementsByClassName("skill-up");
    for (let i = 0; i < upArrows.length; i++) {
        upArrows[i].addEventListener("click", moveSkillUp);
    }
}

function removeEventListenerToSkillUpArrows() {
    let upArrows = document.getElementsByClassName("skill-up");
    for (let i = 0; i < upArrows.length; i++) {
        upArrows[i].removeEventListener("click", moveSkillUp);
    }
}

function moveSkillUp(evt) {
    let baseId = evt.target.id.replace("skill-up-", "");
    //find the category
    let rows = database["startupObject"];
    let index = findRowIndex(rows, "base-id", baseId);
    let category = rows[index]["category"];

    //find all the skills under the same category
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
        if (rows[i]["category"] === category) {
            arr.push(i);
        }
    }
    //if index is in position 0, then do nothing
    if (index === arr[0]) {
        return;
    }
    else {
        //find which index matches the array
        let arrIndex = arr.indexOf(index);
        let lowIndex = arr[arrIndex - 1];
        //switch rows
        let rowMoveLow = JSON.parse(JSON.stringify(rows[index]));
        let rowMoveUp = JSON.parse(JSON.stringify(rows[lowIndex]));
        rows[index] = rowMoveUp;
        rows[lowIndex] = rowMoveLow;
        rebuildContent();
    }
}

function addEventListenerToSkillDeleteButtons() {
    let deleteButtons = document.getElementsByClassName("skill-delete");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteSkill);
    }
}

function removeEventListenerToSkillDeleteButtons() {
    let deleteButtons = document.getElementsByClassName("skill-delete");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].removeEventListener("click", deleteSkill);
    }
}

function deleteSkill(evt) {
    if (confirm("Are you sure you want to delete the skill and associated instructions?")) {
        let baseId = evt.target.id.replace("skill-delete-", "");
        let index = findRowIndex(database["startupObject"], "base-id", baseId);
        database["startupObject"].splice(index, 1);
        rebuildContent();
    }
}

function addEventListenerToSkillDownArrows() {
    let downArrows = document.getElementsByClassName("skill-down");
    for (let i = 0; i < downArrows.length; i++) {
        downArrows[i].addEventListener("click", moveSkillDown);
    }
}

function removeEventListenerToSkillDownArrows() {
    let downArrows = document.getElementsByClassName("skill-down");
    for (let i = 0; i < downArrows.length; i++) {
        downArrows[i].removeEventListener("click", moveSkillDown);
    }
}

function moveSkillDown(evt) {
    let baseId = evt.target.id.replace("skill-down-", "");
    //find the category
    let rows = database["startupObject"];
    let index = findRowIndex(rows, "base-id", baseId);
    let category = rows[index]["category"];

    //find all the skills under the same category
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
        if (rows[i]["category"] === category) {
            arr.push(i);
        }
    }
    //if index is in position at end, then do nothing
    if (index === arr[arr.length - 1]) {
        return;
    }
    else {
        //find which index matches the array
        let arrIndex = arr.indexOf(index);
        let highIndex = arr[arrIndex + 1];
        //switch rows
        let rowMoveHigh = JSON.parse(JSON.stringify(rows[index]));
        let rowMoveDown = JSON.parse(JSON.stringify(rows[highIndex]));
        rows[index] = rowMoveDown;
        rows[highIndex] = rowMoveHigh;
        rebuildContent();
    }
}

function addEventListenerToUpdateInstructionsButton() {
    document.getElementById("update-instructions-button").addEventListener("click", updateInstructions);
}
function removeEventListenerToUpdateInstructionsButton() {
    document.getElementById("update-instructions-button").removeEventListener("click", updateInstructions);
}
function updateInstructions() {
    let rows = database["startupObject"];
    for (let i = 0; i < rows.length; i++) {
        let baseId = rows[i]["base-id"];
        let instructionPreId = baseId + "-instructions";
        let content = document.getElementById(instructionPreId).innerText;
        rows[i]["instructions"] = content;
    }
    rebuildContent();
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
    //console.log(evt.target.id);
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
    // str += "<em>Instructions for:</em>";
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
    let testContainers = document.getElementsByClassName("skill-container");
    if (testContainers.length > 0) {
        if (testContainers[0].style.display != "none") {
            closeAllNestedMenus();
        }
        else {
            openAllNestedMenus();
        }
    }
}

function addSkillToDatabase() {
    //validate inputs
    //key can't be taken
    //key can't start with number //not done yet
    //add skill to database
    //rebuild content
    let usedKeys = [];
    for (let i = 0; i < database["startupObject"].length; i++) {
        let id = database["startupObject"][i]["base-id"];
        if (!(usedKeys.includes(id))) {
            usedKeys.push(id);
        }
    }
    //get values from inputs
    let key = document.getElementById("entry-skill-key").value;
    let category = document.getElementById("entry-skill-category").value;
    let skillName = document.getElementById("entry-skill-name").value;

    if (usedKeys.includes(key)) { //updating
        if (!(confirm("This will update the current entry with the key " + key + "."))) {
            return;
        }
        else {
            let rowIndex = findRowIndex(database["startupObject"], "base-id", key);
            // let row={};
            let row = database["startupObject"][rowIndex];
            row["base-id"] = key; ""
            row["category"] = category;
            row["name"] = skillName;
            rebuildContent();
            return;
        }
    }
    else {//used key not in index
        let row = {};
        //let row=database["startupObject"][index];
        row["base-id"] = key;
        row["category"] = category;
        row["name"] = skillName;
        row["instructions"] = "";
        database["startupObject"].push(JSON.parse(JSON.stringify(row)));
    }
    rebuildContent();
}



function saveData() {
    addCurrentEntryData();
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    //get time of last entry
    let date = database["entries"][database["entries"].length - 1]["date"];


    buildSessionEntriesSelect();
    //remove event listener from select object
    //build select object
    //add event listener to select object



    saveStringToTextFile(JSON.stringify(database), firstName + lastName + date, ".json");
}

document.getElementById("load-button").addEventListener("click", loadData);

function loadData() {

    let fileContents = "";
    let inputTypeIsFile = document.createElement('input');
    inputTypeIsFile.type = "file";
    inputTypeIsFile.accept = ".json";
    inputTypeIsFile.addEventListener("change", function () {
        let inputFile = inputTypeIsFile.files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            fileContents = fileLoadedEvent.target.result;
            //console.log(fileContents);
            database = JSON.parse(fileContents);
            rebuildContent();
            fillInDataFromLastEntry();
            buildSessionEntriesSelect();
        };
        fileReader.readAsText(inputFile, "UTF-8");
    });
    inputTypeIsFile.click();
}


function orderTheEntries() {
    //
}

function showEntrySummary() {


    let selectEl = document.getElementById("sessions-select");
    let timestamp = selectEl.options[selectEl.selectedIndex].value;
    let timeText=selectEl.options[selectEl.selectedIndex].innerText;
    //console.log("this is the date selected " + timestamp);

    let entries = database["entries"];
    //console.log(entries);

    //find entry that matches select value
    let arrIndex = -1;
    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if (entry["date"] === Number(timestamp)) {
            //console.log("found" + timestamp.toString());
            arrIndex = i;
        }
    }

    //build a changes object
    let changesObject = findLastChanges(arrIndex);
    let contents = buildChangeReport(changesObject, entries[arrIndex]["date"]);

    document.getElementById("title-header").innerHTML = "<h3>Teaching Session Summary</h3><h4>Date: "+timeText+"</h4>";



    document.getElementById("live-display").innerHTML=contents;
    document.getElementById("live-display").style.display="block";

//     <div id="all-instructions">
//     <pre class="instruction" id="sk1-instructions">instructions for skill 1</pre>
//     <pre class="instruction" id="sk2-instructions">instructions for skill 2</pre>
//     <pre class="instruction" id="sk3-instructions">instructions for skill 3</pre>
//     <pre class="instruction" id="sk4-instructions">instructions for skill 4</pre>
//     <button class="dev-mode" id="update-instructions-button">update instructions</button>
// </div>
// <div id="live-display">

    // let selectEl = document.getElementById("dates-select");
    // let date = selectEl.options[selectEl.selectedIndex].value;
    // console.log("this is the date selected " + date);

    // let entries = database["entries"];
    // console.log(entries);
    // let arrIndex = -1;
    // for (let i = 0; i < entries.length; i++) {
    //     let entry = entries[i];
    //     if (entry["timestamp"] === Number(date)) {
    //         console.log("found" + date.toString());
    //         arrIndex = i;
    //     }
    // }
    // console.log("found", entries[arrIndex]);
    // //document.getElementById("aside-content").innerHTML = entries[arrIndex]["comments-text-area"];
    // let changesObject = findLastChanges(arrIndex);
    // let contents = buildChangeReport(changesObject, entries[arrIndex]["timestamp"]);
    // //contents=JSON.stringify(changesObject);
    // document.getElementById("aside-content-top").innerHTML = "Changes saved this date<hr>";

    // document.getElementById("aside-content-middle").innerHTML = contents;
    // closeAllInstructionPres();
}

function buildChangeReport(changesObject, timestamp, showDateHeading=false) {
    let str = "";
    //let selectEl = document.getElementById("dates-select");
    let dateString = (new Date(timestamp)).toLocaleString();
    //place date
    let br = "<br>";
    str+="<hr>"
    if (showDateHeading===true){
        str += dateString + br + "<hr>";
    }
    //go through each key,         
    //let keys = [];
    for (let i = 0; i < database["startupObject"].length; i++) {
        let baseId = database["startupObject"][i]["base-id"];
        let name = database["startupObject"][i]["name"];
        if (changesObject[baseId + "-rating"] === undefined) {
            changesObject[baseId + "-rating"] = "";
        }
        if (changesObject[baseId + "-notes"] === undefined) {
            changesObject[baseId + "-notes"] = "";
        }
        let rating = changesObject[baseId + "-rating"];
        let notes = changesObject[baseId + "-notes"];
        if ((notes !== "") || (rating != "")) {
            str += "<p>"
            str += name.toUpperCase() + br;
            if (rating !== "") {
                str += "Rating: " + rating + br;
            }
            if (notes !== "") {
                str += "Notes: " + br + notes + br;
            }
            str += "</p>";
        }
    }
    if (changesObject["general-notes"] === undefined) {
        changesObject["general-notes"] = "";
    }
    if (changesObject["appt-date"] === undefined) {
        changesObject["appt-date"] = "";
    }
    if (changesObject["appt-start-time"] === undefined) {
        changesObject["appt-start-time"] = "";
    }
    if (changesObject["appt-end-time"] === undefined) {
        changesObject["appt-end-time"] = "";
    }
    if (changesObject["general-notes"].trim() !== "") {
        str += "<p>GENERAL COMMENTS" + br;
        str += changesObject["general-notes"] + br + "</p>";
    }
    // if (changesObject["appt-date"].trim() !== "") {
    //     str += "<p>APPOINTMENT DATE" + br;
    //     str += changesObject["appt-date"] + br;
    //     if (changesObject["appt-start-time"].trim() !== "") {
    //         str += "Start Time: " + changesObject["appt-start-time"] + br + "</p>";
    //     }
    //     if (changesObject["appt-end-time"].trim() !== "") {
    //         str += "End Time: " + changesObject["appt-end-time"] + br + "</p>";
    //     }
    // }


    if (changesObject["appt-start-timestamp"] === undefined) {
        changesObject["appt-start-timestamp"] = "";
    }
    if (changesObject["appt-end-timestamp"] === undefined) {
        changesObject["appt-end-timestamp"] = "";
    }


    if ((changesObject["appt-start-timestamp"] !== null)&&(changesObject["appt-start-timestamp"] !== null)){
        str += "<p>APPOINTMENT DATE" + br;
        // str += changesObject["appt-start-timestamp"] + br;
        if (changesObject["appt-start-timestamp"]!==null) {
            str += "Start: " + new Date(changesObject["appt-start-timestamp"]).toLocaleString() + br + "</p>";
        }
        if (changesObject["appt-end-timestamp"]!==null) {
            str += "End: " + new Date(changesObject["appt-end-timestamp"]).toLocaleString() + br + "</p>";
        }
    }

    //console.log(changesObject);
    return str;
}

function findLastChanges(arrIndex) {
    let entryChange = {};
    let newEntry = database["entries"][arrIndex];
    if (arrIndex === 0) {
        return newEntry;
    }
    let lastEntry = database["entries"][arrIndex - 1];


    let keys = Object.keys(newEntry);
    //console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        //handle if last entry has key
        //console.log(lastEntry[keys[i]]===null);
        //console.log(lastEntry[keys[i]]);




        //handle if last entry does not have key
        if (newEntry[keys[i]] !== lastEntry[keys[i]]) {
            entryChange[keys[i]] = newEntry[keys[i]];
        }
    }
    //console.log("entry change", entryChange);
    return entryChange;
}


function buildSessionEntriesSelect() {

    //remove event listener

    document.getElementById("sessions-select").removeEventListener("input", showEntrySummary);

    let entries = database["entries"];
    orderTheEntries();

    //build the select with options
    let str = "";
    for (let i = 0; i < entries.length; i++) {
        let timestamp = entries[i]["date"];
        //console.log("TIMESTAMP", timestamp);
        let tempDateString = new Date(timestamp).toLocaleString();
        str += "<option value=" + "'" + timestamp + "'>" + tempDateString + "</option>";
    }
    document.getElementById("sessions-select").innerHTML = str;
    //console.log(str);

    document.getElementById("sessions-select").selectedIndex = -1;

    //add event listener
    document.getElementById("sessions-select").addEventListener("input", showEntrySummary);
}

//////////////////////////////////////////////////
document.getElementById("sessions-select").addEventListener("input", showEntrySummary);
//////////////////////////////////////////////////

function fillInDataFromLastEntry() {
    //find last entry
    let lastEntryIndex = database["entries"].length - 1;
    let lastEntry = database["entries"][lastEntryIndex];
    document.getElementById("first-name").value = lastEntry["first-name"];
    document.getElementById("last-name").value = lastEntry["last-name"];
    document.getElementById("general-notes").value=lastEntry["general-notes"];
    document.getElementById("general-notes").value=lastEntry["general-notes"];

    //get start timestamp and end time stamp and fill in apptointment values

    //don't fill in timestamps from last entry to appintment dates




    //loop through startupObject ids and look for values from last entry
    let startUpRows = database["startupObject"];


    console.log(lastEntry);

    for (let i = 0; i < startUpRows.length; i++) {
        let baseId = startUpRows[i]["base-id"];
        document.getElementById(baseId + "-rating").value = lastEntry[baseId + "-rating"];
        document.getElementById(baseId + "-notepad").value = lastEntry[baseId + "-notepad"];
        let rating = lastEntry[baseId + "-rating"];
        changeStarDisplayBasedOnHiddenInputValue(baseId, rating);
    }

    

    // for (let i=0;i<rows.length;i++){
    //     let baseId=rows[i]["base-id"];
    //     let ratingId=baseId+"-rating";
    //     let notepadId=baseId+"-notepad";
    //     entryRow[ratingId]=document.getElementById(ratingId).value;
    //     entryRow[notepadId]=document.getElementById(notepadId).value;
    // }










}

function addCurrentEntryData() {
    // entries
    // first-name
    // last-name
    // of-rating
    // of-notepad
    // instructions -> to startupObject
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let notes = document.getElementById("general-notes").value;
    let apptDate = document.getElementById("appt-date").value;
    let apptStartTime = document.getElementById("appt-start-time").value;
    let apptEndTime = document.getElementById("appt-end-time").value;

    //convert start date and end date to timestamps
    //store start timestamp and end timestamp in database

    let startTimestamp = getTimeStampFromHTMLDateAndTimeInputs(apptDate, apptStartTime);
    let endTimestamp=getTimeStampFromHTMLDateAndTimeInputs(apptDate, apptEndTime);

    let nowDate = Date.now();
    let rows = database["startupObject"];
    let entryRow = {};
    entryRow["date"] = nowDate;
    entryRow["first-name"] = firstName;
    entryRow["last-name"] = lastName;
    entryRow["general-notes"] = notes;
    entryRow["appt-start-timestamp"]=startTimestamp;
    entryRow["appt-end-timestamp"]=endTimestamp;

    for (let i = 0; i < rows.length; i++) {
        let baseId = rows[i]["base-id"];
        let ratingId = baseId + "-rating";
        let notepadId = baseId + "-notepad";
        entryRow[ratingId] = document.getElementById(ratingId).value;
        entryRow[notepadId] = document.getElementById(notepadId).value;
    }
    database["entries"].push(JSON.parse(JSON.stringify(entryRow)));
}

function getTimeStampFromHTMLDateAndTimeInputs(htmlDate, htmlTime) {
    let year = Number(htmlDate.split("-")[0]);
    let month = Number(htmlDate.split("-")[1] - 1);
    let day = Number(htmlDate.split("-")[2]);
    let hours = Number(htmlTime.split(":")[0]);
    let minutes = Number(htmlTime.split(":")[1]);
    let d = new Date(year, month, day, hours, minutes);
    let timestamp = d.getTime();
    return timestamp;
}

document.getElementById("schedule-appt-button").addEventListener("click",scheduleAppointment);

function scheduleAppointment() {
    let htmlStartDate = document.getElementById("appt-date").value;
    let htmlStartTime = document.getElementById("appt-start-time").value;
    //console.log(htmlStartDate);
    let htmlEndDate = htmlStartDate;
    let htmlEndTime = document.getElementById("appt-end-time").value;
    if ((htmlStartDate === undefined) || (htmlStartDate === "")) {
        alert("Please enter a start date");
        return;
    }
    if ((htmlStartTime === undefined) || (htmlStartTime == "")) {
        alert("Please enter a start time");
        return;
    }
    if ((htmlEndTime === undefined) || (htmlEndTime === "")) {
        htmlEndTime = htmlStartTime;
    }

    let summary = "Training Session";
    let description = "Ongoing EHR training";

    let ICSEvent = makeICSEvent(htmlStartDate, htmlStartTime, htmlEndDate, htmlEndTime, summary, description);
    document.getElementById("title-header").innerHTML = "Date ICS file contents<hr>";
    document.getElementById("live-display").innerHTML = "<pre>" + ICSEvent + "</pre>";
    document.getElementById("live-display").style.display="block";
    //closeAllInstructionPres();

    let firstName = document.getElementById("first-name").value.trim();
    let lastName = document.getElementById("last-name").value.trim();

    let baseName = firstName + lastName + "EHRTraining" + htmlStartDate;
    //baseName = baseName.trim().replace(" ", "-");

    saveStringToTextFile(ICSEvent, baseName, ".ics");
}



function makeICSEvent(htmlStartDate, htmlStartTime, htmlEndDate, htmlEndTime, summary, description, lineTerminator = "\n") {
    let str = "";
    let nowDate = new Date();
    let nowString = nowDate.toISOString();
    nowString = nowString.replace(/\.\d\d\dZ/, "Z").replace(/\-|\:|\./g, "");
    let lt = lineTerminator;
    str += "BEGIN:VCALENDAR" + lt;
    str += "VERSION:2.0" + lt;
    str += "PRODID:trainingtracker" + lt;
    str += "CALSCALE:GREGORIAN" + lt;
    str += "BEGIN:VEVENT" + lt;
    str += "SUMMARY:" + summary.trim() + lt;
    str += "DTSTART:" + htmlDateAndTimeToICString(htmlStartDate, htmlStartTime).trim() + lt;
    str += "DTEND:" + htmlDateAndTimeToICString(htmlEndDate, htmlEndTime).trim() + lt;
    str += "DESCRIPTION:" + description.trim() + lt;
    str += "DTSTAMP:" + nowString.trim() + lt;
    //str += "UID:" + makeUID(htmlStartDate, htmlStartTime) + lt;
    str += "UID:training."+htmlDateAndTimeToICString(htmlStartDate,htmlStartTime)+Math.random().toString()+lt;
    str += "END:VEVENT" + lt;
    str += "END:VCALENDAR";
    return str;
}

// function makeUID(startDate, startTime) {
//     let UID="training."+htmlDateAndTimeToICString(startDate,startTime)+Math.random().toString();
//     return UID;
// }

function htmlDateAndTimeToICString(date, time) {
    if ((time === "") || (time === undefined)) {
        time = "00:00";
    }
    let year = parseInt(date.slice(0, 4));
    let month = parseInt(date.slice(5, 7)) - 1;
    let day = parseInt(date.slice(8));
    let hour = parseInt(time.slice(0, 2));
    let min = parseInt(time.slice(3));
    let d = new Date(year, month, day, hour, min);
    let thisDateISO=d.toISOString();
    // 2023-06-11T14:05:25.003Z----->20230611T140525Z
    let icsString = thisDateISO.replace(/\.\d\d\dZ/, "Z").replace(/\-|\:|\./g, "");
    return icsString;
}

// function htmlDateAndTimeToISOString(date = "2023-01-31", time) {
//     if ((time === "") || (time === undefined)) {
//         time = "00:00";
//     }
//     let year = parseInt(date.slice(0, 4));
//     let month = parseInt(date.slice(5, 7)) - 1;
//     let day = parseInt(date.slice(8));
//     let hour = parseInt(time.slice(0, 2));
//     let min = parseInt(time.slice(3));
//     let d = new Date(year, month, day, hour, min);
//     console.log("html date and time to iso string here !!!!", d.toISOString());
//     return (d.toISOString());
// }

// function ISOStringToICSStringZulu(ISOString) {
//     // 2023-06-11T14:05:25.003Z----->20230611T140525Z
//     let ICString = ISOString.replace(/\.\d\d\dZ/, "Z").replace(/\-|\:|\./g, "");
//     return ICString;
// }


function saveStringToTextFile(str1, basename = "myfile", fileType = ".txt", mimeType = "text/plain") {
    let filename = basename + fileType;
    let blobVersionOfText = new Blob([str1], {
        type: mimeType,
    });
    let urlToBlob = window.URL.createObjectURL(blobVersionOfText);
    let downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.download = filename;
    downloadLink.href = urlToBlob;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.parentElement.removeChild(downloadLink);
}

function askConfirm() {
    return "Don't forge to save your data!\nAre you sure you want to close?";
}

document.getElementsByTagName("h1")[0].addEventListener("click",showLicense);
function showLicense(){
let str="This program helps track trainees.\n\n"+
"Copyright (C) 2024 Gary Davenport"+
"\n\n"+
"This library is free software; you can redistribute it and/or "+
"modify it under the terms of the GNU Library General Public "+
"License as published by the Free Software Foundation; either "+
"version 2 of the License, or (at your option) any later version."+
"\n\n"+
"This library is distributed in the hope that it will be useful, "+
"but WITHOUT ANY WARRANTY; without even the implied warranty of "+
"MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU "+
"Library General Public License for more details."+
"\n\n"+
"You should have received a copy of the GNU Library General Public "+
"License along with this library; if not, write to the"+
"\n\n"+
"Free Software Foundation, Inc., \n51 Franklin St, Fifth Floor, \n"+
"Boston, MA  02110-1301, USA."+
"\n\n"+
"Also add information on how to contact you by electronic and paper mail."+
"\n\n"+
"You should also get your employer (if you work as a programmer) or your school, "+
"if any, to sign a \"copyright disclaimer\" for the library, if necessary.\n"+
"\n"+
"Signed: Gary Davenport, 1/31/2024";
alert(str);
}


function rebuildContent() {
    removeEventListenersToMainButtons();
    document.getElementById("expand-collapse-skills-button").removeEventListener("click", expandCollapseSkills);
    document.getElementById("toggle-notes").removeEventListener("click", toggleAllNotes);
    removeEventListenersToShowNoteSpans();
    removeEventListenersToStars();
    removeEventListenersToRefreshStars();
    removeEventListenersToNestedMenus();
    removeEventListenersToEditSkillButtons();
    removeEventListenersToEditSkillNameh4s();
    removeEventListenersToMoveCategoryUp();
    removeEventListenersToMoveCategoryDown();
    removeEventListenerToSkillUpArrows();
    removeEventListenerToSkillDownArrows();
    removeEventListenerToSkillDeleteButtons();
    removeEventListenerToUpdateInstructionsButton();
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
    addEventListenersToMoveCategoryUp();
    addEventListenersToMoveCategoryDown();
    addEventListenerToSkillUpArrows();
    addEventListenerToSkillDownArrows();
    addEventListenerToSkillDeleteButtons();
    addEventListenerToUpdateInstructionsButton();
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
addEventListenersToMoveCategoryUp();
addEventListenersToMoveCategoryDown();
addEventListenerToSkillUpArrows();
addEventListenerToSkillDownArrows();
addEventListenerToSkillDeleteButtons();
addEventListenerToUpdateInstructionsButton();
document.getElementById("add-skill-button").addEventListener("click", addSkillToDatabase);
document.getElementById("save-button").addEventListener("click", saveData);
closeAllNestedMenus();
closeAllNotepads();
clearHeaderInstructionsAndLiveDisplay();
let developerMode = false;
initializeDeveloperMode();
document.getElementById("first-name").value="";
document.getElementById("last-name").value="";
document.getElementById("general-notes").value="";
document.getElementById("appt-date").value="";
document.getElementById("appt-start-time").value="";
document.getElementById("appt-end-time").value="";
document.getElementById("main-skills").click();
window.onbeforeunload = askConfirm;
