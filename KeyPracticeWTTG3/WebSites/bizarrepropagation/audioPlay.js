const bizFile = [
    "sfx/clippedTransmission.wav",
    "sfx/creatureTalk.wav",
    "sfx/farmStrange.wav",
    "sfx/hypnoLoop.wav",
    "sfx/internalsWave.wav",
    "sfx/pumpFreq.wav",
    "sfx/trafficHum.wav",
    "sfx/trainDrone.wav",
    "sfx/unknownIdle.wav"
];

const bizSounds = [
    "bizAudio1",
    "bizAudio99",
    "bizAudio419",
    "bizAudio8",
    "bizAudio311",
    "bizAudio76",
    "bizAudio808",
    "bizAudio000",
    "bizAudio16"
];


track = ""

function selectAudio(event){
	stopTrack();
	if(bizSounds.includes(event.id)){
		document.getElementById("selection").innerHTML = "Selection " + event.id;
        track = bizFile[bizSounds.indexOf(event.id)]
	}else{
		document.getElementById("selection").innerHTML = "Select sound";
	}
}


var sound

function playTrack() {
    sound = new Audio(track)
    sound.play()
}

function stopTrack() {
    if (sound == null) {return;}

    sound.pause()
}


