let container = document.querySelector(".main");

let selection_mode = 'normal';

let activeNotes = []


//PIANO GUI
let drawPiano = (octaves=1) => {

    let piano = document.createElement("div");
    piano.classList.add("piano");

    for(let i = 0; i < 12 * octaves; i++) {
        let key = document.createElement("div");
        key.addEventListener("mouseenter", function() {
            key.classList.add("hover")
        });
        key.addEventListener("mouseleave", function() {
            key.classList.remove("hover");
        });
        key.addEventListener("click", function() { 
            let classes = key.className.split(" ");
            if(!classes.includes("clicked")) {
                key.classList.add("clicked")
                activeNotes.push("something");
            } else {
                key.classList.remove("clicked");
            }
        });

        switch(i){
            case 0:
                key.textContent = "c";
                break;
            case 1:
                key.textContent = "c/d";
                break;
            case 2:
                key.textContent = "d";
                break;
            case 3:
                key.textContent = "d/e";
                break;
            case 4:
                key.textContent = "e";
                break;
            case 5:
                key.textContent = "f";
                break;
            case 6:
                key.textContent = "f/g";
                break;
            case 7:
                key.textContent = "g";
                break;
            case 8:
                key.textContent = "g/a";
                break;
            case 9:
                key.textContent = "a";
                break;
            case 10:
                key.textContent = "a/b";
                break;
            case 11:
                key.textContent = "b";
                break;
        }

        if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 11) {
            key.classList.add("white-key"); 
        } else {
            key.classList.add("black-key");
        }

        piano.appendChild(key)
    }

    container.appendChild(piano);
}

//some resetColor() function to call when a key is pressed to activate selection
//to reset the colors so that the other octaves recieve the change








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
//might need a label notes function that gets called within the drawPiano function
//that 

function something(){
    console.log(activeNotes)
}
