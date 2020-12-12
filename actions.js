let container = document.querySelector(".main");

let selection_mode = 'normal';

let hover = () => {
    key.classList.add("hover")
}

let stopHover = () => {
    key.classList.remove("hover")
}

//PIANO GUI
let drawPiano = (octaves=1) => {

    let piano = document.createElement("div");
    piano.classList.add("piano");

    for(let i = 0; i < 12 * octaves; i++) {
        let key = document.createElement("div");
        key.addEventListener("mouseenter", hover);
        key.addEventListener("mouseleave", stopHover);
        if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 11) {
            key.classList.add("white-key"); 
        } else {
            key.classList.add("black-key");
        }
        piano.appendChild(key)
    }

    container.appendChild(piano);
}



/*
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
*/
drawPiano()
drawPiano()
drawPiano()

