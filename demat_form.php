<?php
session_start();
if (!isset($_SESSION['customer'])) {
    header("Location: login.php");
    exit();
}
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $customer_id = $_SESSION['customer_id']; // Assume customer_id is stored in session
    $certificate_number = $_POST['certificate_number'];
    $company_name = $_POST['company_name'];
    $number_of_shares = $_POST['number_of_shares'];
    $drf_number = $_POST['drf_number'];

    $sql = "INSERT INTO certificates (customer_id, certificate_number, company_name, number_of_shares, drf_number) 
            VALUES ('$customer_id', '$certificate_number', '$company_name', '$number_of_shares', '$drf_number')";

    if ($conn->query($sql) === TRUE) {
        header("Location: success.php");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Demat Form</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="form-container">
        <form method="post" action="">
            <h2>Demat Form</h2>
            <input type="text" name="certificate_number" placeholder="Certificate Number" required>
            <input type="text" name="company_name" placeholder="Company Name"
