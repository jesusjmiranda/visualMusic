var Music = /** @class */ (function () {
    function Music() {
    }
    Music.createScale = function (note, mode, strOrNum) {
        if (mode === void 0) { mode = "ionian"; }
        if (strOrNum === void 0) { strOrNum = "num"; }
        var result = [];
        var pattern = (Music.modeIntervals[mode]).split("");
        result.push(Music.noteNames[note]);
        var lastPushed = Music.noteNames[note];
        pattern.forEach(function (step) {
            if (step == 'w') {
                var toPush = lastPushed + 2;
                if (toPush > 11) {
                    toPush -= 12;
                }
                result.push(toPush);
                lastPushed = toPush;
            }
            else if (step == 'h') {
                var toPush = lastPushed + 1;
                if (toPush > 11) {
                    toPush -= 12;
                }
                result.push(toPush);
                lastPushed = toPush;
            }
        });
        return result;
    };
    ;
    Music.notes = function () {
        for (var each in Music.noteNums) {
            console.log(each);
        }
    };
    Music.numbers = function () {
        for (var each in Music.noteNames) {
            console.log(each);
        }
    };
    Music.activeNotes = [];
    Music.noteNums = {
        0: "c",
        1: "c|d",
        2: "d",
        3: "d|e",
        4: "e",
        5: "f",
        6: "f|g",
        7: "g",
        8: "g|a",
        9: "a",
        10: "a|b",
        11: "b"
    };
    Music.noteNames = {
        "c": 0,
        "c|d": 1,
        "d": 2,
        "d|e": 3,
        "e": 4,
        "f": 5,
        "f|g": 6,
        "g": 7,
        "g|a": 8,
        "a": 9,
        "a|b": 10,
        "b": 11
    };
    Music.modeIntervals = {
        "ionian": "wwhwwwh",
        "dorian": "whwwwhw",
        "phrygian": "hwwwhww",
        "lydian": "wwwhwwh",
        "m-lydian": "wwhwwhw",
        "aeolian": "whwwhww",
        "locrian": "hwwhwww"
    };
    return Music;
}());
;
var DOMState = /** @class */ (function () {
    function DOMState() {
    }
    DOMState.modeMenu = false;
    return DOMState;
}());
;
var Chord = /** @class */ (function () {
    function Chord(arrayOfNoteNums) {
        var _this = this;
        this.getNotes = function () {
            console.log(_this.notes);
        };
        //filter duplicates
        this.notes = arrayOfNoteNums.filter(function (v, i) { return arrayOfNoteNums.indexOf(v) === i; });
    }
    return Chord;
}());
;
;
var drawPiano = function (params) {
    var pianoLocation = document.querySelector("." + params.querySelector);
    var piano = document.createElement('div');
    piano.classList.add('piano');
    var whiteKeys = document.createElement('div');
    var blackKeys = document.createElement('div');
    whiteKeys.classList.add('whiteKeys');
    blackKeys.classList.add('blackKeys');
    piano.appendChild(blackKeys);
    piano.appendChild(whiteKeys);
    var _loop_1 = function (i) {
        var key = document.createElement("div");
        switch (i) {
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
        }
        else {
            key.classList.add('blackKey');
            blackKeys.appendChild(key);
        }
        key.addEventListener("mouseenter", function () {
            key.classList.add("hover");
        });
        key.addEventListener("mouseleave", function () {
            key.classList.remove("hover");
        });
        key.addEventListener("click", function () {
            var classes = key.className;
            if (classes.search(/active/) == -1) {
                key.classList.add('active');
                Music.activeNotes.push(key.textContent);
            }
            else {
                key.classList.remove("active");
                Music.activeNotes = Music.activeNotes.filter(function (e) { return e !== key.textContent; });
            }
            console.log(Music.activeNotes);
            classes = null;
        });
        if (params.notesToDraw) {
            var notesPassed = params.notesToDraw.notes;
            for (var note in notesPassed) {
                if (Music.noteNames[key.textContent] == notesPassed[note]) {
                    key.classList.add('active');
                    Music.activeNotes.push(key.textContent);
                }
            }
            notesPassed = null;
        }
    };
    for (var i = 0; i <= 11; i++) {
        _loop_1(i);
    }
    pianoLocation.appendChild(piano);
    var buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    pianoLocation.appendChild(buttonsContainer);
    var resetButton = document.createElement('div');
    resetButton.classList.add('button');
    resetButton.textContent = "Reset Piano";
    resetButton.addEventListener("mouseenter", function () {
        resetButton.classList.add("hover");
    });
    resetButton.addEventListener("mouseleave", function () {
        resetButton.classList.remove("hover");
    });
    resetButton.addEventListener("click", resetPiano);
    var chooseButton = document.createElement('div');
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
var clearPiano = function () {
    var piano = document.querySelector('.piano');
    var bC = document.querySelector('.buttons-container');
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
};
var resetPiano = function () {
    clearPiano();
    drawPiano({ querySelector: "main" });
    console.log("Piano redrawn");
};
var chooseMode = function () {
    if (DOMState.modeMenu == false) {
        var buttonsMenu = document.querySelector('.buttons-container');
        var modeMenu = document.createElement('div');
        modeMenu.classList.add('mode-menu');
        buttonsMenu.appendChild(modeMenu);
        for (var mode in Music.modeIntervals) {
            var button = document.createElement('div');
            button.classList.add('button');
            button.textContent = "" + mode;
            button.addEventListener("click", drawScale);
            button.addEventListener("click", clearMenu);
            modeMenu.appendChild(button);
        }
        DOMState.modeMenu = true;
    }
};
var clearMenu = function () {
    var menu = document.querySelector('.mode-menu');
    if (menu) {
        menu.remove();
        DOMState.modeMenu = false;
    }
};
var drawScale = function () {
    if (Music.activeNotes.length == 1) {
        var myNote = Music.activeNotes[0];
        clearPiano();
        var myScale = Music.createScale(myNote);
        var myChord = new Chord(myScale);
        drawPiano({ notesToDraw: myChord, querySelector: "main" });
        myNote = null;
        myScale = null;
        myChord = null;
    }
    else {
        saySomething();
    }
};
drawPiano({ querySelector: "main" });
var saySomething = function () {
    var message = document.createElement('div');
    var main = document.querySelector('.main');
    message.classList.add('message');
    message.textContent = "Please select one and only one note to draw a scale";
    main.appendChild(message);
    setTimeout(function () { message.remove(); }, 2000);
};
