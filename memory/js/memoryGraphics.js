/*
 * Draws graphics on canvas for memory.js
 *
 * @param {object} ct - canvasTxt object
 */
function Graphics(ct) {

    var canvasText = ct;
    var canvas = document.getElementById("mycanvas"); // reference to canvas
    var can2d = canvas.getContext("2d"); // HTML Canvas 2D Context API.
    var prefetchedImages = 0; // Number of cached images.
    var prefetchTotalImages = 9; // Total number of images to prefetch.

    var cardWidth = 149; // The width of a card is 149.
    var cardHeight = 149; // The height of a card is 149.
    var deck; // A Deck object holding the cards

    // image related variables
    var backImg = new Image(); // background Image
    backImg.onload = prefetched(); // call prefetched when the image is cached.
    backImg.src = "images/cardbackside.png";

    var frontImg = []; // An array of frontside images of the cards
    for (var i = 0; i < 8; i++) {
        frontImg[i] = new Image();
        frontImg[i].onload = prefetched(); // call prefetched when the image is cached.
        frontImg[i].src = "images/cardfrontside" + i + ".png"; // Loading imagefiles cardfront1.png, cardfront2.png, ...
    }

    // Gradient
    var gradient = can2d.createLinearGradient(0, 0, canvas.width, 0); // Gradient used for drawing colourful text
    gradient.addColorStop("0.00", "black");
    gradient.addColorStop("0.05", "blue");
    gradient.addColorStop("0.15", "magenta");
    gradient.addColorStop("0.50", "yellow");
    gradient.addColorStop("0.85", "magenta");
    gradient.addColorStop("0.95", "blue");
    gradient.addColorStop("1.00", "black");
    can2d.font = "75px Arial"; // Font Arial size 75 px used when drawing text.



    /**
     * Prefetched images
     *
     * Count the number of cached images
     */
    function prefetched(){
        can2d.save(); // Save context to avoid interfering with the main part of the graphics.
        prefetchedImages++; // Increase the count of prefetched images.
        var percent = Math.round( prefetchedImages / prefetchTotalImages * 100); // Percent of images loaded.
        can2d.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        can2d.textAlign = "center"; // Center text
        can2d.fillStyle = "white"; // Colour white
        can2d.font = "30px Arial"; // Font Arial size 30 px used when drawing text.
        can2d.fillText("Prefetching images..." + percent + "%", canvas.width/2, canvas.height/2); // Draw text.
        can2d.restore(); // Restore context.
    }


    /**
     * Checks if the prefetching of umages is ready.
     *
     * @return { bolean} - True if all images have been loaded.
     */
    this.prefetchReady = function() {
        return ( prefetchedImages == prefetchTotalImages );
    }



    /**
     * Recieveng a Deck object containing the cards.
     *
     * Could have been passed as parameter to Graphics, but at that time the Deck is not ready.
     *
     * @param {object} d - Deck object containg cards and card related functions.
     */
    this.setDeck = function(d) {
        deck = d;
    }



    /**
     * Draws everything on the canvas.
     */
    this.draw = function() {
        // Draw background
        can2d.fillStyle = 'rgba(20, 20, 87, 1)'; // Set colour
        can2d.fillRect(0, 0, canvas.width, canvas.height); // Draw a box filling the background

        // Draw cards
        var c; // temporary variable with a card object
        var img; // temporary variable with a image of the front or back of the card
        var x;  // horizontal position of the card
        var y;  // vertical position of the card
        var xShrinked; // Horizontal position of the card after the card has been shrinked.
        var shrinkedWidth; // Width of the card after it has been shrinked.
        var shrinkWidth; // Pixels to shrink the width of the card
        for (var i = 0; i < 16; i++) {
            c = deck.card[i];
            // if the card is turned less than 90 degrees show front image based on cards pair
            if (c.getRotation()<50) {
                img = frontImg[c.pairId()]
            }
            // if card is turned more than 90 degrees, show backkside of the card
            else {
                img = backImg;
            }

            x = c.getX(); // Cards x coordinates
            y = c.getY(); // Cards y coordinates
            shrinkWidth = Math.sin(Math.PI * c.getRotation() / 100) * cardWidth; // PI (=180 degrees) equals turning the card. c.getRotation()/100 is the percentage of the turn and by multiplying with the width of the card we get how many pixels the cards width should change.
            xShrinked = x+shrinkWidth/2; // x position + moving the card slightly to the right as the card get narrower during turning.
            shrinkedWidth = cardWidth - shrinkWidth; // width - reduction in width as the card get narrower during turning.
            can2d.drawImage(img, xShrinked, y, shrinkedWidth, cardHeight); // Draw an image of a shrinked card
        }

        // Draw text
        if (canvasText.isVisible()) {
            can2d.fillStyle = 'rgba(0, 0, 100, 0.5)';  // Dark blue 50% transparent.
            can2d.fillRect(0, 0, canvas.width, canvas.height);  // Dark blue 50% transparent box creates illusion of shade
            can2d.fillStyle = gradient; // set fillstyle to a gradient fill.
            can2d.fillText(canvasText.getTxt(), canvasText.getPos(), canvas.height / 2 + 25 ); // Draw text on the canvas like 'You turned x cards...'
        }
    }
}
