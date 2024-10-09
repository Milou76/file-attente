document.addEventListener('DOMContentLoaded', function () {
    let demandes = [];
    const SESSION_DURATION = 5 * 60 * 1000; // Durée de session en millisecondes (ex : 5 minutes)
    let sessionTimeout;
    let currentMode = localStorage.getItem('currentMode') || null; // Récupérer le mode actuel du localStorage

    // Récupérer les demandes depuis le Local Storage
    if (localStorage.getItem('demandes')) {
        demandes = JSON.parse(localStorage.getItem('demandes'));
    }

    // Sélection des éléments DOM
    const clientContainer = document.getElementById('client-container');
    const adminContainer = document.getElementById('admin-container');
    const choixContainer = document.getElementById('choix-container');
    const listeAttenteClient = document.getElementById('liste-attente-client');
    const listeAttenteAdmin = document.getElementById('liste-attente-admin');

    // Fonction pour afficher les tickets dans la liste client
    function rafraichirListeClient() {
        listeAttenteClient.innerHTML = ''; // Efface la liste actuelle
        demandes.forEach(function (demande, index) {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${demande.eleve} - Prof: ${demande.prof} - Heure: ${demande.heure}`;
            listeAttenteClient.appendChild(li);
        });
    }

    // Fonction pour afficher les tickets dans la liste admin
    function rafraichirListeAdmin() {
        listeAttenteAdmin.innerHTML = ''; // Efface la liste actuelle
        demandes.forEach(function (demande, index) {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${demande.eleve} - Prof: ${demande.prof} - Heure: ${demande.heure}`;
            listeAttenteAdmin.appendChild(li);
        });
    }

    // Sauvegarder les demandes dans le Local Storage
    function sauvegarderDemandes() {
        localStorage.setItem('demandes', JSON.stringify(demandes));
    }

    // Fonction pour démarrer la session avec une durée définie
    function startSession() {
        resetSessionTimeout(); // Initialise ou réinitialise le timer de session

        // Avertir avant l'expiration
        setTimeout(function () {
            alert("Votre session expire bientôt. Veuillez interagir pour prolonger la session.");
        }, SESSION_DURATION - 60 * 1000); // Alerte 1 minute avant expiration

        // Déconnexion automatique après la durée de session
        sessionTimeout = setTimeout(function () {
            alert("Votre session a expiré. Vous allez être redirigé.");
            endSession();
        }, SESSION_DURATION);
    }

    // Réinitialise la durée de la session lorsqu'il y a une interaction
    function resetSessionTimeout() {
        clearTimeout(sessionTimeout);
        startSession();
    }

    // Fonction pour terminer la session
    function endSession() {
        // Redirige vers le choix initial (Admin/Client)
        choixContainer.classList.remove('hidden');
        clientContainer.classList.add('hidden');
        adminContainer.classList.add('hidden');
        localStorage.removeItem('currentMode'); // Efface le mode du localStorage
    }

    // Ajouter une nouvelle demande depuis le formulaire du client
    document.getElementById('demande-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const nomEleve = document.getElementById('nom-eleve').value;
        const professeur = document.getElementById('professeur').value;
        const maintenant = new Date().toLocaleTimeString();

        if (nomEleve && professeur) {
            demandes.push({
                eleve: nomEleve,
                prof: professeur,
                heure: maintenant
            });
            document.getElementById('nom-eleve').value = ''; // Réinitialise le champ
            sauvegarderDemandes(); // Sauvegarde les demandes dans le Local Storage
            rafraichirListeClient();
            rafraichirListeAdmin();
        }

        resetSessionTimeout(); // Réinitialise la session après une demande
    });

    // Supprimer le premier ticket (admin)
    document.getElementById('suivant-button').addEventListener('click', function () {
        if (demandes.length > 0) {
            demandes.shift(); // Supprime le premier ticket
            sauvegarderDemandes(); // Sauvegarde les modifications
            rafraichirListeClient();
            rafraichirListeAdmin();
        }

        resetSessionTimeout(); // Réinitialise la session après une interaction
    });

    // Vider la file d'attente (admin)
    document.getElementById('vider-button').addEventListener('click', function () {
        demandes = [];
        sauvegarderDemandes();
        rafraichirListeClient();
        rafraichirListeAdmin();

        resetSessionTimeout(); // Réinitialise la session après une interaction
    });

    // Afficher le mode client
    document.getElementById('client-button').addEventListener('click', function () {
        choixContainer.classList.add('hidden');
        clientContainer.classList.remove('hidden');
        localStorage.setItem('currentMode', 'client'); // Sauvegarder le mode dans le localStorage
        rafraichirListeClient();
        startSession(); // Démarre la session lorsque le mode est activé
    });

    // Afficher le mode admin
    document.getElementById('admin-button').addEventListener('click', function () {
        choixContainer.classList.add('hidden');
        adminContainer.classList.remove('hidden');
        localStorage.setItem('currentMode', 'admin'); // Sauvegarder le mode dans le localStorage
        rafraichirListeAdmin();
        startSession(); // Démarre la session lorsque le mode est activé
    });

    // Fonction pour charger l'état initial de l'application
    function loadInitialState() {
        if (currentMode === 'client') {
            choixContainer.classList.add('hidden');
            clientContainer.classList.remove('hidden');
            rafraichirListeClient();
            startSession();
        } else if (currentMode === 'admin') {
            choixContainer.classList.add('hidden');
            adminContainer.classList.remove('hidden');
            rafraichirListeAdmin();
            startSession();
        }
    }

    // Charger l'état initial lorsque la page est chargée
    loadInitialState();

    // Cacher les containers au départ
    clientContainer.classList.add('hidden');
    adminContainer.classList.add('hidden');
});
