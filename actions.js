let container = document.querySelector(".main");

let selection_mode = 'normal';


//PIANO GUI
let drawPiano = (octaves=1) => {

    let hover = (node) => {
        node.classList.add("hover");
    }

    let stopHover = (node) => {
        node.classList.remove("hover");
    }

    let piano = document.createElement("div");
    piano.classList.add("piano");

    for(let i = 0; i < 12 * octaves; i++) {
        let key = document.createElement("div");
        key.addEventListener("mouseenter", hover(key));
        key.addEventListener("mouseleave", stopHover(key));
        
        key.addEventListener("click", function() { 
            let classes = key.className.split(" ");
            if(!classes.includes("clicked")) {
                key.classList.add("clicked")
            } else {
                key.classList.remove("clicked");
            }
        });

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

//might need a label notes function that gets called within the drawPiano function
//that 

