document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        const email = document.getElementById('email').value;

        // Vérifier si l'adresse e-mail est valide
        if (validateEmail(email)) {
            // Enregistrer l'e-mail dans le Local Storage
            localStorage.setItem('userEmail', email);

            // Changer l'état de l'application
            loadUserInterface(email);
        } else {
            errorMessage.classList.remove('hidden'); // Affiche le message d'erreur
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[a-z]+\.[a-z]+@lyc-buisson\.com$/; // Vérifie le format de l'adresse e-mail
        return emailPattern.test(email);
    }

    function loadUserInterface(email) {
        const clientContainer = document.getElementById('client-container');
        const adminContainer = document.getElementById('admin-container');
        const loginContainer = document.getElementById('login-container');
        
        // Déterminer le rôle de l'utilisateur
        if (email.startsWith('prof')) {
            // Si c'est un professeur
            localStorage.setItem('currentMode', 'admin'); // Mode admin
            loginContainer.classList.add('hidden');
            adminContainer.classList.remove('hidden');
            document.getElementById('admin-bienvenue-message').textContent = `Bienvenue ${email.split('@')[0]}`;
        } else {
            // Si c'est un élève
            localStorage.setItem('currentMode', 'client'); // Mode client
            loginContainer.classList.add('hidden');
            clientContainer.classList.remove('hidden');
            document.getElementById('bienvenue-message').textContent = `Bienvenue ${email.split('@')[0]}`;
        }
    }
});
