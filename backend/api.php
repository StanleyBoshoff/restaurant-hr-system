<?php
// 1. CORS Headers (Cross-Origin Resource Sharing)
// This is critical! By default, browsers block React (running on port 5173) from talking to XAMPP (running on port 80).
// These headers tell the browser that our React frontend is legally allowed to access this data safely.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
    // We use PDO (PHP Data Objects) because it is highly secure against SQL injection attacks
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    // If connection fails, send a 500 error response back to React
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $exception->getMessage()]);
    exit();
}

// 3. Handle Incoming Requests based on Request Method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // FETCH EMPLOYEES
    $query = "SELECT * FROM employees ORDER BY id DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    // Fetch all results as an associative array
    $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Send the array out over the wire translated into standard JSON text strings
    echo json_encode($employees);
} 
elseif ($method === 'POST') {
    // ADD NEW EMPLOYEE
    // Read the raw JSON payload coming from React's form submission
    $inputData = json_decode(file_get_contents("php://input"), true);
    
    if (!empty($inputData['name'])) {
        $query = "INSERT INTO employees (name, role, department, status) VALUES (:name, :role, :department, 'Active')";
        $stmt = $conn->prepare($query);
        
        // Bind parameters securely to neutralize malicious input strings
        $stmt->bindParam(':name', $inputData['name']);
        $stmt->bindParam(':role', $inputData['role']);
        $stmt->bindParam(':department', $inputData['department']);
        
        if ($stmt->execute()) {
            http_response_code(201); // 201 means "Created Successfully"
            // Return the newly created record ID so React can use it
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
?>
