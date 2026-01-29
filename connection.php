<?php
// connessione.php - Configurazione e connessione al database

$host = 'localhost';          // di solito localhost
$dbname = 'recipeer';         // nome del tuo database
$username = 'root';           // utente MySQL (cambia se usi altro)
$password = '';               // password MySQL (vuota se usi root senza pass)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Errore di connessione al database: " . $e->getMessage());
}
?>
