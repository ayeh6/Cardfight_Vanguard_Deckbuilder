<?php
$conn = mysqli_connect("localhost","root","","vanguard_test");

if($conn->connect_error) {
    die("connection failed: " . $conn->connect_error);
}
else {
    echo "Connected successfully";
}
?>