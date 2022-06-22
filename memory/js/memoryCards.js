/**
 * 
 * A function containing 8 pairs of cards and their functions
 * 
 * @constructor
 *
 * Each card will be given a random position between 0 and 15 in the deck of cards.
 * Each card has an id. Two cards with the same id makes them a pair.
 * Two cards with the same id will cause the same front image to be shown.
 */
function Deck() {

    this.card = []; // an Array of cards
    var deck_order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // a cards order in the deck is a number between 0 and 15 
    var deck_order = shuffle(deck_order); // Shuffle the array, that is the order of cards in the deck of cards.

    var index = 0; // the position in the array of shuffled cards
    // creates 8 pair of cards
    for (var pairId = 0; pairId < 8; pairId++) {
        this.card[index  ] = new Card( pairId, deck_order[index  ]);
        this.card[index+1] = new Card( pairId, deck_order[index+1]);
        index += 2;
    }


    /**
     * Finds which card has the position given as argument to the function.
     *
     * @param x        Horizontal position in px.
     * @param y        Vertical position in px.
     * @return         the card which covers the point (x, y) || null
     */
    this.whichCard = function (x, y) {
        for (var i = 0;i <= 15;i++) {
            if ( this.card[i].clicked( x, y)) {
                return this.card[i];
            }
        }
        // Card not found
        return null;
    }
}


/**
 * Card with properties and methods.
 * 
 * @constructor
 * 
 * @param {number} pairId - A number identiftying one of eight pairs
 * @param {number} index - The position in the shuffled deck.  
 */
function Card( pairId, index) {

    var xy = cardCoordinates( index); // An object containing x & y coordinates of a card based on its position in the deck.
    var x = xy.x; // the horizontal position relative to the canvas in pixels.
    var y = xy.y; // the vertical position relative to the canvas in pixels.

    var rotation = 100; // rotation of card in %. 0 = facing up, 100 = facing down
    var state = "face_down"; // default state of a card is facing down.
    var locked = false; // whether or not a card is accessible



    /**
     * Reports if the card is acessible or not
     * 
     * @return {boolean} locked - The state of the card
     */
    this.isLocked = function() {
        return locked;
    }



    /**
     * Sets the state of a card to inaccessible
     */
    this.lock = function() {
        locked = true;
    }



    /**
     * Get the cards pair-id.
     * 
     * @return {number} pairId - An id which identifies pair a card belongs to.
     */
    this.pairId = function() {
        return pairId;
    }



    /**
     * Get the horizontal position in pixels
     * 
     * @return {number} x - The horizontal postion in pixels relative to the canvas.
     */
    this.getX = function() {
            return x;
    }


    
    /**
     * Get the vertical position in pixels
     * 
     * @return {number} y - The vertical postion in pixels relative to the canvas.
     */
    this.getY = function() {
        return y;
    }



    /**
     * Flag the card as turning face side up.
     */
    this.turnUp = function() {
        state = "rotating_up";
    }

    /**
     * Flag the card as turning face side down.
     */
    this.turnDown = function() {
        state = "rotating_down";
    }
    
    /**
     * Rotate the card based on its state.
     * 
     * @param { number} step - the amount of rotation, a number between 0 and 100.
     */
    this.rotate = function(step) {
        
        // don't rotate if the cards state is lying there not rotating.
        if (state == "face_up" || state == "face_down") {
            return;
        }

        // rotate the card one step more twoards facing down.
        if (state == "rotating_down") {
            rotation += step;
        }
        if (state == "rotating_up") {
            rotation -= step;
        }
        
        // stop rotation up
        if (rotation <= 0) {
            rotation = 0;
            state = "face_up";
            return;
        }
        
        // stop rotation down
        if (rotation >= 100) {
            rotation = 100;
            state = "face_down";
            return;
        }
    }



    /**
     *  Check if the card is facing uo
     * 
     * @return {boolean} - True if the card is facing up.
     */
    this.faceUp = function() {
            return (state == "face_up");
    }


    /**
     * Get the amount of rotation
     * 
     * @return { number} rotation - A number between 0 (card facing up) and 100 (card faing down)
     */
    this.getRotation = function() {
        return rotation;
    }



    /**
     * See if the card has been clicked based on x and y coordinates.
     * 
     * Investigate whether a position (x, y) is inside the borders of the card
     *
     * @param { number} x - A horizontal position in px.
     * @param { number} y - A vertical position in px.
     * @return { boolean} - Returns true if (x, y) is inside the borders of the card. Otherwise: false
     */
    this.clicked = function(mx, my) {
        var cardWidthHight = 149;
            return (mx >= x && mx <= x + cardWidthHight && my >= y && my <= y + cardWidthHight);
    }
}



/**
 * Get the coordinates for a card
 * 
 * @param { number} index - The index of the card in the deck, telling if the card is to be laid out first, second etc.
 * @return {object} - An object containing two varaiables, x (horizontal position in pixels, and y (vertical position in picels).
 */
function cardCoordinates(index) {
    // calculate a cards x, y coordinates based on the cards index.
    // The cards are placed from left to right,
    // starting over from the left on a new row for every 4th card.
    // Index and placement
    // 00 01 02 03
    // 04 05 06 07
    // 08 09 10 11
    // 12 13 14 15
    //
    var padding = 3; // space in pixels added to the cards left side and top side.
    var cardWidth = 149;
    var cardHeight = 149;
    // Wraps the positions for every 4th card
    var x = padding + ( padding + cardWidth) * ( index % 4); // intitial padding + ( cards padding + cards Width) * ( index of card % cards per row )
    var y = padding + ( padding + cardHeight) * Math.floor( index / 4); // initial padding + ( cards padding + cards height) * ( index / cards per column )

    return {x:x, y:y} // returns object with two variables x and y giving the horizontal and vertical position in pixels for the card.
}



/**
 * A random integer
 * 
 * Returns a random integer between min and max.
 * 
 * Why +1 in (max-min+1):
 * Math.random gives [0, 1) and Math.floor rounds down.
 * By adding 1, everyting rounds down to a number in range [min, max].
 *
 * @param { number} min - Smallest number possible returned
 * @param { number} max - Largest  number possible returned
 * @return { number} - An integer in range [min, max]
*/
function randomInteger( min, max) {
    return Math.floor( Math.random() * ( max - min + 1) + min);
}



/**
 * Shuffles the values in an array
 * 
 * Shuffles the values so that each value will have a new random index,
 * while keeping the length of the array.
 *
 * @param { Array} arr - An array
 * @return { Array} shuffledArray - An array with the same values and length but with shuffled indexes.
 */
function shuffle(arr) {
    var c = arr.slice(); // copy the array so that this function not alters the array arr.
    var l = c.length; // The arrays length
    var shuffledArray = []; // the shuffled version of arr
    var tmp_index; // Variable holding the index temporarilyy
    var tmp_value; // Variable holding the index temporarily

    for (var i = 0; i<l; i++) {
        index = randomInteger( 0, c.length-1); // A random number between 0 and the decreasing number of available avialblePositions given by c.length-1.
        tmp_value = c.splice( index, 1); // Removes a value from the array and shortens c.length by 1.
        shuffledArray.push( tmp_value[0]); // Adds the value removed from c to shuffled Array
    }
    return shuffledArray;
}
