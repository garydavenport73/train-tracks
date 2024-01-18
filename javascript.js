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
    console.log(evt.target.id);
}
//////////////////////////////////////////////////
function addEventListenersToShowNoteSpans(){
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
function addEventListenersToStars(){
    let stars=document.getElementsByClassName("star");
    for (let i=0;i<stars.length;i++){
        let star=stars[i];
        star.addEventListener("click",processStarClick);
    }
}

addEventListenersToStars();
function processStarClick(evt){
    console.log(evt.target);
    //find out which star was clicked
    let stars=evt.target.parentElement.children;
    let index=0;
    for (let i=0;i<stars.length;i++){
        if (stars[i]===evt.target){
            index=i;
        }
    }
    console.log("index", index);
    let baseId=evt.target.parentElement.parentElement.parentElement.parentElement.id;
    let hiddenInputId= baseId+"-rating";
    let rating=index+1;
    document.getElementById(hiddenInputId).value=rating;
    changeStarDisplayBasedOnHiddenInputValue(baseId,rating);
}

function changeStarDisplayBasedOnHiddenInputValue(baseId,rating){
    let starContainer=document.getElementById(baseId+"-star-container");
    console.log(starContainer);
    console.dir(starContainer);

    let stars=starContainer.children;
    console.log(stars);
    for (let i=0;i<stars.length;i++){
        let star=stars[i];
        if (i+1<=rating){
            star.innerHTML="★";
        }
        else{
            star.innerHTML="☆";
        }
    }
}
////////////////////////////////
function addEventListenersToRefreshStars(){
    let refreshStarElements=document.getElementsByClassName("refresh-stars");
    for (let i=0;i<refreshStarElements.length;i++){
        refreshStarElements[i].addEventListener("click",refreshStars);
    }
}
function refreshStars(evt){
    let baseId=evt.target.parentElement.parentElement.parentElement.id;
    let hiddenInputId=baseId+"-rating";
    document.getElementById(hiddenInputId).value=0;
    changeStarDisplayBasedOnHiddenInputValue(baseId,0);
}
addEventListenersToRefreshStars();

//////////////////////////////////
function closeAllNotepads(){
   let notepads= document.getElementsByClassName("notepad");
   for (let i=0;i<notepads.length;i++){
    notepads[i].style.display="none";
   }
}


////////////////initializing view, closing notepads, showing startup main content
closeAllNotepads();
document.getElementById("main-skills").click();

