<?php header('Content-Type: text/html; charset=utf-8'); ?>
<!-- edited versjon of memory.html adapted to ctrlc.no -->
<html>
  <head>
    <meta charset=utf-8>
    <meta name="robots" content="noindex, nofollow">
    <meta name="keywords" content="HTML, CSS, JavaScript, PHP">
    <meta name="description" content="A game written in HTML,CSS,JavaScript and PHP">
    <title>Memory</title>
    <link rel="stylesheet" type="text/css" href="../style.css"> <!-- edited -->
    <script type="text/javascript" src="js/jquery-3.4.1.js"></script>  <!-- https://jquery.com/ -->
    <script type="text/javascript" src="js/memoryCanvasText.js"></script>
	<script type="text/javascript" src="js/memoryScoreData.js"></script>
    <script type="text/javascript" src="js/memoryGraphics.js"></script>
    <script type="text/javascript" src="js/memoryCards.js"></script>
    <script type="text/javascript" src="js/memorySoundEffects.js"></script>
    <script type="text/javascript" src="js/memory.js"></script>
  </head>
  <body onload="memory()">
  <?php include("../menu.php"); ?> <!-- edited -->
    <div class="contentOuter">
      <div class="content">
        <h1>Memory</h1>
        <p>This page uses HTML, CSS, JavaScript, PHP and a little bit Ajax, jquery and Json.</p>
        <canvas id="mycanvas" width="611" height="611"></canvas>
        <h2>How to play:</h2>
        <p>Find pairs of cards. You can look at a maximum of two card at the time.</p>
        <h2>Best score reported by server</h2>
        <p id="bestscore">best score</p>
      </div>
    </div>
  </body>
</html>