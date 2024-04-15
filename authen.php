<?php      
include('connection.php');  

$username = $_POST['user'];  
$password = $_POST['pass'];  

$username = stripcslashes($username);  
$password = stripcslashes($password);  
$username = mysqli_real_escape_string($con, $username);  

$key = 3; 

$encrypted_password = caesarEncrypt($password, $key);

$sql = "SELECT password FROM users WHERE username = '$username'";
$result = mysqli_query($con, $sql);  
$row = mysqli_fetch_assoc($result);
$hashed_password_st = $row['password'];

if($encrypted_password === $hashed_password_st) {

    $checkTableSql = "SHOW TABLES LIKE '$username'";
    $tableResult = mysqli_query($con, $checkTableSql);
    if(mysqli_num_rows($tableResult) == 0) {
        $createTableSql = "CREATE TABLE `$username` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tasks TEXT(50),
            att3 VARCHAR(255),
            att4 VARCHAR(255)
        )";
        mysqli_query($con, $createTableSql);
    }

    header("Location: index.html"); 

    $insert_sql = "
    INSERT INTO logged_in_user (username, time, att3, att4)
    VALUES ('$username', NOW(), 'null', 'null')";
    $result1 = mysqli_query($con, $insert_sql);  
    exit();
} else {
    echo "<h1> Login failed. Invalid username or password.</h1>";  
}

function caesarEncrypt($str, $key) {
    $result = '';

    for ($i = 0; $i < strlen($str); $i++) {
        $char = $str[$i];

        if (ctype_upper($char)) {
            $result .= chr((ord($char) + $key - 65) % 26 + 65);
        } 
        else if (ctype_lower($char)) {
            $result .= chr((ord($char) + $key - 97) % 26 + 97);
        } 
        else {
            $result .= $char;
        }
    }

    return $result;
}
?>
