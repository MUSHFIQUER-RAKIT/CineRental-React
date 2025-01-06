<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include 'config.php'; // Ensure this includes the database connection

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    //validation for login input
    if (!$email || !$password) {
        $response = [
            'status' => 'error',
            'message' => 'Email and Password are required.'
        ];
        echo json_encode($response);
        exit;
    }

    // Sanitize inputs
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);

    // Query to check if the user exists and password matches
    $query = "SELECT * FROM registration WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        $response = [
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'firstName' => $user['firstName'],
                'lastName' => $user['lastName'],
                'email' => $user['email']
            ]
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Invalid email or password.'
        ];
    }

    $conn->close();
}

echo json_encode($response);
?>
