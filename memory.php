<?php include("logit.php"); ?>

<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <meta name="robots" content="noindex, nofollow">
    <meta name="keywords" content="HTML, CSS, JavaScript, PHP">
    <meta name="description" content="A game written in HTML,CSS,JavaScript and PHP">
    <title>Memory</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="memory/memoryGraphics.js"></script>
    <script type="text/javascript" src="memory/memoryCards.js"></script>
    <script type="text/javascript" src="memory/memory.js"></script>
  </head>
  <body onload="memory()">
    <?php include("menu.php"); ?>
    <div class="contentOuter">
      <div class="content">
        <h1>Memory</h1>
        <p> This page uses HTML, CSS, JavaScript, PHP and a little AJAX & JSON.</p>
        <canvas id="mycanvas" width="611" height="611"></canvas>
        <h2>How to play:</h2>
        <p>Find pairs of cards. You can look at a maximum of two card at the time.</p>
        <h2>Best score reported by server</h2>
        <p id="bestscore">best score</p>
      </div>
    </div>
  </body>
</html>
