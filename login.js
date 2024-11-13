document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission réelle du formulaire

    // Récupération des données du formulaire
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Vérification de la connexion
    if (email === "admin@lyc-buisson.com" && password === "admin123") {
        // Si la connexion est réussie, enregistrer l'heure de la session dans le localStorage
        localStorage.setItem('user', 'admin'); // Enregistre l'état de l'utilisateur
        localStorage.setItem('sessionStart', Date.now()); // Enregistre l'heure de début de la session
        window.location.href = "fileA.html"; // Redirige vers l'interface admin
    } else if (email === "eleve@lyc-buisson.com" && password === "eleve123") {
        // Si l'utilisateur est un élève
        localStorage.setItem('user', 'eleve'); // Enregistre l'état de l'utilisateur
        localStorage.setItem('sessionStart', Date.now()); // Enregistre l'heure de début de la session
        window.location.href = "fileE.html"; // Redirige vers l'interface élève
    } else {
        // Si la connexion échoue, afficher un message d'erreur
        document.getElementById("error-message").classList.remove("hidden");
    }
});

// Déconnexion de l'élève
document.getElementById("logout-client").addEventListener("click", function () {
    localStorage.removeItem('user'); // Supprimer l'état de l'utilisateur
    localStorage.removeItem('sessionStart'); // Supprimer l'heure de début de la session
    window.location.href = "connexion.html"; // Redirection vers la page de connexion
});

// Déconnexion de l'administrateur
document.getElementById("logout-admin").addEventListener("click", function () {
    localStorage.removeItem('user'); // Supprimer l'état de l'utilisateur
    localStorage.removeItem('sessionStart'); // Supprimer l'heure de début de la session
    window.location.href = "connexion.html"; // Redirection vers la page de connexion
});
