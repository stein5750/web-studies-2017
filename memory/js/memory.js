/**
* @author Stein By <stein@ctrlc.no>
* @version 1.1
*/
var memory = ( function() {

    var fps = 60; // target frames per second, Hz.
    var msPerFrame = 1000 / fps; // time per frame i milliseconds.
    var deck; // @see Deck
    var matches; // number of matched pairs of cards;
    var turnedCards = 0; // counted turned cards so far in the game
    var looking = []; // Up to two cards we are currently looking at
    var ct; // @see CanvasTxt
    var timeOfLastRun = 0; // Milliseconds since the last time game and graphics was updated.
    var accumulatedTime = 0;   // Time passed since last update + time not spent during the last update.
    var speed = 0.20; // speed factor for moving objects
    var gameOver = true; // game state
    var canvas = document.getElementById("mycanvas"); // reference to canvas
    var canvasText = new CanvasText(canvas);
    var data = new Data(canvasText);
    var graphics = new Graphics(canvasText);
    var soundEffects = new SoundEffects();
    var requestId="";
    canvas.addEventListener("click", mouseOnClick); // add eventlistener for mouse
    canvasText.setCanvasTxtStart(); // display 'click to play'
    startGame(); // start game



    /**
     * Set or reset default values  when the next game starts
     *
     * @return - undefined
     */
    function startGame() {
        deck = new Deck();
        graphics.setDeck(deck);
        matches = 0;
        turnedCards = 0;
        if (requestId == "") {
            requestId = requestAnimationFrame(loop);
        }
        data.setTxtHtmlrecord(); // display record from server on HTML page
    }



    /*
     * Loop
     *
     * The game loop, taking care of timing, updating variables and invoking graphics.
     *
     * Securing smooth animation motion:
     * 1) If the computer is too fast: Wait for time to pass.
     * 2) If the computer is too slow: Update variables repeatedly before drawing
     * The speedFactor is indempendant of The target Hz.
     * If the target Hz is changed so will the time between each time update is called
     * (msPerFrame), and hence the distance per second is constant.
     *
     * @param { number} timeStamp - time passed by requestAnimationFrame
     */
    function loop(timeStamp) {

        // Wait for images to get loaded.
        if ( graphics.prefetchReady() == false ) {
            requestAnimationFrame(loop); // Start over.
            return;
        }

        //If the computer is too fast: Wait for time to pass.
        if ( timeStamp < timeOfLastRun + msPerFrame) { // No enough time has passed.
            requestAnimationFrame(loop); // Start over.
            return;
        }

        // Minimum time has passed.
        accumulatedTime += timeStamp - timeOfLastRun; // The time passed since slast run.
        timeOfLastRun = timeStamp; // last time an uppdate was called for.

        // Now compensate if to much time has passed,
        // making sure animations are not  moving to slow.
        // Variables will be updated repeatedly until objects have moved as far as they should
        // have done in the time that has passed.
        // Any remaining millieconds will be spent next time, securing perfectly smooth running.
        var updates = 0; // The number of updates performed.
        while( accumulatedTime >= msPerFrame) { // While the updates lag behind.
            update( msPerFrame); // call update.
            accumulatedTime -= msPerFrame; // The lag is reduced.
            updates++; // The number of updates performed has increased.

            // If update takes longer than msPerFrame over time
            // (Can happen if update is timecosuming or if the user switches to another tab in the browser)
            // this will accumulate wor for each loop and cause the 'spiral of death' and freeze the browser.
            if (updates>200) { // To many updates has been performed.
                // accept lag to prevent browserfreeze.
                accumulatedTime = 0; // Set to zero
                break; // exit the loop.
            }
        }

        // Variables are up to date. Now call graphics
        graphics.draw(); // draw.

        requestAnimationFrame(loop); // Start all over again.
    }



    /**
     * Updating
     *
     * Updating variables.
     *
     * By using timePerFrame to adjust step (pixels to move) the speed of the
     * oject on the screen is independant from how often the update runs.
     *
     * @param { number} timePerFrame - the time between displaying two frames.
     *
     */
    function update( timePerFrame) {
        var step = speed * timePerFrame; // step = pixels to move or percent to rotate

        // rotate cards
        for (var i = 0; i < 16; i++) {
            deck.card[i].rotate(step);
        }

        // move text if text is displayed
        if (canvasText.isVisible()) {
                canvasText.move(step);
        }

        // check for matching cards
        match();
    }



    /**
     * Handles mouseclick
     *
     * @param event Mouse event
     */
    function mouseOnClick(event) {
        // Restart game
        if (gameOver) {
            canvasText.setInvisible(); // remove displayed text.
            gameOver = false;
            startGame(); // start a new game
        }

        // position x - canvas offset
        var posx = event.offsetX;
        // position y - canvas offset
        var posy = event.offsetY;

        // Find which card has been clicked and take turn the card
        var card = deck.whichCard(posx, posy);
        if ( card  ==  null) return; // return if no card matches the click position
        if ( card.isLocked()) return; // return if the card is locked (You found a match already)
        turnCard( card); // turn the card

    }



    /**
     *
     * Turn a card
     *
     * Checks if a card is clicked and takes action if it's clicked
     * Checks if a card is clicked. If so, and no more than two cards
     * are clicked, start turning the card to show the front side.
     * If we have clicked twice on the same card, start turning it to show
     * the back side. Emties the twoCard array.
     * If the clicked card is  an new card, then store the clicked card in
     * the lookingAt array.
     *
     * @param card - a card object
     */
    function turnCard( card) {

        var tmp1, tmp2; // variable to store card objects temporarily.
        // if we already are looking at two cards, and have clicked on a third card,
        // then turn the two first cards whith face down
        if (looking.length == 2) {
            tmp1 = looking[0];
            tmp2 = looking[1];
            looking.pop().turnDown();
            looking.pop().turnDown();
        }

        // if we have only clicked on one card and we click on it again,
        // start turning it with face down, and remove it from 'looking'
        if (looking.length == 1 && looking[0]  ==  card) {
            card.turnDown();
            looking = [];
            soundEffects.playFlip();
            return;
        }
        // if this is not one of the two cards we might have started to turn down, then remember the card.
        if (card != tmp1 && card != tmp2) {
            card.turnUp();
            looking.push( card); // remember that we are looking at the card
            turnedCards += 1;   // keep track of how many cards we are looking at.
            soundEffects.playFlip();   // play sound of a turning card.
            return;
        }
    }



    /**
     * check if two cards are  a pair
     *
     * If they match, leave them visible and not clickable, and check if
     * all cards have been matched.
     */
    function match() {

        if (looking.length == 2 && looking[0].faceUp() && looking[1].faceUp() ) {
            if (looking[0].pairId() == looking[1].pairId()) {
                matches++; // Another pair of card has been matched
                soundEffects.playSuccess(); // play success sound
                looking.pop().lock(); // flag the second card we are looking at as locked so we cant turn it again.
                looking.pop().lock(); // flag the first card we are looking at as locked so we cant turn it again.
                // If all pairs have been found, then end.
                if (matches == 8) {
                    end();
                }
            }
        }
    }

    
    /**
     * End of game
     *
     * Mark the game as over,
     * play musical fanfare,
     * and place call server.
     */
    function end() {
        // play fanfare
        gameOver = true;
        soundEffects.playTada();
        data.postToServer(turnedCards);
        // update the display text shown in memory.html
        data.setTxtHtmlrecord();
    }

        



} // end function
); // End memory
