<?php
session_start(); 
include "include/connection.php"; 

// Recupera dati utente
$stmt = $pdo->prepare("SELECT Nome, Cognome, Email, Indirizzo, NumeroTelefono, Provenienza FROM Utenti WHERE IDUtente = ?");
$stmt->execute([$_SESSION['utente_id']]);
$utente = $stmt->fetch(PDO::FETCH_ASSOC);

// Se l'utente non esiste (raro), distruggi sessione e rimanda al login
if (!$utente) {
    session_destroy();
    header("Location: userPrivacy/Login.php");
    exit;
}

// Assegna variabili 
$nome       = htmlspecialchars($utente['Nome'] ?? '', ENT_QUOTES, 'UTF-8');
$cognome    = htmlspecialchars($utente['Cognome'] ?? '', ENT_QUOTES, 'UTF-8');
$email      = htmlspecialchars($utente['Email'] ?? '', ENT_QUOTES, 'UTF-8');
$indirizzo  = htmlspecialchars($utente['Indirizzo'] ?? '', ENT_QUOTES, 'UTF-8');
$telefono   = htmlspecialchars($utente['NumeroTelefono'] ?? '', ENT_QUOTES, 'UTF-8');
$provenienza= htmlspecialchars($utente['Provenienza'] ?? '', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipeer - Profilo Utente</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="Style.css"> 
    <link rel="stylesheet" href="userPrivacy/Privacy.css">     
</head>

<body class="user-space-body">
    <div class="header">
        <button class="user-button" id="userButton">
            <i class="fas fa-user"></i>
        </button>
        <h1 class="logo">Recipeer</h1>
    </div>

    <div class="main-content">
        <div class="daily-recipe-section">
            <div class="section-header"> 
                <h2 class="section-title">Profilo Utente</h2>
                <button class="settings-button" id="settingsButton" onclick="window.location.href='impostazioni.html'">
                    <i class="fas fa-cog"></i>
                </button>
            </div>
        </div>

        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-circle">
                    <?php echo strtoupper(substr($nome, 0, 1) ?: 'U'); ?>
                </div>
                <div class="subscription-badge">
                    <h3>Diventa Procipeer</h3>
                    <button class="premium-button" onclick="window.location.href='abbonamenti.html'">
                        <i class="fas fa-crown"></i>
                        Premium
                    </button>
                </div>
            </div>
            
            <div class="profile-info">
                <!-- Sezione informazioni personali -->
                <div class="info-section" id="personal-info">
                    <div class="section-title-row">
                        <h4>Informazioni Personali</h4>
                    </div>
                    
                    <div class="info-row" data-field="nome">
                        <span class="info-label">Nome:</span>
                        <input type="text" class="input-field" value="<?php echo $nome; ?>" readonly>
                    </div>
                    
                    <div class="info-row" data-field="cognome">
                        <span class="info-label">Cognome:</span>
                        <input type="text" class="input-field" value="<?php echo $cognome; ?>" readonly>
                    </div>
                    
                    <div class="info-row" data-field="email">
                        <span class="info-label">Email:</span>
                        <input type="email" class="input-field" value="<?php echo $email; ?>" readonly>
                    </div>
                    
                    <div class="profile-actions">
                        <button class="action-button edit-password-btn">
                            <i class="fas fa-key"></i>
                            Modifica password
                        </button>
                    </div>
                </div>
                
                <!-- Sezione informazioni di contatto -->
                <div class="info-section" id="contact-info">
                    <div class="section-title-row">
                        <h4>Informazioni di Contatto</h4>
                    </div>
                    
                    <div class="info-row" data-field="indirizzo">
                        <span class="info-label">Indirizzo:</span>
                        <input type="text" class="input-field" value="<?php echo $indirizzo; ?>" readonly>
                    </div>
                    
                    <div class="info-row" data-field="telefono">
                        <span class="info-label">Numero di Telefono:</span>
                        <input type="tel" class="input-field" value="<?php echo $telefono; ?>" readonly>
                    </div>
                    
                    <div class="info-row" data-field="provenienza">
                        <span class="info-label">Provenienza:</span>
                        <input type="text" class="input-field" value="<?php echo $provenienza; ?>" readonly>
                    </div>
                </div>
                
                <!-- Sezione azioni account -->
                <div class="info-section">
                    <h4>Gestione Account</h4>
                    
                    <div class="profile-actions">
                        <button class="action-button logout-btn">
                            <i class="fas fa-sign-out-alt"></i>
                            Log out
                        </button>
                        
                        <button class="action-button delete-account-btn">
                            <i class="fas fa-trash-alt"></i>
                            Elimina account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="menu-bar">
        <button class="menu-button" id="homeButton" data-action="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </button>
        <button class="menu-button" id="bookButton" data-action="book">
            <i class="fas fa-book"></i>
            <span>Ricettario</span>
        </button>
        <button class="menu-button" id="cameraButton" data-action="camera">
            <i class="fas fa-camera"></i>
            <span>Scansione</span>
        </button>
        <button class="menu-button" id="heartButton" data-action="heart">
            <i class="fas fa-heart"></i>
            <span>Preferiti</span>
        </button>
    </div>

    <script src="Script.js"> </script>
</body>
</html>