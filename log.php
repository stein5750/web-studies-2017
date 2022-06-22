<!doctype html>
<html>
  <head>
    <title>Log</title>
    <meta charset='utf-8'>
    <meta name="robots" content="noindex, nofollow">
    <meta name="keywords" content="log, ip">
    <meta name="description" content="IP log">
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <?php include("menu.php"); ?>
    <div class="contentOuter">
      <div class="content">
        <h1>IP log</h1>
        <p>
          Tid, IP, nettside
        </p>
        <p>
          <?php include("logfile.php"); ?>
        </p>
      </div>
    </div>
  </body>
</html>
