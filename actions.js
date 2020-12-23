let container = document.querySelector(".main");
let piano_container = document.createElement("div");
piano_container.classList.add("piano-container");
container.appendChild(piano_container);

let nav = document.querySelector(".navigation");

let selection_mode = 'normal';

let activeNotes = [];

let noteNums = {
    c:     0,
    "c/d": 1,
    d:     2,
    "d/e": 3,
    e:     4,
    f:     5,
    "f/g": 6,
    g:     7,
    "g/a": 8,
    a:     9,
    "a/b": 10,
    b:     11
}

let noteNames = {
    0:    "c",
    1:  "c/d",
    2:    "d",
    3:  "d/e",
    4:    "e",
    5:    "f",
    6:  "f/g", 
    7:    "g",
    8:  "g/a",
    9:    "a",
    10: "a/b",
    11:   "b"
}
let possibleNotes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

//the w stands for whole (as in whole-step)
//the h stands for half (as in half-steps)

let modeIntervals = {
    "major":    "wwhwwwh",
    "dorian":   "whwwwhw",
    "phrygian": "hwwwhww",
    "lydian":   "wwwhwwh",
    "m-lydian": "wwhwwhw",
    "aeolian":  "whwwhww",
    "locrian":  "hwwhwww"
}

let scale = (note, mode="major") => {

  let result = [];
  let pattern = (modeIntervals[mode]).split("");
  let currentScaleDegree = 0;
  result.push(noteNums[note])
  let lastPushed = noteNums[note];

  pattern.forEach(step => {
      if (step == 'w') {
        let toPush = lastPushed + 2;
        if (toPush > 11) {
          toPush -= 12;
        } 
        result.push(toPush);
        lastPushed = toPush;
      } else  if (step == 'h') {
        let toPush = lastPushed + 1;
        if (toPush > 11) {
          toPush -= 12;
        }
        result.push(toPush);
        lastPushed = toPush;
      }
  });

  return result; 
}

//translates between number and name of note
let numToNote = (arrayOfNoteNames) => {
    let result = [];

    for (let each in arrayOfNoteNames) {
        result.push(noteNames[each]);
    }

    return result;
}

let noteToNum = (arrayOfNoteNums) => {
    let result = [];

    for (let each in arrayOfNoteNums) {
        result.push(noteNums[each]);
    } 

    return result;
}

//PIANO GUI
let drawPiano = (octaves=1, notesToDraw) => {
    let piano = document.createElement("div");
    piano.classList.add("piano");

    if (octaves && notesToDraw) {
        console.log("there were parameters");
        console.log(`octaves: ${octaves}\nnotesToDraw: ${notesToDraw}`);
    }

    for(let i = 0; i < 12 * octaves; i++) {

        let key = document.createElement("div");

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
        }

        if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 11) {
            key.classList.add("white-key"); 
        } else {
            key.classList.add("black-key");
        }

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
                activeNotes.push(key.textContent);
            } else {
                key.classList.remove("clicked");
                let toDelete = activeNotes.indexOf(`${key.textContent}`);
                activeNotes = activeNotes.filter(e => e !== `${key.textContent}`);
            }
        });


        if (notesToDraw) {
            let notesVariable = notesToDraw;
            
            Array.prototype.forEach.call(notesVariable, note => {
                if (noteToNum(key.textContent) == note){
                    console.log(note);
                    key.classList.add("clicked");
                    activeNotes.push(note);
                }
            });
/*
            notesToDraw.forEach(note => {
                if (noteToNum(key) == note) {
                    console.log("match!");
                    key.classList.add("clicked");
                    activeNotes.push(note);
                }
            });
*/
        }

        piano.appendChild(key)
    }

    piano_container.appendChild(piano);
}

//Chord storage 
//container that will display my saved chords
//let numberOfChords = 0;

/*
//SELECTION MODES

*/


let logActiveNotes= () => {
    console.log(activeNotes);
}

let getChord = () => {
    console.log(activeNotes.sort());
}

let resetActiveNotes = () => {

    activeNotes = []
    
}

let resetPiano = () => {

    while (piano_container.firstChild) {
        piano_container.removeChild(piano_container.firstChild);
    }

}

let drawScaleNotes = (mode) => {

    if (activeNotes.length == 1){

        let destroyModeMenu = () => {
            while (modeSelection.firstChild) {
                modeSelection.removeChild(modeSelection.firstChild)
            } 
        }

        let modeSelection = document.createElement("div");
        modeSelection.classList.add("modeSelectionContainer");
        container.appendChild(modeSelection);

        let modes = Object.keys(modeIntervals);

        modes.forEach(mode => {
            let modeNode = document.createElement("div");
            modeNode.classList.add("modeNode");
            modeNode.textContent = `${mode}`;
            modeNode.addEventListener("click", function() {

                let selectedNote = activeNotes[0];
                let selectedMode = modeNode.textContent;

                let modeScaleCreated = scale(selectedNote, selectedMode);


                resetActiveNotes();
                resetPiano();
                drawPiano(1, modeScaleCreated);
                destroyModeMenu();
            });
            modeSelection.appendChild(modeNode);            
        });
    }
}
  
// BUTTONS

let body = document.querySelector("body");
let buttons = document.createElement("div");
buttons.classList.add("buttons-container");
container.appendChild(buttons);

let activeNotesButton= document.createElement("div");
activeNotesButton.classList.add("activeNotes");
activeNotesButton.textContent = "consoleNotes()";
activeNotesButton.addEventListener("click", logActiveNotes);
buttons.appendChild(activeNotesButton);

let column = document.createElement("column");
column.classList.add("column");

let resetButton = document.createElement("div");
resetButton.classList.add("resetButton");
resetButton.textContent = "Reset keyboard"; 
resetButton.addEventListener("click", function() {

    resetPiano();
    resetActiveNotes();
    drawPiano();
});
buttons.appendChild(resetButton);

let saveChordButton = document.createElement("div");
saveChordButton.classList.add("saveChordButton");
saveChordButton.textContent = "Save chord";
buttons.appendChild(saveChordButton);

let drawScale= document.createElement("div");
drawScale.classList.add("drawChordButton");
drawScale.textContent = "Draw Scale";
drawScale.addEventListener("click", drawScaleNotes);
buttons.appendChild(drawScale);


drawPiano();
