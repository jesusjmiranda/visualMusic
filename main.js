//Music class mainly for static music theory methods for use with Chords
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
        1: "c/d",
        2: "d",
        3: "d/e",
        4: "e",
        5: "f",
        6: "f/g",
        7: "g",
        8: "g/a",
        9: "a",
        10: "a/b",
        11: "b"
    };
    //something here
    Music.noteNames = {
        "c": 0,
        "c/d": 1,
        "d": 2,
        "d/e": 3,
        "e": 4,
        "f": 5,
        "f/g": 6,
        "g": 7,
        "g/a": 8,
        "a": 9,
        "a/b": 10,
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
//instances of this class will be used to store 
//notes for chords the user creates. 
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
var mainContent = document.querySelector('.main');
var drawPiano = function (notesToDraw) {
    var piano = document.createElement('div');
    piano.classList.add('piano');
    mainContent.appendChild(piano);
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
                key.classList.add("active");
                Music.activeNotes.push(key.textContent);
            }
            else {
                key.classList.remove("active");
                Music.activeNotes = Music.activeNotes.filter(function (e) { return e !== key.textContent; });
            }
            console.log(Music.activeNotes);
            classes = null;
        });
    };
    for (var i = 0; i <= 11; i++) {
        _loop_1(i);
    }
};
drawPiano();
console.log("Hello everyone!");
