document.addEventListener('DOMContentLoaded', function () {
    const SESSION_DURATION = 5 * 60 * 1000; // Durée de session en millisecondes (ex : 5 minutes)
    let sessionTimeout;
    const userEmail = localStorage.getItem('userEmail'); // Récupérer l'e-mail de l'utilisateur
    const clientContainer = document.getElementById('client-container');
    const adminContainer = document.getElementById('admin-container');
    const listeAttenteClient = document.getElementById('liste-attente-client');
    const listeAttenteAdmin = document.getElementById('liste-attente-admin');
    // Fonction pour afficher les tickets dans la liste client
    function rafraichirListeClient() {
        fetch('/demandes') // Remplace ici l'ancienne route par la route de récupération
            .then(response => response.json())
            .then(demandes => {
                listeAttenteClient.innerHTML = ''; // Efface la liste actuelle
                demandes.forEach(function (demande) {
                    const li = document.createElement('li');
                    li.textContent = `${demande.nom} - ${demande.professeur}`;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Supprimer';
                    deleteButton.onclick = function () {
                        supprimerDemande(demande.nom, demande.professeur);
                    };
                    li.appendChild(deleteButton);
                    listeAttenteClient.appendChild(li);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }
    // Fonction pour afficher les tickets dans la liste admin
    function rafraichirListeAdmin() {
        fetch('/demandes') // Remplace ici l'ancienne route par la route de récupération
            .then(response => response.json())
            .then(demandes => {
                listeAttenteAdmin.innerHTML = ''; // Efface la liste actuelle
                demandes.forEach(function (demande) {
                    const li = document.createElement('li');
                    li.textContent = `${demande.nom} - ${demande.professeur}`;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Supprimer';
                    deleteButton.onclick = function () {
                        supprimerDemande(demande.nom, demande.professeur);
                    };
                    li.appendChild(deleteButton);
                    listeAttenteAdmin.appendChild(li);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }
    // Fonction pour supprimer une demande
    function supprimerDemande(nom, professeur) {
        fetch('/demandes', { // Remplace ici l'ancienne route par la route de suppression
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom, professeur })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                rafraichirListeClient();
                rafraichirListeAdmin();
            })
            .catch(error => console.error('Erreur:', error));
    }
    // Fonction pour démarrer une session
    function startSession() {
        sessionTimeout = setTimeout(function () {
            // Réinitialiser le stockage local et rediriger vers la page de connexion
            localStorage.removeItem('userEmail');
            localStorage.removeItem('currentMode');
            location.reload(); // Recharger la page pour retourner à la connexion
        }, SESSION_DURATION);
    }
    // Chargement initial de l'état
    function loadInitialState() {
        const currentMode = localStorage.getItem('currentMode');
        if (currentMode === 'client') {
            clientContainer.classList.remove('hidden');
            adminContainer.classList.add('hidden');
            rafraichirListeClient();
            startSession();
            document.getElementById('bienvenue-message').textContent = `Bienvenue ${userEmail.split('@')[0]}`;
        } else if (currentMode === 'admin') {
            adminContainer.classList.remove('hidden');
            clientContainer.classList.add('hidden');
            rafraichirListeAdmin();
            startSession();
            document.getElementById('admin-bienvenue-message').textContent = `Bienvenue ${userEmail.split('@')[0]}`;
        } else {
            clientContainer.classList.add('hidden');
            adminContainer.classList.add('hidden');
        }
    }
    // Gestion de la demande de ticket
    const demandeForm = document.getElementById('demande-form');
    demandeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nomEleve = document.getElementById('nom-eleve').value;
        const professeur = document.getElementById('professeur').value;
        const demande = {
            nom: nomEleve,
            professeur: professeur,
        };
        fetch('/demandes', { // Utilise la route correcte pour ajouter une demande
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demande)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                rafraichirListeClient();
                demandeForm.reset(); // Réinitialiser le formulaire
            })
            .catch(error => console.error('Erreur:', error));
    });
    // Déconnexion
    const logoutButton = document.getElementById('logout-button');
    const logoutAdminButton = document.getElementById('logout-admin-button');
    
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('currentMode');
        location.reload(); // Recharger la page pour retourner à la connexion
    });

    logoutAdminButton.addEventListener('click', function () {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('currentMode');
        location.reload(); // Recharger la page pour retourner à la connexion
    });

    loadInitialState(); // Charger l'état initial
});
