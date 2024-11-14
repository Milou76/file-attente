document.addEventListener('DOMContentLoaded', function() {
    const demandeListe = document.getElementById('demande-liste');

    // Fonction pour charger et afficher la liste des demandes
    function loadDemandeListe() {
        fetch('https://sheetdb.io/api/v1/your_api_id')  // URL de ton API SheetDB
            .then(response => response.json())
            .then(data => {
                demandeListe.innerHTML = '';  // Réinitialise la liste

                data.forEach(demande => {
                    const li = document.createElement('li');
                    const date = new Date(demande.date).toLocaleString(); // Formater la date au format local
                    li.textContent = `Nom : ${demande.nom} | Professeur : ${demande.professeur} | Date : ${date}`;
                    demandeListe.appendChild(li);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Charger la liste au démarrage
    loadDemandeListe();
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
