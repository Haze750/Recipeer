// Effetto hover su pulsanti e daily dishes
document.querySelectorAll('.square-button, .user-button, .dish-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Effetto di rimbalzo al click sui pulsanti del menu
document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('bounce');
        
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.classList.add('active');
        
        // Rimuovi la classe di bounce dopo l'animazione
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 400);
        
        // Gestione reindirizzamento per il pulsante Ricettario
        if (this.id === 'homeButton') {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        }
        if (this.id === 'bookButton') {
            setTimeout(() => {
                window.location.href = 'Riccetario.html';
            }, 300);
        }
        if (this.id === 'cameraButton') {
            setTimeout(() => {
                window.location.href = 'Scansione.html';
            }, 300);
        }
        
        // Al momento non eseguiamo altre azioni per gli altri pulsanti
        console.log(`Hai cliccato il pulsante: ${this.getAttribute('data-action')}`);
    });
});

// Effetto di rimbalzo ridotto per il pulsante utente
document.getElementById('userButton').addEventListener('click', function() {
    this.classList.add('bounce');
    setTimeout(() => {
        this.classList.remove('bounce');
    }, 400);
    console.log('Profilo utente');
});

// Funzione per aggiornare le ricette nei daily dishes
function updateDishes(dishesType) {
    const dishCards = document.querySelectorAll('.dish-card');
    const dishesContainer = document.querySelector('.daily-dishes-container');
    
    // Array di ricette per piatti principali
    const mainDishes = [
        {
            icon: 'fas fa-mortar-pestle',
            title: 'Pasta al Pomodoro Fresco',
            description: 'Una ricetta classica italiana con pomodori freschi, basilico e aglio. Perfetta per un pranzo veloce ma gustoso. Preparazione in soli 20 minuti.'
        },
        {
            icon: 'fas fa-leaf',
            title: 'Insalata di Quinoa e Avocado',
            description: 'Un\'insalata ricca di proteine e grassi sani, perfetta per un pasto nutriente e bilanciato. Ideale per chi segue una dieta vegana.'
        },
        {
            icon: 'fas fa-fish',
            title: 'Salmone al Forno con Verdure',
            description: 'Salmone cotto al forno con patate e zucchine, un piatto ricco di omega-3 e sapori mediterranei. Cottura totale: 30 minuti.'
        }
    ];
    
    // Array di ricette per dessert 
    const desserts = [
        {
            icon: 'fas fa-wine-glass-alt',
            title: 'Tiramisù Classico',
            description: 'Il famoso dolce italiano a strati con savoiardi, caffè, mascarpone e cacao. Perfetto per concludere un pasto.'
        },
        {
            icon: 'fas fa-ice-cream',
            title: 'Gelato alla Vaniglia',
            description: 'Gelato artigianale alla vaniglia con granella di nocciole. Fresco e cremoso, ideale per le giornate calde.'
        },
        {
            icon: 'fas fa-cookie-bite',
            title: 'Cheesecake ai Frutti di Bosco',
            description: 'Torta di formaggio con base di biscotti e topping di frutti di bosco freschi. Dolce ma non troppo.'
        }
    ];
    
    // Scegli l'array corretto in base al tipo
    const dishesArray = dishesType === 'mainDishes' ? mainDishes : desserts;
    
    // Gestisci la classe dessert-mode per il colore di sfondo
    if (dishesType === 'desserts') {
        dishesContainer.classList.add('dessert-mode');
    } else {
        dishesContainer.classList.remove('dessert-mode');
    }
    
    // Aggiorna ogni card con i nuovi dati
    dishCards.forEach((card, index) => {
        if (dishesArray[index]) {
            const dishIcon = card.querySelector('.dish-icon i');
            const dishTitle = card.querySelector('.dish-title');
            const dishDescription = card.querySelector('.dish-description');
            
            dishIcon.className = dishesArray[index].icon;
            dishTitle.textContent = dishesArray[index].title;
            dishDescription.textContent = dishesArray[index].description;
        }
    });
}

// Inizializza la pagina quando è pronta
document.addEventListener('DOMContentLoaded', function() {
    console.log('Benvenuto su Recipeer!');
    
    // Gestione dei pulsanti di filtro nella Home page
    const mainDishesBtn = document.getElementById('mainDishes');
    const dessertsBtn = document.getElementById('desserts');
    
    if (mainDishesBtn && dessertsBtn) {
        // Imposta il pulsante mainDishes come attivo all'inizio
        mainDishesBtn.classList.add('active');
        
        const dishesContainer = document.querySelector('.daily-dishes-container');
        if (dishesContainer) {
            dishesContainer.classList.remove('dessert-mode');
        }
        
        // Gestione click su mainDishes
        mainDishesBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Rimuovi active da entrambi i pulsanti
                mainDishesBtn.classList.remove('active');
                dessertsBtn.classList.remove('active');
                
                // Aggiungi active al pulsante cliccato
                this.classList.add('active');
                
                // Aggiorna le ricette con piatti principali
                updateDishes('mainDishes');  
                console.log('Visualizza piatti principali');
            }
        });
        
        // Gestione click su desserts
        dessertsBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Rimuovi active da entrambi i pulsanti
                mainDishesBtn.classList.remove('active');
                dessertsBtn.classList.remove('active');
                
                // Aggiungi active al pulsante cliccato
                this.classList.add('active');
                
                // Aggiorna le ricette con dessert
                updateDishes('desserts');
                
                console.log('Visualizza dessert');
            }
        });
    }
});

// Effetto di rimbalzo per i square-button
document.querySelectorAll('.square-button').forEach(button => {
    button.addEventListener('click', function() {
        // Non applicare l'effetto bounce ai pulsanti di filtro mainDishes e desserts
        // perché hanno già il loro effetto di stato attivo
        if (this.id !== 'mainDishes' && this.id !== 'desserts') {
            this.classList.add('bounce');
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 400);

            if (this.id === 'refreshButton') {
                console.log('Ricetta aggiornata');
            } else if (this.id === 'shareButton') {
                console.log('Condividi ricetta');
            }
        }
    });
});

// Effetto di click sui daily dishes (0.3 secondi)
document.querySelectorAll('.dish-card').forEach(dish => {
    dish.addEventListener('click', function() {
        // Rimuoviamo la classe se già presente (per resettare l'animazione)
        this.classList.remove('clicked');
        
        // Forziamo un reflow per permettere all'animazione di ripartire
        void this.offsetWidth;
        
        // Aggiungiamo la classe per attivare l'animazione
        this.classList.add('clicked');
        
        // Dopo 0.3 secondi, rimuoviamo la classe
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        // Log per debug
        console.log(`Hai cliccato su: ${this.querySelector('.dish-title').textContent}`);
    });
});


/*------------------------------------------------------------------------------------------------------------------
js specifico per ricettario.html
-------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se siamo nella pagina Ricettario
    if (document.querySelector('.ricettario-container')) {
        console.log('Benvenuto nel Ricettario!');
        
        // Effetto click sui card del ricettario
        document.querySelectorAll('.ricettario-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.remove('clicked');
                void this.offsetWidth;
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
                
                console.log(`Hai cliccato su: ${this.querySelector('.ricettario-title').textContent}`);
            });
        });
        
        // Gestione pulsanti specifici del ricettario
        const filterButton = document.getElementById('filterButton');
        const searchButton = document.getElementById('searchButton');
        
        if (filterButton) {
            filterButton.addEventListener('click', function() {
                this.classList.add('bounce');
                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 400);
                console.log('Filtra ricette');
            });
        }
        
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                this.classList.add('bounce');
                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 400);
                console.log('Cerca ricette');
            });
        }
        
        // Gestione reindirizzamento per il pulsante Home nel Ricettario
        const homeButton = document.getElementById('homeButton');
        if (homeButton) {
            homeButton.addEventListener('click', function() {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            });
        }
    }
});


/*------------------------------------------------------------------------------------------------------------------
js specifico per scansiona.html
-------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
console.log('Pagina Scansione caricata');

let html5QrCode;
let scansioneAttiva = false;

// Elementi DOM
const uploadBtn = document.getElementById('uploadBtn');
const scansioneStatus = document.getElementById('scansioneStatus');
const risultatoScansione = document.getElementById('risultatoScansione');
const risultatoTesto = document.getElementById('risultatoTesto');
const storiaButton = document.getElementById('storiaButton');

// Configurazione scanner
const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
};

// Inizializza scanner
html5QrCode = new Html5Qrcode("reader");

// Funzione per avviare la scansione (automatica)
function avviaScansione() {
    if (scansioneAttiva) return;
    
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            // Usa la fotocamera posteriore se disponibile
            let cameraId = devices[0].id;
            const backCamera = devices.find(device => 
                device.label.toLowerCase().includes('back') || 
                device.label.toLowerCase().includes('rear'));
            
            if (backCamera) {
                cameraId = backCamera.id;
            }
            
            html5QrCode.start(
                cameraId,
                config,
                onScanSuccess,
                onScanFailure
            ).then(() => {
                scansioneAttiva = true;
                scansioneStatus.style.display = 'flex';
                console.log('Scansione avviata automaticamente');
            }).catch(err => {
                console.error("Errore nell'avviare la scansione:", err);
                alert("Impossibile accedere alla fotocamera. Controlla i permessi.");
            });
        } else {
            alert("Nessuna fotocamera trovata sul dispositivo.");
        }
    }).catch(err => {
        console.error("Errore nel recuperare le fotocamere:", err);
        alert("Errore nell'accesso alla fotocamera.");
    });
}

// Funzione per fermare la scansione (solo per cambio pagina)
function fermaScansione() {
    if (!scansioneAttiva) return;
    
    html5QrCode.stop().then(() => {
        scansioneAttiva = false;
        scansioneStatus.style.display = 'none';
        console.log('Scansione fermata');
    }).catch(err => {
        console.error("Errore nel fermare la scansione:", err);
    });
}

// Callback per scansione riuscita
function onScanSuccess(decodedText, decodedResult) {
    console.log(`Codice scansionato: ${decodedText}`);
    
    // Mostra il risultato
    risultatoTesto.textContent = decodedText;
    risultatoScansione.style.display = 'block';
    
    // Simula ricerca ricette dal codice a barre
    setTimeout(() => {
        simulaRicercaRicette(decodedText);
    }, 1000);
    
    // La scansione rimane attiva automaticamente per la prossima scansione
    console.log('Scansione pronta per il prossimo codice');
}

// Callback per errore di scansione
function onScanFailure(error) {
    // Gli errori comuni sono ignorati (es: nessun codice trovato)
    console.warn(`Errore scansione: ${error}`);
}

// Funzione per caricare immagine
uploadBtn.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            html5QrCode.scanFile(file, true)
                .then(decodedText => {
                    onScanSuccess(decodedText, {});
                })
                .catch(err => {
                    console.error("Errore nella scansione dell'immagine:", err);
                    alert("Impossibile leggere il codice a barre dall'immagine.");
                });
        }
    };
    
    input.click();
});

// Pulsante cronologia
if (storiaButton) {
    storiaButton.addEventListener('click', function() {
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 400);
        
        // Simula visualizzazione cronologia
        risultatoTesto.innerHTML = `
            <strong>Cronologia Scansioni:</strong><br><br>
            <div style="background: #f5f5f5; padding: 10px; border-radius: 8px; margin: 5px 0;">
                <strong>Pasta Barilla</strong><br>
                Codice: 8000500310427<br>
                Scansione: 5 minuti fa
            </div>
            <div style="background: #f5f5f5; padding: 10px; border-radius: 8px; margin: 5px 0;">
                <strong>Olio Extra Vergine</strong><br>
                Codice: 8001090310014<br>
                Scansione: 2 ore fa
            </div>
            <div style="background: #f5f5f5; padding: 10px; border-radius: 8px; margin: 5px 0;">
                <strong>Parmigiano Reggiano</strong><br>
                Codice: 8017716000855<br>
                Scansione: 1 giorno fa
            </div>
        `;
        risultatoScansione.style.display = 'block';
        
        console.log('Cronologia scansioni');
    });
}

// Gestione reindirizzamento per il pulsante Home
const homeButton = document.getElementById('homeButton');
if (homeButton) {
    homeButton.addEventListener('click', function() {
        // Ferma la scansione prima di uscire
        if (scansioneAttiva) {
            fermaScansione();
        }
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    });
}

// Gestione reindirizzamento per il pulsante Ricettario
const bookButton = document.getElementById('bookButton');
if (bookButton) {
    bookButton.addEventListener('click', function() {
        // Ferma la scansione prima di uscire
        if (scansioneAttiva) {
            fermaScansione();
        }
        setTimeout(() => {
            window.location.href = 'Riccetario.html';
        }, 300);
    });
}

// Avvia automaticamente la scansione al caricamento della pagina
setTimeout(avviaScansione, 500);

// Funzione globale per vedere ricette
window.vediRicette = function(codice) {
    alert(`Verrai reindirizzato alle ricette per il prodotto con codice: ${codice}\n\nIn una versione futura, questo pulsante mostrerà ricette specifiche per il prodotto scansionato.`);
    // Qui potresti reindirizzare a una pagina di ricette specifica
    // window.location.href = `Ricette.html?codice=${codice}`;
};

// Pulisci la scansione quando si esce dalla pagina
window.addEventListener('beforeunload', function() {
    if (scansioneAttiva) {
        fermaScansione();
    }
});
});

