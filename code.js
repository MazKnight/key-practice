
var showKeyLocations;

window.onload = function() {
    var websiteList = document.getElementById("websites")

    showKeyLocations = document.getElementById("showKeys")

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

function VisitWebsite(website) {
    
    var urlSearchStuff = new URLSearchParams([
        ["showKeys", showKeyLocations.checked]
    ])

    open("./WebSites/" + website + "/index.html?" + urlSearchStuff)
}