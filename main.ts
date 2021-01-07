class Music {
    static activeNotes = [];

    static noteNums: object = {
        0:   "c",
        1: "c|d",
        2:   "d",
        3: "d|e",
        4:   "e",
        5:   "f",
        6: "f|g",
        7:   "g",
        8: "g|a",
        9:   "a",
        10:"a|b",
        11:  "b",
    }

    static noteNames: object ={
        "c": 0,
        "c|d": 1,
        "d":   2,
        "d|e": 3,
        "e":   4,
        "f":   5,
        "f|g": 6,
        "g":   7,
        "g|a": 8,
        "a":   9,
        "a|b":10,
        "b":  11,
    }

    static modeIntervals: object = {
        "ionian":   "wwhwwwh",
        "dorian":   "whwwwhw",
        "phrygian": "hwwwhww",
        "lydian":   "wwwhwwh",
        "m-lydian": "wwhwwhw",
        "aeolian":  "whwwhww",
        "locrian":  "hwwhwww",
    }

    static createScale(note: string, mode: string = "ionian", strOrNum: string = "num"){

        let result = [];
        let pattern: string[] = (Music.modeIntervals[mode]).split("");
        result.push(Music.noteNames[note]);
        let lastPushed = Music.noteNames[note];

        pattern.forEach(step => {
            if(step == 'w') {
                let toPush = lastPushed + 2;
                if (toPush > 11) {
                    toPush -= 12;
                }
                result.push(toPush);
                lastPushed = toPush;
            } else if (step == 'h') {
                let toPush = lastPushed + 1;
                if (toPush > 11) {
                    toPush -= 12;
                }
                result.push(toPush);
                lastPushed = toPush;
            }
        });

        return result;
    };

    static notes() {
        for (let each in Music.noteNums) {
           console.log(each) 
        }
    }

    static numbers() {
        for (let each in Music.noteNames) {
            console.log(each)
        }
    }

};

class DOMState {

    static modeMenu = false;

};

class Chord {
    notes: number[];

    constructor(arrayOfNoteNums: number[]){
        //filters duplicates
        this.notes = arrayOfNoteNums.filter((v,i) => arrayOfNoteNums.indexOf(v) === i); 
    }

    getNotes = () => {
        console.log(this.notes);
    } 

};

interface DrawPianoParams {
    notesToDraw?: Chord;
    querySelector?: string;
    intervals?: number;
};


let drawPiano = (params: DrawPianoParams): void => {

    let pianoLocation = document.querySelector(`.${params.querySelector}`);

    let piano = document.createElement('div');
    piano.classList.add('piano');


    let whiteKeys = document.createElement('div');
    let blackKeys = document.createElement('div');
    whiteKeys.classList.add('whiteKeys');
    blackKeys.classList.add('blackKeys');

    piano.appendChild(blackKeys);
    piano.appendChild(whiteKeys);

    for (let i = 0; i <= 11; i++) {

        let key = document.createElement("div");

        switch(i) {
            case 0: 
                key.textContent = "c";
                break;
            case 1:
                key.textContent = "c|d";
                break;
            case 2:
                key.textContent = "d";
                break;
            case 3:
                key.textContent = "d|e";
                break;
            case 4:
                key.textContent = "e";
                break;
            case 5:
                key.textContent = "f";
                break;
            case 6:
                key.textContent = "f|g";
                break;
            case 7:
                key.textContent = "g";
                break;
            case 8:
                key.textContent = "g|a";
                break;
            case 9:
                key.textContent = "a";
                break;
            case 10:
                key.textContent = "a|b";
                break;
            case 11:
                key.textContent = "b";
                break;
            case 12:
                key.textContent = "c";
                break;
        }

        if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 11 || i == 12) {
            key.classList.add('whiteKey');
            whiteKeys.appendChild(key);

        } else {
            key.classList.add('blackKey');
            blackKeys.appendChild(key);
        }

        key.addEventListener("mouseenter", function() {
            key.classList.add("hover")
        });

        key.addEventListener("mouseleave", function() {
            key.classList.remove("hover");
        });

        key.addEventListener("click", function() { 
            let classes = key.className;
            if (classes.search(/active/) == -1) {
                key.classList.add('active');
                Music.activeNotes.push(key.textContent);
            } else {
                key.classList.remove("active");
                Music.activeNotes = Music.activeNotes.filter(e => e !== key.textContent);

            }

            console.log(Music.activeNotes);

            classes = null;
        });

        if (params.notesToDraw){

            let notesPassed = params.notesToDraw.notes;

            for(let note in notesPassed) {

                if (Music.noteNames[key.textContent] == notesPassed[note]) {
                    key.classList.add('active');
                    Music.activeNotes.push(key.textContent);
                }
            }



            notesPassed = null;
        }
    }

    pianoLocation.appendChild(piano);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    pianoLocation.appendChild(buttonsContainer);

    let resetButton = document.createElement('div');
    resetButton.classList.add('button');
    resetButton.textContent = "Reset Piano";
    resetButton.addEventListener("mouseenter", function () {
        resetButton.classList.add("hover");
    });
    resetButton.addEventListener("mouseleave", function () {
        resetButton.classList.remove("hover");
    });
    resetButton.addEventListener("click", resetPiano);

    let chooseButton = document.createElement('div');
    chooseButton.classList.add('button');
    chooseButton.textContent = "Draw Scale";
    chooseButton.addEventListener("mouseenter", function () {
        chooseButton.classList.add("hover");
    });
    chooseButton.addEventListener("mouseleave", function () {
        chooseButton.classList.remove("hover");
    });

    chooseButton.addEventListener("click", chooseMode);

    buttonsContainer.appendChild(resetButton);
    buttonsContainer.appendChild(chooseButton);

};

let clearPiano = () => {
    let piano = document.querySelector('.piano');
    let bC = document.querySelector('.buttons-container');
    while (piano.firstChild) {
        piano.removeChild(piano.firstChild);
    }
    while (bC.firstChild) {
        bC.removeChild(bC.firstChild);
    }

    piano.remove();
    bC.remove();
    Music.activeNotes = [];
    DOMState.modeMenu = false;
}

let resetPiano = () => {
    clearPiano();

    drawPiano({querySelector: "main"});
}

let chooseMode = () => {
    if (DOMState.modeMenu == false) {
        let buttonsMenu = document.querySelector('.buttons-container');
        let modeMenu = document.createElement('div');
        modeMenu.classList.add('mode-menu');
        buttonsMenu.appendChild(modeMenu);
        for (let mode in Music.modeIntervals) {
            let button = document.createElement('div');
            button.classList.add('button');
            button.addEventListener("mouseenter", function() {
                button.classList.add("hover");
            });
            button.addEventListener("mouseleave", function() {
                button.classList.remove("hover");
            });
            button.textContent = `${mode}`;
            button.addEventListener("click", function() {
                let mode = button.textContent
                drawScale(mode);
            });
            button.addEventListener("click", clearMenu);
            modeMenu.appendChild(button);
        }

        DOMState.modeMenu = true;
    }
}

let clearMenu = () => {
   let menu = document.querySelector('.mode-menu'); 
   if (menu){
       menu.remove();
       DOMState.modeMenu = false;
   }
}

let drawScale = (mode: string) => {
   if (Music.activeNotes.length == 1) {
       let myNote = Music.activeNotes[0];
       let myScale = Music.createScale(myNote, mode);
       let myChord = new Chord(myScale);
       clearPiano();
       drawPiano({notesToDraw: myChord, querySelector: "main"});
       myNote = null;
       myScale = null;
       myChord = null;

   } else {
       oneNoteAlert();
   }
}

drawPiano({ querySelector: "main"});

let oneNoteAlert = () => {
    let message = document.createElement('div');
    let main = document.querySelector('.main');
    message.classList.add('message')
    message.textContent = "Please select only one note before selecting a mode";
    main.appendChild(message);
    setTimeout(function() {message.remove()}, 4000);
}

let navigation = () => {
    let navigation = document.querySelector(".navigation");

    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = "Visualize Music";

    let pianoTool = document.createElement("div");
    pianoTool.classList.add("nav-link");
    pianoTool.textContent = "Piano visualizer";

    navigation.appendChild(title);
    navigation.appendChild(pianoTool);
}


navigation();
