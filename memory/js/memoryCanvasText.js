 /**
 * Object holding information  about text to display on the canvas
 *
 * @constructor
 */
function CanvasText(cv) {
	var canvas=cv;
    var tx = "";
    var pos = canvas.width; // default position is to the right of the canvas
    var visible = false; // default is to not disply text



    /**
     * Set text to display on the canvas
     *
     * @parm {string} t - Text
     */
    this.setTxt = function(t) {
            tx = t;
    }



    /**
     * Get text to display on the canvas
     *
     * @return {String}
     */
    this.getTxt = function() {
        return tx;
    }



    /**
     * Move text to display on the canvas
     *
     * @param {number} - How many pixels the text should move horizontally
     */
    this.move = function(step) {
        pos -= step; // set position further to the left
        // if position is to far to the left, then place text to the right
        if (pos < -tx.length*35) {
            pos = canvas.width;
        }
    }



    /**
     * Get horizontal position ot text to display on the canvas
     *
     * return {number}
     */
    this.getPos = function() {
        return pos;
    }



    /**
     * Mark text as visible on the canvas
     */
    this.setVisible = function() {
        visible = true;
    }



    /**
     * Mark text as invisible on the canvas,
     * and reset the horizontal position
     */
    this.setInvisible = function() {
        visible = false;
        pos = canvas.width;
    }



    /**
     * Tell if text should be visible on the canvas or not
     *
     * @return {boolean}
     */
    this.isVisible = function() {
        return visible;
    }
    
    
    /**
     * Set text to be displayed while waiting for the game to start
     */
    this.setCanvasTxtStart = function() {
        this.setTxt("Click to play");
        this.setVisible();
    }



    /**
     * Set text to be displayd when the game has ended
     *
     * @param {boolean} isRecord - Whether there has been set a new record or not
     * @param {string} oldRecord - The previous record on the server.
     */
    this.setCanvasTxtEnd = function (turnedCards, isRecord, oldRecord) {
        // Default text
        var txt = "";
        // If there has been set a record, create a string waiting for to bee displayd
        if (isRecord) {
            txt = "Congratulations! You turned " + turnedCards + " cards, the old record was " + oldRecord + " turned cards! Click to play again!";
        }
        // If there was no record, then prepare a string to be shown accordingly.
        else {
            txt = "You turned " + turnedCards + " cards. Click to play again!";
        }
        // Send text to canvasText
        this.setTxt(txt);
        // Flag text as visible
        this.setVisible();
    }
    
}