let container = document.querySelector(".main");

let selection_mode = 'normal';
const CHROMATIC_NOTES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]



//PIANO GUI
let drawPiano = (octaves=1) => {

    let piano = document.createElement("div");
    piano.classList.add("piano");

    for(let i = 0; i < CHROMATIC_NOTES.length * octaves; i++) {
        let key = document.createElement("div");
        key.addEventListener("mouseover", hover);
        if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 11) {
            key.classList.add("white-key"); 
        } else {
            key.classList.add("black-key");
        }
        piano.appendChild(key)
    }

    container.appendChild(piano);
}


let hover = () => {
    
}
//SELECTION MODES


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




drawPiano()
drawPiano()
drawPiano()
