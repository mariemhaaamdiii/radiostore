<?php
require_once 'config.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM categorie');
        $categories = $stmt->fetchAll();
        echo json_encode($categories);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO categorie (nom_categorie) VALUES (?)');
        $stmt->execute([$data['name']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;
}