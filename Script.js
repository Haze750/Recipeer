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
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 400);
        

        // Gestione reindirizzamento per il pulsante Ricettario
        if (this.id === 'homeButton') {
            setTimeout(() => {
                window.location.href = 'Home.html';
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
        if (this.id === 'heartButton') {
            setTimeout(() => {
                window.location.href = 'Preferiti.html';
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
        window.location.href = "userSpace.html";
    }, 400);
    console.log('Profilo utente');
});

/*-----------------------------------------------------------------------------------------------------------------
funzione per gestire il pulsante add to favorite
------------------------------------------------------------------------------------------------------------------*/ 
const favoritesKey = 'recipeer_favorites';

// Funzione per ottenere i preferiti dal localStorage
function getFavorites() {
    const favorites = localStorage.getItem(favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
}

// Funzione per salvare i preferiti nel localStorage
function saveFavorites(favorites) {
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

// Funzione per aggiungere/rimuovere dai preferiti
// Modifica la funzione toggleFavorite per includere il tipo di piatto
function toggleFavorite(recipeId, dishType) {
    const favorites = getFavorites();
    
    // Crea un ID unico combinando recipeId e dishType
    const uniqueId = `${recipeId}_${dishType}`;
    const index = favorites.indexOf(uniqueId);
    
    if (index === -1) {
        // Aggiungi ai preferiti
        favorites.push(uniqueId);
        console.log(`Ricetta ${uniqueId} aggiunta ai preferiti`);
    } else {
        // Rimuovi dai preferiti
        favorites.splice(index, 1);
        console.log(`Ricetta ${uniqueId} rimossa dai preferiti`);
    }
    
    saveFavorites(favorites);
    updateFavoriteButtons();
    return favorites.includes(uniqueId);
}

// Funzione per aggiornare lo stato dei pulsanti preferiti
function updateFavoriteButtons() {
    const favorites = getFavorites();
    
    // Aggiorna i pulsanti nella Home page
    document.querySelectorAll('.addToFavorite').forEach(button => {
        const recipeId = button.getAttribute('data-id');
        const dishCard = button.closest('.dish-card');
        const isDessertMode = dishCard.closest('.daily-dishes-container').classList.contains('dessert-mode');
        const dishType = isDessertMode ? 'dessert' : 'main';
        const uniqueId = `${recipeId}_${dishType}`;
        
        if (favorites.includes(uniqueId)) {
            button.classList.add('favorite');
            button.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            button.classList.remove('favorite');
            button.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

// Funzione per ottenere i dati di una ricetta dal suo ID
function getRecipeData(recipeId) {
    // Dati delle ricette principali
    const mainDishes = [
        {
            id: "1",
            icon: "fas fa-mortar-pestle",
            title: "Pasta al Pomodoro Fresco",
            description: "Una ricetta classica italiana con pomodori freschi, basilico e aglio. Perfetta per un pranzo veloce ma gustoso. Preparazione in soli 20 minuti.",
            difficulty: "Easy",
            type: "Flour"
        },
        {
            id: "2", 
            icon: "fas fa-leaf",
            title: "Insalata di Quinoa e Avocado",
            description: "Un'insalata ricca di proteine e grassi sani, perfetta per un pasto nutriente e bilanciato. Ideale per chi segue una dieta vegana.",
            difficulty: "Medium",
            type: "Vegetable"
        },
        {
            id: "3",
            icon: "fas fa-fish",
            title: "Salmone al Forno con Verdure",
            description: "Salmone cotto al forno con patate e zucchine, un piatto ricco di omega-3 e sapori mediterranei. Cottura totale: 30 minuti.",
            difficulty: "Medium", 
            type: "Seafood"
        }
    ];
    
    // Dati dei dessert
    const desserts = [
        {
            id: "1",
            icon: "fas fa-wine-glass-alt",
            title: "Tiramisù Classico",
            description: "Il famoso dolce italiano a strati con savoiardi, caffè, mascarpone e cacao. Perfetto per concludere un pasto.",
            difficulty: "Medium",
            type: "Dessert"
        },
        {
            id: "2",
            icon: "fas fa-ice-cream",
            title: "Gelato alla Vaniglia",
            description: "Gelato artigianale alla vaniglia con granella di nocciole. Fresco e cremoso, ideale per le giornate calde.",
            difficulty: "Easy",
            type: "Dessert"
        },
        {
            id: "3",
            icon: "fas fa-cookie-bite",
            title: "Cheesecake ai Frutti di Bosco",
            description: "Torta di formaggio con base di biscotti e topping di frutti di bosco freschi. Dolce ma non troppo.",
            difficulty: "Hard",
            type: "Dessert"
        }
    ];
    
    // Cerca nelle ricette principali
    const mainDish = mainDishes.find(dish => dish.id === recipeId);
    if (mainDish) return mainDish;
    
    // Cerca nei dessert
    const dessert = desserts.find(dess => dess.id === recipeId);
    if (dessert) return dessert;
    
    return null;
}


/* --------------------------------------------------------------------------------------------------------------
Funzione per aggiornare le ricette nei daily dishes
------------------------------------------------------------------------------------------------------------------*/
function updateDishes(dishesType) {
    const dishCards = document.querySelectorAll('.dish-card');
    const dishesContainer = document.querySelector('.daily-dishes-container');
    
    // Array di ricette per piatti principali
    const mainDishes = [
        {
            id: "1",
            icon: 'fas fa-mortar-pestle',
            title: 'Pasta al Pomodoro Fresco',
            description: 'Una ricetta classica italiana con pomodori freschi, basilico e aglio. Perfetta per un pranzo veloce ma gustoso. Preparazione in soli 20 minuti.',
            difficulty: 'Easy',
            type: 'Flour'
        },
        {
            id: "2",
            icon: 'fas fa-leaf',
            title: 'Insalata di Quinoa e Avocado',
            description: 'Un\'insalata ricca di proteine e grassi sani, perfetta per un pasto nutriente e bilanciato. Ideale per chi segue una dieta vegana.',
            difficulty: 'Medium',
            type: 'Vegetable'
        },
        {
            id: "3",
            icon: 'fas fa-fish',
            title: 'Salmone al Forno con Verdure',
            description: 'Salmone cotto al forno con patate e zucchine, un piatto ricco di omega-3 e sapori mediterranei. Cottura totale: 30 minuti.',
            difficulty: 'Medium',
            type: 'Seafood'
        }
    ];
    
    // Array di ricette per dessert 
    const desserts = [
        {
            id: "1",
            icon: 'fas fa-wine-glass-alt',
            title: 'Tiramisù Classico',
            description: 'Il famoso dolce italiano a strati con savoiardi, caffè, mascarpone e cacao. Perfetto per concludere un pasto.',
            difficulty: 'Medium',
            type: 'Dessert'
        },
        {
            id: "2",
            icon: 'fas fa-ice-cream',
            title: 'Gelato alla Vaniglia',
            description: 'Gelato artigianale alla vaniglia con granella di nocciole. Fresco e cremoso, ideale per le giornate calde.',
            difficulty: 'Easy',
            type: 'Dessert'
        },
        {
            id: "3",
            icon: 'fas fa-cookie-bite',
            title: 'Cheesecake ai Frutti di Bosco',
            description: 'Torta di formaggio con base di biscotti e topping di frutti di bosco freschi. Dolce ma non troppo.',
            difficulty: 'Hard',
            type: 'Dessert'
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
            
            // Seleziona correttamente i tag
            const difficultySpans = card.querySelectorAll('.difficulty span');
            const typeSpans = card.querySelectorAll('.typeRecipe span');
            
            dishIcon.className = dishesArray[index].icon;
            dishTitle.textContent = dishesArray[index].title;
            dishDescription.textContent = dishesArray[index].description;
            
            // Aggiorna i tags di difficoltà
            difficultySpans.forEach(span => {
                span.textContent = dishesArray[index].difficulty;
            });
            
            // Aggiorna i tags di tipo
            typeSpans.forEach(span => {
                span.textContent = dishesArray[index].type;
            });
            
            // Aggiorna gli attributi data
            card.setAttribute('data-id', dishesArray[index].id);
            card.setAttribute('data-difficulty', dishesArray[index].difficulty.toLowerCase());
            card.setAttribute('data-type', dishesArray[index].type.toLowerCase());
            
            // Aggiorna i pulsanti favorite
            const favoriteButtons = card.querySelectorAll('.addToFavorite');
            favoriteButtons.forEach(button => {
                button.setAttribute('data-id', dishesArray[index].id);
                button.setAttribute('data-dish-type', dishesType); // Aggiungi tipo di piatto
            });
        }
    });
    
    // Aggiorna lo stato dei pulsanti preferiti
    updateFavoriteButtons();
}


/* ---------------------------------------------------------------------------------------------------------------------
Inizializza la pagina quando è pronta 
------------------------------------------------------------------------------------------------------------------------*/
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

    // Gestione click sui pulsanti preferiti
    document.addEventListener('click', function(e) {
        if (e.target.closest('.addToFavorite')) {
            const button = e.target.closest('.addToFavorite');
            const recipeId = button.getAttribute('data-id');
            const dishCard = button.closest('.dish-card');
            const isDessertMode = dishCard.closest('.daily-dishes-container').classList.contains('dessert-mode');
            const dishType = isDessertMode ? 'dessert' : 'main';
            
            // Toggle dello stato preferito
            const isFavorite = toggleFavorite(recipeId, dishType);
            // Effetto di bounce
            button.classList.add('bounce');
            setTimeout(() => {
                button.classList.remove('bounce');
            }, 400);
            
            console.log(`Preferito toggled per ricetta ${recipeId}_${dishType}: ${isFavorite ? 'aggiunta' : 'rimossa'}`);
        }
    });

    // Inizializza i pulsanti preferiti al caricamento
    updateFavoriteButtons();
});

// Effetto di rimbalzo per i square-button
document.querySelectorAll('.square-button').forEach(button => {
    button.addEventListener('click', function() {
        // Non applicare l'effetto bounce ai pulsanti di filtro mainDishes e desserts
        // perché hanno già il loro effetto di stato attivo
        if (this.id !== 'mainDishes' && this.id !== 'desserts' && this.id !== 'infoScan') {
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
                    window.location.href = 'Home.html';
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
    const infoScanButton = document.getElementById('infoScan');

    // Configurazione scanner
    const config = {
        fps: 10,
        qrbox: { width: 300, height: 300 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    // Inizializza scanner
    html5QrCode = new Html5Qrcode("reader");

    function creaInfoScanModal() {
        const overlay = document.createElement('div');
        overlay.className = 'info-scan-overlay';
        overlay.id = 'infoScanOverlay';
        
        const modal = document.createElement('div');
        modal.className = 'info-scan-content';
        modal.id = 'infoScanContent';
        
        modal.innerHTML = `
            <button class="info-scan-close" id="infoScanClose">
                <i class="fas fa-times"></i>
            </button>
            <div class="scansione-descrizione">
                <h3>Scansione Codici a Barre</h3>
                <p>Scansiona il codice a barre di un prodotto alimentare per ottenere immediatamente ricette e suggerimenti di preparazione.</p>
            </div>
            <div class="scansione-istruzioni">
                <h4>Come utilizzare:</h4>
                <ul>
                    <li><i class="fas fa-camera"></i> Posiziona il codice a barre all'interno dell'area di scansione</li>
                    <li><i class="fas fa-lightbulb"></i> Assicurati che ci sia una buona illuminazione</li>
                    <li><i class="fas fa-upload"></i> In alternativa, carica un'immagine del codice a barre</li>
                    <li><i class="fas fa-history"></i> Visualizza la cronologia delle tue scansioni</li>
                </ul>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="scansione-btn" id="infoScanOk" style="padding: 10px 20px;">
                    <i class="fas fa-check"></i> Ho capito
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        // Gestione chiusura modal
        const closeButton = document.getElementById('infoScanClose');
        const okButton = document.getElementById('infoScanOk');
        
        const chiudiModal = function() {
            overlay.style.display = 'none';
            modal.style.display = 'none';
        };
        
        if (closeButton) {
            closeButton.addEventListener('click', chiudiModal);
        }
        
        if (okButton) {
            okButton.addEventListener('click', chiudiModal);
        }
        
        overlay.addEventListener('click', chiudiModal);
        
        // Ferma la propagazione dei click sul modal stesso
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Gestione click su infoScan
    if (infoScanButton) {
        infoScanButton.addEventListener('click', function() {
            this.classList.add('bounce');
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 400);
            
            // Crea il modal se non esiste
            let modal = document.getElementById('infoScanContent');
            let overlay = document.getElementById('infoScanOverlay');
            
            if (!modal) {
                creaInfoScanModal();
                modal = document.getElementById('infoScanContent');
                overlay = document.getElementById('infoScanOverlay');
            }
            
            // Mostra il modal
            modal.style.display = 'block';
            overlay.style.display = 'block';
            
            console.log('Informazioni scansione visualizzate');
        });
    }

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
                window.location.href = 'Home.html';
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

    // Pulisci la scansione quando si esce dalla pagina
    window.addEventListener('beforeunload', function() {
        if (scansioneAttiva) {
            fermaScansione();
        }
    });
});


/*-------------------------------------------------------------------------------------------------------------------------
js specifico per Preferiti.html
----------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pagina Preferiti caricata');
    
    // Funzione per caricare le ricette preferite
    function caricaPreferiti() {
        const favoritesKey = 'recipeer_favorites';
        const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
        const preferitiContenuto = document.getElementById('preferitiContenuto');
        
        if (favorites.length === 0) {
            // Mostra messaggio "nessuna ricetta preferita"
            preferitiContenuto.innerHTML = `
                <div class="preferiti-container">
                    <div class="preferiti-vuoto">
                        <div class="preferiti-vuoto-icon">
                            <i class="far fa-heart"></i>
                        </div>
                        <h3 class="preferiti-vuoto-titolo">Nessuna ricetta preferita</h3>
                        <p class="preferiti-vuoto-testo">
                            Aggiungi ricette ai tuoi preferiti.
                        </p>
                    </div>
                </div>
            `;
        } else {
            // Crea container per le ricette
            const container = document.createElement('div');
            container.className = 'preferiti-ricette-container';
            
            // Dati delle ricette disponibili - separa main dishes e dessert
            const mainDishes = [
                {
                    id: "1_main",
                    icon: "fas fa-mortar-pestle",
                    title: "Pasta al Pomodoro Fresco",
                    difficulty: "Easy",
                    type: "Flour"
                },
                {
                    id: "2_main", 
                    icon: "fas fa-leaf",
                    title: "Insalata di Quinoa e Avocado",
                    difficulty: "Medium",
                    type: "Vegetable"
                },
                {
                    id: "3_main",
                    icon: "fas fa-fish",
                    title: "Salmone al Forno con Verdure",
                    difficulty: "Medium", 
                    type: "Seafood"
                }
            ];
            
            const desserts = [
                {
                    id: "1_dessert",
                    icon: "fas fa-wine-glass-alt",
                    title: "Tiramisù Classico",
                    difficulty: "Medium",
                    type: "Dessert"
                },
                {
                    id: "2_dessert",
                    icon: "fas fa-ice-cream", 
                    title: "Gelato alla Vaniglia",
                    difficulty: "Easy",
                    type: "Dessert"
                },
                {
                    id: "3_dessert",
                    icon: "fas fa-cookie-bite",
                    title: "Cheesecake ai Frutti di Bosco",
                    difficulty: "Hard",
                    type: "Dessert"
                }
            ];
            
            // Combina tutti i piatti
            const tutteLeRicette = [...mainDishes, ...desserts];
            
            // Aggiungi solo le ricette preferite
            favorites.forEach(favId => {
                // Cerca la ricetta nei dati disponibili
                const ricetta = tutteLeRicette.find(r => r.id === favId);
                if (ricetta) {
                    const card = document.createElement('div');
                    card.className = 'preferiti-card';
                    card.setAttribute('data-id', ricetta.id);
                    
                    card.innerHTML = `
                        <div class="preferiti-icon">
                            <i class="${ricetta.icon}"></i>
                        </div>
                        <div class="preferiti-content">
                            <h3 class="preferiti-title">${ricetta.title}</h3>
                            <span class="preferiti-info">${ricetta.type} • ${ricetta.difficulty}</span>
                        </div>
                        <button class="removeFromFavorite" data-id="${ricetta.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    
                    container.appendChild(card);
                }
            });
            
            preferitiContenuto.innerHTML = '';
            preferitiContenuto.appendChild(container);
            
            // Aggiungi gestori di eventi per i pulsanti di rimozione
            document.querySelectorAll('.removeFromFavorite').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const recipeId = this.getAttribute('data-id');
                    
                    // Rimuovi dai preferiti
                    const favorites = JSON.parse(localStorage.getItem('recipeer_favorites') || '[]');
                    const index = favorites.indexOf(recipeId);
                    
                    if (index !== -1) {
                        favorites.splice(index, 1);
                        localStorage.setItem('recipeer_favorites', JSON.stringify(favorites));
                        console.log(`Ricetta ${recipeId} rimossa dai preferiti`);
                        
                        // Effetto di rimozione
                        const card = this.closest('.preferiti-card');
                        card.style.transform = 'scale(0.9)';
                        card.style.opacity = '0.5';
                        
                        setTimeout(() => {
                            // Ricarica la pagina per aggiornare la lista
                            caricaPreferiti();
                        }, 300);
                    }
                });
            });
            
            // Aggiungi gestori di eventi per i click sulle card
            document.querySelectorAll('.preferiti-card').forEach(card => {
                card.addEventListener('click', function() {
                    // Effetto di click
                    this.classList.remove('clicked');
                    void this.offsetWidth;
                    this.classList.add('clicked');
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 300);
                    
                    const recipeId = this.getAttribute('data-id');
                    console.log(`Hai cliccato su ricetta preferita: ${recipeId}`);
                });
            });
        }
    }
    
    // Carica i preferiti all'avvio
    caricaPreferiti();
    
    // Gestione reindirizzamento per il pulsante Home
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            setTimeout(() => {
                window.location.href = 'Home.html';
            }, 300);
        });
    }
    
    // Gestione reindirizzamento per il pulsante Ricettario
    const bookButton = document.getElementById('bookButton');
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            setTimeout(() => {
                window.location.href = 'Riccetario.html';
            }, 300);
        });
    }
    
    // Gestione reindirizzamento per il pulsante Scansione
    const cameraButton = document.getElementById('cameraButton');
    if (cameraButton) {
        cameraButton.addEventListener('click', function() {
            setTimeout(() => {
                window.location.href = 'Scansione.html';
            }, 300);
        });
    }
    
    // Gestione reindirizzamento per il pulsante Preferiti (ricarica la pagina)
    const heartButton = document.getElementById('heartButton');
    if (heartButton) {
        heartButton.addEventListener('click', function() {
            // La pagina è già attiva, quindi ricarica per aggiornare
            caricaPreferiti();
        });
    }

});
