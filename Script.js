// Effetto hover su pulsanti e daily dishes
document.querySelectorAll('.square-button, .user-button, .dish-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Effetto di rimbalzo al click sui pulsanti del menu
document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function() {
        // Aggiungi l'effetto di rimbalzo
        this.classList.add('bounce');
        
        // Rimuovi la classe active da tutti i pulsanti
        document.querySelectorAll('.menu-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Aggiungi la classe active al pulsante cliccato
        this.classList.add('active');
        
        // Rimuovi la classe di bounce dopo l'animazione
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 400);
        
        // Gestione reindirizzamento per il pulsante Ricettario
        if (this.id === 'bookButton') {
            // Reindirizza alla pagina Riccetario.html dopo un breve ritardo
            setTimeout(() => {
                window.location.href = 'Riccetario.html';
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
            icon: 'fas fa-birthday-cake',
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

// Codice specifico per la pagina Ricettario
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