<?php
$file = 'logfile.php'; # Write log to this file
$time = date( 'Y-m-d H:i:s'); # Time in the form yyyy-mm-dd hh:mm:ss
$ip = $_SERVER[ 'REMOTE_ADDR']; # Ip adress to log
$page = $_SERVER[ 'SCRIPT_NAME']; # The webpage to log
$f = fopen( $file, 'a'); # Open file as appendable
fwrite( $f, "$time   $ip   $page<br>\n"); # Append time, ip and webpage to file
fclose($f); # Close the file
?>
