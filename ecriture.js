document.addEventListener('DOMContentLoaded', function() {
    const ticketForm = document.getElementById('ticket-form');
    const nomInput = document.getElementById('nom');
    const professeurSelect = document.getElementById('professeur');
    const logoutButton = document.getElementById('logout-client');

    // Fonction pour envoyer une demande
    ticketForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nom = nomInput.value.trim();
        const professeur = professeurSelect.value;

        if (nom === '') {
            alert('Veuillez entrer votre nom.');
            return;
        }

        // Formater la date pour l'enregistrement
        const dateActuelle = new Date().toISOString(); // Utilise ISO 8601 pour la date

        const data = {
            "data": [
                {
                    "nom": nom,
                    "professeur": professeur,
                    "date": dateActuelle
                }
            ]
        };

        fetch('https://sheetdb.io/api/v1/vbh4le4tgma9h', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your_api_key'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Demande envoyée :", data);
            loadDemandeListe(); // Mettre à jour la liste des demandes
        })
        .catch(error => console.error('Erreur:', error));
    });

    // Fonction pour déconnecter l'élève
    logoutButton.addEventListener('click', function() {
        window.location.href = 'connexion.html'; // Rediriger vers la page de connexion
    });
});


// Vérifier la session à chaque chargement de page
const sessionStart = localStorage.getItem('sessionStart');
const sessionTimeout = 5 * 60 * 1000; // 5 minutes en millisecondes

// Vérifier si la session existe et si elle n'est pas expirée
if (sessionStart) {
    const currentTime = Date.now();
    if (currentTime - sessionStart > sessionTimeout) {
        // Si la session a expiré, déconnecter l'utilisateur et rediriger vers la page de connexion
        localStorage.removeItem('user');
        localStorage.removeItem('sessionStart');
        window.location.href = "connexion.html"; // Redirige vers la page de connexion
    }
} else {
    // Si aucune session n'existe, rediriger directement vers la page de connexion
    window.location.href = "connexion.html";
}