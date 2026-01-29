<title>Recipeer - Login</title>

<?php 
include "include/start.php";
include "include/connection.php";

$errore = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (!$email || !$password) {
        $errore = "Inserisci email e password";
    } else {
        $stmt = $pdo->prepare("SELECT * FROM Utenti WHERE Email = ?");
        $stmt->execute([$email]);
        $utente = $stmt->fetch();

        if (!$utente) {
            $errore = "Email non trovata";
        } else {
            if (!password_verify($password, $utente['Password'])) {
                $errore = "Password sbagliata";
            } else {
                $_SESSION['utente_id'] = $utente['IDUtente'];
                header("Location: Home.html");
                exit;
            }
        }
    }
}
?>

<h2 style="text-align: center">Login</h2><br>

<?php if ($errore): ?>
    <p style="color:red;"><?php echo $errore; ?></p>
<?php endif; ?>

<form method="post">
    <input type="email" name="email" placeholder="Email" class="input" required><br><br><br>
    <input type="password" name="password" placeholder="Password" class="input" required><br><br><br>
    <div style="display: flex; gap: 10px;">
        <button type="submit" class="btn-login">Entra</button>
        <button type="button" class="btn-registrati" onclick="window.location='Registrazione.php'">Registrati</button>
    </div>
</form>

<?php include "include/over.php"; ?>
