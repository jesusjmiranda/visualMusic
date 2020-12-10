let container = document.querySelector(".main");

//PIANO GUI


let drawPiano = () => {

    let piano = document.createElement("div");
    piano.classList.add("piano");


    for(let i = 0; i < 12; i++) {

        let key = document.createElement("div");
    }

    container.appendChild(piano);
}


//DEFINING CLASSES TO CREATE CHORDS ON THE PIANO GUI
let Chord = class {
    constructor(name, notes= []) {
        this.name = name;
        this.notes = notes;
    }
}

let Music = class {

}

let a = new Chord("amin", ["a", "c", "e"])


