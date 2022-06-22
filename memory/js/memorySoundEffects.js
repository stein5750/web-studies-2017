/**
 * Soundeffects
 *
 * Note on browser compability:
 * Different browsers support different audio formats.
 * No format is supported by all browsers.
 * Beeing able to play either ogg or mp4 should cover most situations.
 */
function SoundEffects() {
    // Check which type of audio the browser supports.
    var type = "unknown"; // default supported audio.
    var test = new Audio();
    // If ogg may be supported, select ogg.
    if (test.canPlayType( "audio/ogg") != "") {
        type = "ogg";
    }
    else{
        // if mp4 may be supported, select mp4.
        if (test.canPlayType("audio/mp4") != "") {
            type = "mp4";
        }
    }



    /**
     * Play soundeffect of a card beeing flipped.         *
     */
    this.playFlip = function() {
        if (type == "ogg") {
            new Audio('audio/flipcard.ogg').play();
        }
        if (type == "mp4") {
            new Audio('audio/flipcard.mp4').play();
        }
        return;
    }



    /**
     * Play soundeffect: success.
     */
    this.playSuccess = function() {
        if (type == "ogg") {
            new Audio('audio/success.ogg').play();
        }
        if (type == "mp4") {
            new Audio('audio/success.mp4').play();
        }
        return;
    }



    /**
     * Play soundeffect: fanfare.
     */
    this.playTada = function() {
        if (type == "ogg") {
            new Audio('audio/tada.ogg').play();
        }
        if (type == "mp4") {
            new Audio('audio/tada.mp4').play();
        }
        return;
    }
}