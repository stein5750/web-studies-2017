	/**
	 * lag ref til data.postToServer for denne og memoryCanvasText.js ++ TODO
	 */	
function Data(canvasText){
	/*
	 * Posts score to server
	 *
	 * Post score to server and forwards result to be displayed at canvas and HTML     *
	 */	
	this.postToServer = function(turnedCards) {
	
	    $.ajax({
	        url: "memoryScoreData.php",
	        type: "POST",
	        data: { score:turnedCards.toString() },
	        success: function (response, status) {
	                var parsedResult =  JSON.parse(response);
	                var isRecord = parsedResult[0];  // get first item in the array which is a true if a new record has been set.
	                var oldRecord = parsedResult[1]; // get second item in the array whchs is the stored record (not the new).
	                    // display text on canvas
	                	canvasText.setCanvasTxtEnd(turnedCards,isRecord, oldRecord);
	       	        },
	        error:function (jqXHR, textStatus, errorThrown) {
	            console.log("statusText: "+jqXHR.statusText);
	            console.log("textStatus: "+textStatus);
	            console.log("errorThrown: "+errorThrown)
	        }
	    });
	}
	
	
	/**
	 * Display text in memory.html
	 * Get record from server and display it in HTML.
	 */
	this.setTxtHtmlrecord= function() {
	       $.ajax({
	        url: "memoryScoreData.php",
	        type: "GET",
	        success: function (response, status) {
	            var record = JSON.parse(response)[1]; // get second item in the array whigs is the stored record
	            document.getElementById("bestscore").innerHTML = "The best score reported by the server is "+record+" turned cards.";
	        },
	        error: function (jqXHR, textStatus, errorThrown) {console.log(textStatus, errorThrown);}
	    });
	}
}