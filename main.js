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
var drawPiano = function () {
    var mainContent = document.querySelector('.main');
    var piano = document.createElement('div');
    piano.classList.add('piano');
    mainContent.appendChild(piano);
};
drawPiano();
