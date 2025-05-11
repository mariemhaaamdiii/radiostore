<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    $stmt = $pdo->prepare('SELECT * FROM dmj WHERE email_dmj = ? AND mot_de_passe_dmj = ?');
    $stmt->execute([$email, $password]);
    $user = $stmt->fetch();
    
    if ($user) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['dmj_id'],
                'email' => $user['email_dmj'],
                'nom' => $user['nom_dmj'],
                'prenom' => $user['prenom_dmj'],
                'role' => 'dmj'
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
}