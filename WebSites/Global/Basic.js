function InsertPTAG(TheString){
    const PTAGElements = document.querySelectorAll('.PTAG');
    const RandomIndex = Math.floor(Math.random() * PTAGElements.length);

    if(PTAGElements[RandomIndex]){
        PTAGElements[RandomIndex].textContent = TheString;
    }
}

function InsertCPTAG(){
    const Elements = document.querySelectorAll('.CPTAG');

    // for(i = 0; i < Elements.length; i++){
    //     Elements[i].classList.add('TagHoverShow');
    //     Elements[i].setAttribute('onClick', 'CPTagClick();');
    // }

    const RandomIndex = Math.floor(Math.random() * Elements.length);

    if(Elements[RandomIndex]){
        Elements[RandomIndex].classList.add('TagHoverShow');
        Elements[RandomIndex].setAttribute('onClick', 'CPTagClick();');
    }
}

function InsertCFTAG(){
    const Elements = document.querySelectorAll('.CFTAG');

    // for(i = 0; i < Elements.length; i++){
    //     Elements[i].classList.add('TagHoverShow');
    //     Elements[i].setAttribute('onClick', 'CFTagClick();');
    // }

    const RandomIndex = Math.floor(Math.random() * Elements.length);

    if(Elements[RandomIndex]){
        Elements[RandomIndex].classList.add('TagHoverShow');
        Elements[RandomIndex].setAttribute('onClick', 'CFTagClick();');
    }
}

function LinkClick(SubPage){

    var search = window.location.search

    var main = window.location.pathname

    while (main.charAt(main.length - 1) != "/") {
        main = main.slice(0, main.length - 1)
    }

    window.location.href = main + SubPage + search
}

function CPTagClick(){
    sendEventToUnreal("CPTagClicked", {});
}

function CFTagClick(){
    sendEventToUnreal("CFTagClicked", {});
}

var backgroundColor = "rgba(0,0,255,0.35)"
var textColor = "red"
var textHighlights = "underline"
var display = "inline"

websiteSpecialCases = {
    "bizarrepropagation":{
        display:""
    },
    "crisiscalls":{
        backgroundColor:"rgba(255,0,0,0.35)",
    },
    "foreverfriend":{
        zoom:"1.1"
    },
    "iamhere":{
        textColor:"green"
    },
    "thelightwithin":{
        textColor:"blue"
    }
}

websiteNotes = {
    "forsakengifts": {
        "order":"Keep in mind that this page has a clickable spot that you can only see if you make an order. Just hold down on \"Gift\" and select an option, do the same for \"shipping\"",
    }
}

var numberOfKeys = 0
var websiteName
var pageName
var zoom = 1

document.addEventListener("DOMContentLoaded", onLoadCode)

function onLoadCode() {

    var main = window.location.pathname

    console.log(main)

    pageName = main.split("/")[main.split("/").length - 1].split(".")[0]
    websiteName = main.split("/")[main.split("/").length - 2]

    console.log(pageName)
    
    if (Object.keys(websiteSpecialCases).includes(websiteName)) {

        if (Object.keys(websiteSpecialCases[websiteName]).includes("backgroundColor")) {
            backgroundColor = websiteSpecialCases[websiteName].backgroundColor
        }
        if (Object.keys(websiteSpecialCases[websiteName]).includes("textColor")) {
            textColor = websiteSpecialCases[websiteName].textColor
        }
        if (Object.keys(websiteSpecialCases[websiteName]).includes("textHighlights")) {
            textHighlights = websiteSpecialCases[websiteName].textHighlights
        }
        if (Object.keys(websiteSpecialCases[websiteName]).includes("zoom")) {
            zoom = websiteSpecialCases[websiteName].zoom
        }
        if (Object.keys(websiteSpecialCases[websiteName]).includes("display")) {
            display = websiteSpecialCases[websiteName].display
        }
    }

    var choices = {}

    if (document.cookie != "") {
        var things = document.cookie.split(";")

        for (let i = 0; i < things.length; i++) {
            thing = things[i]

            var actualStuff = thing.split("=")

            if (actualStuff[0].charAt(0) == " ") {
                actualStuff[0] = actualStuff[0].substring(1, actualStuff[0].length)
            }

            if (actualStuff[1] == "true") {
                choices[actualStuff[0]] = true
            }
            else if (actualStuff[1] == "false") {
                choices[actualStuff[0]] = false
            }
            else { 

                try {
                    choices[actualStuff[0]] = JSON.parse(actualStuff[1])
                }

                catch {
                    choices[actualStuff[0]] = actualStuff[1]
                }
                
            }
        }
    }

    choices["websiteVisitData"][websiteName][pageName] = true

    document.cookie = "websiteVisitData=" + JSON.stringify(choices["websiteVisitData"])

    console.log(choices)

    if (choices["showClickspots"]) {

        var elements = document.getElementsByClassName("CPTAG")

        for (let i = 0; i < elements.length; i++) {
            HandleElement(elements[i])
        }

        var elements = document.getElementsByClassName("CFTAG")

        for (let i = 0; i < elements.length; i++) {
            HandleElement(elements[i])
        }
    }

    if (choices["showKeyText"]) {

        var areas = document.getElementsByClassName("PTAG")

        var indexes = ["1", "2", "3", "4", "5", "6", "7", "8"]
        var characters = "abcdefghijklmnopqrstuvwxyz"

        for (let i = 0; i < areas.length; i++) {
            var area = areas[i]

            var index = Math.floor(Math.random() * 7) + 1
            var key = ""

            var innerElement = document.createElement("span")
            innerElement.className = "innerPTAG"

            for (let e = 0; e < 8; e++){

                if (Math.random() <= 0.85) {
                    key += Math.floor(Math.random() * 10)
                }
                else {
                    key += characters.charAt(Math.floor(Math.random() * (characters.length - 1)))
                }
            }

            innerElement.innerHTML = index + " - " + key
            area.appendChild(innerElement)

        }
    }

    console.log(numberOfKeys)

    if (choices["showKeyText"] && choices["rainbowKeys"]) {

        window.setInterval(rainbowColoring, 10)
    }

    //#region Grey div stuff

    var note = document.createElement("div")
    note.className = "notesHolder"

    document.getElementsByTagName("body")[0].appendChild(note)

    if (choices["showNotes"]) {

        var textNote = document.createElement("span")

        var notes = {}

        if (Object.keys(websiteNotes).includes(websiteName)) {

            if (Object.keys(websiteNotes[websiteName]).includes("__regular")) {
                notes["Site specific note: "] = websiteNotes[websiteName]["__regular"]
            }

            if (Object.keys(websiteNotes[websiteName]).includes(pageName)) {
                notes["Page specific note: "] = websiteNotes[websiteName][pageName]
            }

            var text = ""

            for (let i = 0; i < Object.keys(notes).length; i++) {

                text += "<span class=\"bolden\">" + Object.keys(notes)[i] + "</span>" + notes[Object.keys(notes)[i]]

                if (i + 1 < Object.keys(notes).length) {
                    text += "\n\n"
                }
            }

            textNote.innerHTML = text

            if (text != "") {
                note.appendChild(textNote)
            }
        }
    }

    if (note.innerHTML == "") {
        note.style.display = "none"
    }

    //#endregion

    if (choices["onHover"]) {
        
        var ptags = document.getElementsByClassName("innerPTAG")

        for (let i = 0; i < ptags.length; i++) {
            showKeysOnHighlight.push(ptags[i])

            ptags[i].setAttribute("linkedBox", i)
            ptags[i].setAttribute("key", ptags[i].innerHTML)
            ptags[i].innerHTML = ""
        }

        UpdateHighlightKeys()

    }
}
    
const SPEED = 15

var next = {
    "r":"g",
    "g":"b",
    "b":"r"
}

var colorOptions = ["r", "+g"]
var color = [255, 0, 0]

function rainbowColoring() {
    var keys = document.getElementsByClassName("innerPTAG")

    var red = color[0]
    var green = color[1]
    var blue = color[2]

    var finished = false

    for (let i = 0; i < colorOptions.length; i++) {
        var element = colorOptions[i]
        var editValue = SPEED
        var positive = element.charAt(0) != "-"

        if (element.length == 1) {
            continue
        }

        if (!positive) {
            editValue *= -1
        }

        if (element.charAt(1) == "r") {
            red += editValue
            if (red >= 255 || red <= 0) {
                if (positive) {
                    red =255
                }
                else {
                    red = 0
                }
                finished = true
            }
        }

        else if (element.charAt(1) == "g") {
            green += editValue

            if (green >= 255 || green <= 0) {
                if (positive) {
                    green =255
                }
                else {
                    green = 0
                }
                finished = true
            }
        }

        else if (element.charAt(1) == "b") {
            blue += editValue

            if (blue >= 255 || blue <= 0) {
                if (positive) {
                    blue =255
                }
                else {
                    blue = 0
                }
                finished = true
            }
        }
    }

    if (finished) {
        if (colorOptions[0].length == 1) {
            colorOptions[1] = colorOptions[1].charAt(1)

            colorOptions[0] = "-" + colorOptions[0]
        }

        else if (colorOptions[0].charAt(0) == "-") {
            colorOptions = [colorOptions[1], "+" + next[colorOptions[1]]]
        }
    }

    for (let i = 0; i < keys.length; i++) {
        var key = keys[i]

        if (key.matches(":hover")) {
            key.style.color = ""
            continue
        }

        key.style.color = "rgb(" + red + ", " + green + ", " + blue + ")"
    }

    color = [red, green, blue]
}


window.onresize = function() {
    UpdateHighlightElements();
    UpdateHighlightKeys()
}

var highlightElements = []

async function HandleElement(baseElement) {

    var style = "color: " + textColor + " !important; text-decoration: " + textHighlights + " !important; background-color: " + backgroundColor + " !important; display: " + display + " !important"

    if ((baseElement.children.length == 0)) {

        if (baseElement.getAttribute("style") == style) {
            return
        }

        numberOfKeys += 1
        baseElement.setAttribute("style", style)
        return
    }

    for (let e = 0; e < baseElement.children.length; e++) {
        var element = baseElement.children[e]

        if (highlightElements.includes(element)){
            continue
        }

        if (["IMG", "VIDEO", "HR", "FIGURE"].includes(element.tagName)) {
            highlightElements.push(element)
            numberOfKeys += 1
            continue
        }

        if (element.tagName == "DIV" && element.children.length == 0) {
            highlightElements.push(element)
            numberOfKeys += 1
            continue
        }

        if (element.getAttribute("style") == style) {
            continue
        }
    
        element.setAttribute("style",style)
        numberOfKeys += 1
    }

    UpdateHighlightElements()
}

function UpdateHighlightElements() {

    while (document.getElementsByClassName("KEYWEBSITEhighlight").length != 0) {
        document.getElementsByClassName("KEYWEBSITEhighlight")[0].remove()
    }

    for (i in highlightElements) {
        element = highlightElements[i]

        if (window.getComputedStyle(element, null).getPropertyValue("position") == "fixed"){
            var elemRect = element.getBoundingClientRect();

            var highlight = document.createElement("div")

            highlight.style.width = elemRect.width / zoom + "px"
            highlight.style.height = elemRect.height / zoom + "px"
            highlight.style.top = elemRect.top / zoom + "px"
            highlight.style.left = elemRect.left / zoom + "px"

            highlight.style.backgroundColor = backgroundColor
            highlight.style.position = "fixed"

            highlight.className = "KEYWEBSITEhighlight"

            document.getElementsByTagName("body")[0].appendChild(highlight)
            continue
        }

        var elemRect = element.getBoundingClientRect();

        var mainRect = new DOMRect(elemRect.left + window.pageXOffset, elemRect.top + window.pageYOffset, elemRect.width, elemRect.height)

        var highlight = document.createElement("div")

        highlight.style.width = mainRect.width / zoom + "px"
        highlight.style.height = mainRect.height / zoom + "px"
        highlight.style.top = mainRect.top / zoom + "px"
        highlight.style.left = mainRect.left / zoom + "px"

        highlight.style.backgroundColor = backgroundColor
        highlight.style.position = "absolute"
        highlight.style.zIndex = 10;

        highlight.className = "KEYWEBSITEhighlight"

        document.getElementsByTagName("body")[0].appendChild(highlight)
    }
}

var showKeysOnHighlight = []

function UpdateHighlightKeys() {

    var keepHidden = []

    while (document.getElementsByClassName("ptagHover").length != 0) {

        var element = document.getElementsByClassName("ptagHover")[0]

        if (element.style.display == "none") {
            keepHidden.push(element.getAttribute("linkedptag"))
        }

        document.getElementsByClassName("ptagHover")[0].remove()
    }

    for (let i = 0; i < showKeysOnHighlight.length; i++) {

        var ptag = showKeysOnHighlight[i]

        var ptagBox = ptag.getBoundingClientRect()

        var pos = [ptagBox.left + window.scrollX, ptagBox.top + window.scrollY];
        var size = [ptagBox.width, ptagBox.height]

        var element = document.createElement("div")

        element.style.paddingRight

        element.style.left = Math.max(pos[0] - (window.innerWidth / 40), 0) + "px"
        element.style.top = Math.max(pos[1] - (window.innerWidth / 40), 0) + "px"
        element.className = "ptagHover"

        if (keepHidden.includes(i.toString())) {
            element.style.display = "none"
        }

        element.setAttribute("linkedPtag", i)
        element.setAttribute("onmouseover", "mouseOver(" + i + ")")
        element.setAttribute("onmouseout", "mouseOut(" + i + ")")
        element.setAttribute("onclick", "keyBoxClick(" + i + ")")
        ptag.setAttribute("onclick", "keyTextClick(" + i + ")")

        document.getElementsByTagName("body")[0].appendChild(element)
    }
}

function mouseOver(index) {

    var ptags = document.getElementsByClassName("ptagHover")
    var innerPTAGs = document.getElementsByClassName("innerPTAG")

    for (let i = 0; i < ptags.length; i++) {

        var ptag = ptags[i]

        for (let e = 0; e < innerPTAGs.length; e++) {

            var innerPTAG = innerPTAGs[e]
            
            if (innerPTAG.getAttribute("linkedBox") == ptag.getAttribute("linkedPtag") && innerPTAG.getAttribute("linkedBox") == index) {
                if (ptag.matches(":hover")) {
                    innerPTAG.innerHTML = innerPTAG.getAttribute("key")
                }
            }
        }
    }
}

function mouseOut(index) {

    var ptags = document.getElementsByClassName("ptagHover")
    var innerPTAGs = document.getElementsByClassName("innerPTAG")


    for (let i = 0; i < ptags.length; i++) {

        var ptag = ptags[i]

        console.log(ptag.style.display)

        if (ptag.style.display == "none") {
            continue
        }

        console.log("fuck you")

        for (let e = 0; e < innerPTAGs.length; e++) {

            var innerPTAG = innerPTAGs[e]
            
            if (innerPTAG.getAttribute("linkedBox") == index && innerPTAG.getAttribute("linkedBox") == ptag.getAttribute("linkedptag")) {
                innerPTAG.innerHTML = ""
            }
        }
    }
}

function keyBoxClick(index) {
    var ptags = document.getElementsByClassName("ptagHover")
    var innerPTAGs = document.getElementsByClassName("innerPTAG")

    for (let i = 0; i < ptags.length; i++) {

        var ptag = ptags[i]

        for (let e = 0; e < innerPTAGs.length; e++) {

            var innerPTAG = innerPTAGs[e]
            
            if (innerPTAG.getAttribute("linkedBox") == ptag.getAttribute("linkedPtag") && innerPTAG.getAttribute("linkedBox") == index) {
                innerPTAG.innerHTML = innerPTAG.getAttribute("key")

                ptag.style.display = "none"
            }
        }
    }
}

function keyTextClick(index) {
    var ptags = document.getElementsByClassName("ptagHover")
    var innerPTAGs = document.getElementsByClassName("innerPTAG")

    for (let i = 0; i < ptags.length; i++) {

        var ptag = ptags[i]

        for (let e = 0; e < innerPTAGs.length; e++) {

            var innerPTAG = innerPTAGs[e]
            
            if (innerPTAG.getAttribute("linkedBox") == ptag.getAttribute("linkedPtag") && innerPTAG.getAttribute("linkedBox") == index) {
                innerPTAG.innerHTML = ""

                ptag.style.display = "inherit"
            }
        }
    }
}

const fixImageBoxes = setInterval(() => {

    UpdateHighlightElements()

}, 100)


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}