<?php
// 1. CORS Headers (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight browser requests safely
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 2. Database Connection Credentials
$host = "127.0.0.1";
$db_name = "restaurant_hr";
$username = "root";
$password = ""; // Default XAMPP installation has no password

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $exception->getMessage()]);
    exit();
}

// 3. Handle Incoming Requests based on Request Method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // FETCH ALL EMPLOYEES
    $query = "SELECT * FROM employees ORDER BY id DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($employees);
} 
elseif ($method === 'POST') {
    // ADD NEW EMPLOYEE
    $inputData = json_decode(file_get_contents("php://input"), true);
    
    if (!empty($inputData['name'])) {
        $query = "INSERT INTO employees (name, role, department, status) VALUES (:name, :role, :department, 'Active')";
        $stmt = $conn->prepare($query);
        
        $stmt->bindParam(':name', $inputData['name']);
        $stmt->bindParam(':role', $inputData['role']);
        $stmt->bindParam(':department', $inputData['department']);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["id" => $conn->lastInsertId(), "message" => "Staff member recorded successfully."]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to insert staff member record."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Data incomplete. Missing employee name field."]);
    }
}
elseif ($method === 'DELETE') {
    // REMOVE AN EMPLOYEE RECORD
    if (isset($_GET['id'])) {
        $employee_id = $_GET['id'];
        
        $query = "DELETE FROM employees WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $employee_id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Staff member record purged successfully."]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Unable to complete deletion request."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Bad Request. Missing target employee ID parameter."]);
    }
}
?>
