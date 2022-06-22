<?php header('Content-type: text/plain; charset=utf-8');
# returns old highscore and stores new highscore
$storedScore = 200; # default if it has never been set before.
$isNewRecord = false;

# open file if it exits and get saved higscore
$filename = 'data/memoryHighscore.dat';

if(file_exists ( $filename)){
    $file = fopen( $filename, 'r');
    $storedScore = fgets( $file); # read first line
    fclose( $file);
}
else{
    # if the file does not exist, then save a default higscore value to file
    $file = fopen( $filename, 'w');
    fwrite( $file, "200");
    fclose( $file);
}


# if data is recieved by POST, check data and store it if it's a new higscore
if(isset( $_POST['score'])) {
    $score = $_POST['score'];
    #reject if lenght is more than 3
    if ( strlen( $score) > 3) exit( 'Invalid parameter');
    #reject if score is no digits
    if ( !preg_match( '/^\d+$/', $score)) exit( 'Invalid parameter');
    ## In this game lower score is better!
    ## write new higscore to file and set newRecord = true
    if ( (int)$score < (int)$storedScore){ # cast to int, else they are compared as strings and 2 is greater than 10
        $file = fopen( $filename, 'w');
        fwrite( $file, "$score");
        fclose( $file);
        $isNewRecord = true;
    }
}

# Output
$arr = array( $isNewRecord, $storedScore);
echo json_encode( $arr);
?>