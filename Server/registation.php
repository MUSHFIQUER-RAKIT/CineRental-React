<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include 'config.php';

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $firstName = $data['firstName'] ?? null;
    $lastName = $data['lastName'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    $query = "INSERT INTO registration (firstName, lastName, email, password) VALUES ('$firstName', '$lastName', '$email', '$password')";

        // Execute the query and check for success
        if (mysqli_query($conn, $query)) {
            $response = [
                'status' => 'success',
                'message' =>  'New user registered successfully',
                'data' => [
                    'firstName' => $firstName,
                    'lastName' => $lastName,
                    'email' => $email
                ]
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Database error: ' . mysqli_error($conn)
            ];
        }

    $conn->close();
}

echo json_encode($response);
?>
