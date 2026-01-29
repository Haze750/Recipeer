<title>Recipeer - Registrazione</title>

<?php 
include "include/start.php";
include "include/connection.php";

$errore = '';
$successo = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = trim($_POST['nome'] ?? '');
    $cognome = trim($_POST['cognome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $password2 = trim($_POST['password2'] ?? '');
    $indirizzo = trim($_POST['indirizzo'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $provenienza = trim($_POST['provenienza'] ?? '');

    // Controlli basilari
    if (empty($nome) || empty($cognome) || empty($email) || empty($password) || empty($indirizzo) || empty($telefono) || empty($provenienza)) {
        $errore = "Compila tutti i campi obbligatori";
    } elseif ($password !== $password2) {
        $errore = "Le password non corrispondono";
    } elseif (strlen($password) < 6) {
        $errore = "La password deve avere almeno 6 caratteri";
    } else {
        // Controlla se email esiste già
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM Utenti WHERE Email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetchColumn() > 0) {
            $errore = "Email già registrata";
        } else {
            // Hash e salva utente
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO Utenti (Nome, Cognome, Email, Password, Indirizzo, NumeroTelefono, Provenienza) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?)");
            if ($stmt->execute([$nome, $cognome, $email, $hash, $indirizzo, $telefono, $provenienza])) {
                $successo = "Registrazione completata! Ora puoi fare login.";
            } else {
                $errore = "Errore durante la registrazione: " . implode(", ", $stmt->errorInfo());
            }
        }
    }
}
?>

<h2 style="text-align: center;">Registrati a Recipeer</h2>

<?php if ($errore): ?>
    <p style="color:red;"><?php echo $errore; ?></p>
<?php endif; ?>

<?php if ($successo): ?>
    <p style="color:green;"><?php echo $successo; ?></p>
    <p><a href="login.php">Vai al login</a></p>
<?php else: ?>

<form method="post">
    <input type="text" name="nome" placeholder="Nome" class="input" required><br><br>
    <input type="text" name="cognome" placeholder="Cognome" class="input" required><br><br>
    <input type="email" name="email" placeholder="Email" class="input" required><br><br>
    <input type="password" name="password" placeholder="Password" class="input" required><br><br>
    <input type="password" name="password2" placeholder="Ripeti password" class="input" required><br><br>
    <input type="text" name="indirizzo" placeholder="Indirizzo" class="input" required><br><br>
    <input type="tel" name="telefono" placeholder="Numero di telefono" class="input" required><br><br>
    <input type="text" name="provenienza" placeholder="Provenienza" class="input" required><br><br><br>
    <button type="submit" class="btn">Registrati</button>
</form>

<?php endif; ?>

<?php include "include/over.php"; ?>
