var websites = {
    "Bizarre Propagation":"bizarrepropagation",
    "Blackhat Post":"blackhatpost",
    "Blushing Brides":"blushingbrides",
    "Building a Future":"buildingafuture",
    "Cavity Lease":"cavitylease",
    "Chevron":"chevron",
    "Crisis Calls":"crisiscalls",
    "Crystal Guild":"crystalguild",
    "Doctor Murder":"doctormurder",
    "Don't waste it":"dontwasteit",
    "Doughy":"doughy",
    "Drug tickets":"drugtickets",
    "Eat My Shit":"ems",
    "Encrave":"encrave",
    "Final Standing":"finalstanding",
    "FindLove":"findlove",
    "Forever Friend":"foreverfriend",
    "Forsaken Gifts":"forsakengifts",
    "I am here":"iamhere",
    "Jakob's sink":"jakobssink",
    "Keep Sake":"keepsake",
    "Kill for me":"killforme",
    "Lab Monkey":"labmonkey",
    "Lost Tapes":"losttapes",
    "Mama Bruguglio":"mamabruguglio",
    "Mors n more market":"morsnmoremarket",
    "Oneless":"oneless",
    "Order of nine":"orderofnine",
    "Overnight Success":"overnightsuccess",
    "Prohibited Stockpile":"prohibitedstockpile",
    "Red Handed":"redhanded",
    "Red Triangle":"redtriangle",
    "Ring Ring":"ringring",
    "Shelter":"shelter",
    "Symphoros Chosen":"symphoroschosen",
    "Synapse Decay":"synapsedecay",
    "Tango Down":"tangodown",
    "Thanks for Visiting":"thanksforvisting",
    "The Bomb Maker":"thebombmaker",
    "The Grey":"TheGrey",
    "The Hall":"thehall",
    "The Hole":"thehole",
    "The Light Within":"thelightwithin",
    "The Loogaroo":"theloogaroo",
    "The Prey":"theprey",
    "Time Sharing":"timesharing",
    "Track06":"track06",
    "ViaMarisRoute":"viamarisroute",
    "Voluvision":"voluvision",
    "World Wide Workers":"worldwideworkers",
    "You There?":"youthere",
}

var showKeyLocations;

window.onload = function() {
    var websiteList = document.getElementById("websites")

    showKeyLocations = document.getElementById("showKeys")

    for (let i = 0; i < Object.keys(websites).length; i++) {
        websiteName = Object.keys(websites)[i]

        var element1 = document.createElement("li")
        var element = document.createElement("a")

        element.setAttribute("target","_blank")
        element.setAttribute("href", "./WebSites/" + websites[websiteName] + "/index.html")
        element.innerHTML = websiteName

        element1.appendChild(element)
        websiteList.appendChild(element1)
    }

    showKeyLocations.addEventListener("change", onClick)

    onClick()
}



function onClick() {

    var websiteList = document.getElementById("websites")

    var children = websiteList.children

    for (let i = 0; i < children.length; i++) {
        var child = children[i]
        var element = child.children[0]

        var base = element.getAttribute("href")

        if (base.includes("?")) {
            base = base.split("?")[0]
        }

        var isChecked = showKeyLocations.checked

        var searchParams = new URLSearchParams([
            ["showKeys", isChecked]
        ])

        base += "?" + searchParams

        element.setAttribute("href",base)
    }
}