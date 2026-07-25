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

websiteSpecialCases = {
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

var numberOfKeys = 0
var websiteName
var zoom = 1

document.addEventListener("DOMContentLoaded", onLoadCode)

function onLoadCode() {

    var main = window.location.pathname

    websiteName = main.split("/")[main.split("/").length - 2]
    
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
    }

    var currentParams = new URLSearchParams(window.location.search)

    var showKeys = currentParams.get("showKeys")

    if (showKeys != null && showKeys == "true") {

        var elements = document.getElementsByClassName("CPTAG")

        for (let i = 0; i < elements.length; i++) {
            HandleElement(elements[i])
        }

        var elements = document.getElementsByClassName("CFTAG")

        for (let i = 0; i < elements.length; i++) {
            HandleElement(elements[i])
        }
    }

    console.log(numberOfKeys)
}

window.onresize = UpdateHighlightElements

var highlightElements = []

async function HandleElement(baseElement) {

    var style = "color: " + textColor + " !important; text-decoration: " + textHighlights + " !important; background-color: " + backgroundColor + " !important; display: inline"

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

const fixImageBoxes = setInterval(() => {

    UpdateHighlightElements()

}, 100)