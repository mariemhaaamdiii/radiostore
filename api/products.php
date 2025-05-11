<?php
require_once 'config.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT p.*, c.nom_categorie FROM produit p LEFT JOIN categorie c ON p.categorie_id = c.categorie_id');
        $products = $stmt->fetchAll();
        echo json_encode($products);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO produit (nom_produit, description, prix, image_url, categorie_id) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['price'],
            $data['imageUrl'],
            $data['categoryId']
        ]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;
        
    case 'PUT':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            break;
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE produit SET nom_produit = ?, description = ?, prix = ?, image_url = ?, categorie_id = ? WHERE produit_id = ?');
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['price'],
            $data['imageUrl'],
            $data['categoryId'],
            $id
        ]);
        echo json_encode(['success' => true]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            break;
        }
        
        $stmt = $pdo->prepare('DELETE FROM produit WHERE produit_id = ?');
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
}