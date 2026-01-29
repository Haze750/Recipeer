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
            // Reindirizza alla pagina riccetario.html dopo un breve ritardo
            setTimeout(() => {
                window.location.href = 'riccetario.html';
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

// Effetto di rimbalzo per i square-button
document.querySelectorAll('.square-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 400);

        if (this.id === 'refreshButton') {
            console.log('Ricetta aggiornata');
        } else if (this.id === 'shareButton') {
            console.log('Condividi ricetta');
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

// Animazione all'apertura della pagina
document.addEventListener('DOMContentLoaded', function() {
    console.log('Benvenuto su Recipeer!');
});