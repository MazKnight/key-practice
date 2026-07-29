
window.onload = function() {
    var websiteList = document.getElementById("websites")

    var settings = {}
    var settingsElements = document.getElementsByClassName("setting")

    for (let i = 0; i < settingsElements.length; i++) {
        setting = settingsElements[i]

        settings[setting.getAttribute("name")] = setting
    }

    var choices = GetChoices()

    if (!Object.keys(choices).includes("visitData")) {
        resetVisitData()
    }

    var options = document.getElementsByClassName("setting")

    for (let i = 0; i < options.length; i++) {

        var name = options[i].getAttribute("name")

        if (Object.keys(choices).includes(name)) {

            options[i].checked = choices[name]

        }

        options[i].setAttribute("onclick", "setcookies()")
    }

    for (let i = 0; i < Object.keys(websites).length; i++) {
        websiteName = Object.keys(websites)[i]

        var element1 = document.createElement("li")
        var element = document.createElement("a")

        element.setAttribute("onClick","VisitWebsite(\"" + websites[websiteName] + "\")")
        element.setAttribute("class","fauxLink")

        element.innerHTML = websiteName

        element1.appendChild(element)
        websiteList.appendChild(element1)
    }

    createTables()
}

function GetChoices() {
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

    return choices
}

function createTables() {

    var websiteNames = Object.keys(websites)

    for (let i = 0; i < websiteNames.length; i++) {
        
        var website = websiteNames[i]
        var websiteLink = websites[website]
        
        var time = websiteUpTimes[websiteLink]

        var element = document.createElement("a")
        element.setAttribute("onClick","VisitWebsite(\"" + websiteLink + "\")")
        element.setAttribute("class","fauxLink")
        element.innerHTML = website

        var part
        var index
        if (time >= FIRSTQUARTER && time <= FOURTHQUARTER) {
            part = document.getElementById("quarterTable")

            index = time
        }
        else if (time == ALWAYS) {
            part = document.getElementById("alwaysUp")

            var subelement = document.createElement("li")
            subelement.appendChild(element)

            part.appendChild(subelement)
            
            continue
        }
        else {
            part = document.getElementById("halfTable")
            index = time - 4
        }

        var hasSetData = false

        for (let e = 0; e < part.children[0].children.length; e++) {

            var node = part.children[0].children[e]

            if (node.tagName != "TR" || (node.children.length > 0 && node.children[0].tagName == "TH")) {
                continue
            }

            if (node.children[index].children.length == 0) {
                node.children[index].appendChild(element)
                hasSetData = true
                break
            }
        }

        if (!hasSetData) {
            var row = document.createElement("tr")

            var times = 4
            if (part.id == "halfTable") {
                times = 2
            }
            
            for (let e = 0; e < times; e++) {
                var tempElement = document.createElement("td")

                if (e == index) {
                    tempElement.appendChild(element)
                }

                row.appendChild(tempElement)
            }

            part.children[0].appendChild(row)
        }

    }
}

function setcookies() {

    console.log("hi")

    var settingsElements = document.getElementsByClassName("setting")

    for (let i = 0; i < settingsElements.length; i++) {
        var setting = settingsElements[i]

        document.cookie = setting.getAttribute("name") + "=" + setting.checked
    }

}

function resetVisitData() {

    var data = {}

    for (let i = 0; i < Object.values(websites).length; i++) {
        var website = Object.values(websites)[i]

        data[website] = {}

        for (let e = 0; e < websiteSubPages[website].length; e++) {
            data[website][websiteSubPages[website][e]] = false
        }

    }

    document.cookie = "websiteVisitData=" + JSON.stringify(data)
}

function CheckForCompletion() {

    var choices = GetChoices()

    var data = choices["websiteVisitData"]
    var links = document.getElementsByClassName("fauxLink")

    for (let i = 0; i < links.length; i++) {

        var link = links[i]
        var name = link.getAttribute("onclick").split("\"")[1]

        var trueComplete = true
        var trueNotComplete = true
        for (let e = 0; e < Object.values(data[name]).length; e++) {

            if (!Object.values(data[name])[e]) {
                trueComplete = false
            }

            else {
                trueNotComplete = false
            }

            if (!trueComplete && !trueNotComplete) {
                break
            }
        }

        if (trueComplete) {
            link.classList.add("fullyVisited")
        }

        else if (trueNotComplete) {
            link.classList.add("notVisted")
        }

        else {
            link.classList.add("partlyVisited")
        }
    }

}

function VisitWebsite(website) {
    setcookies()

    var fauxLinks = document.getElementsByClassName("fauxLink")

    for (let i = 0; i < fauxLinks.length; i++) {
        var element = fauxLinks[i];

        var websiteName = element.getAttribute("onclick").split("\"")[1]



    }

    open("./WebSites/" + website + "/index.html")
}

document.addEventListener('contextmenu', event => {

    var fauxLinks = document.getElementsByClassName("fauxLink")

    var found = ""
    var isBlue = false
    for (let i = 0; i < fauxLinks.length; i++) {
        var link = fauxLinks[i]

        if (link.matches(":hover")) {
            found = link.getAttribute("onclick").split("\"")[1]

            if (link.style.color == "blue") {
                isBlue = true
            }

            break
        }
    }

    if (found == "" || !isBlue) {
        return
    }

    event.preventDefault()

    for (let i = 0; i < fauxLinks.length; i++) {
        var link = fauxLinks[i]

        if (link.getAttribute("onclick").split("\"")[1] == found) {
            link.style.color = ""
        }
    }
});

const fixImageBoxes = setInterval(() => {

    CheckForCompletion()

}, 100)